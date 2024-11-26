import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";

interface Profile {
  name: string;
  username: string;
  avatar: string | null;
  bio?: string;
  location?: string;
  specialties?: string[];
  achievements?: Array<{
    id: string;
    title: string;
    date: string;
    description: string;
    icon: any;
  }>;
  socialLinks?: {
    instagram?: string;
    youtube?: string;
    tiktok?: string;
  };
}

interface AuthUser {
  id: string;
  email: string;
  role: "admin" | "competitor" | "spectator";
  profile: Profile;
  status: "active" | "disabled";
  onboardingCompleted?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (
    email: string,
    password: string,
    userData: Partial<Profile>
  ) => Promise<void>;
  updateProfile: (profile: Partial<Profile>) => Promise<void>;
  completeOnboarding: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (authUser: User) => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();

      if (error) throw error;

      if (profile) {
        setUser({
          id: authUser.id,
          email: authUser.email!,
          role: profile.role,
          profile: {
            name: profile.name || "",
            username: profile.username,
            avatar: profile.avatar_url || "",
            bio: profile.bio,
            location: profile.location,
            specialties: profile.specialties,
            achievements: profile.achievements,
            socialLinks: profile.social_links,
          },
          status: profile.status,
          onboardingCompleted: profile.onboarding_completed,
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUser(null);
    }
  };

  const retryOperation = async <T,>(
    operation: () => Promise<T>,
    retries = MAX_RETRIES
  ): Promise<T> => {
    try {
      return await operation();
    } catch (error: any) {
      if (retries > 0 && (error?.status === 504 || error?.status === 500)) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        return retryOperation(operation, retries - 1);
      }
      throw error;
    }
  };

  const signup = async (
    email: string,
    password: string,
    userData: Partial<Profile>
  ) => {
    try {
      const signUpOperation = async () => {
        const { data: authData, error: authError } = await supabase.auth.signUp(
          {
            email,
            password,
            options: {
              data: {
                name: userData.name,
                username: email.split("@")[0],
                role: "spectator",
              },
              emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
          }
        );

        if (authError) throw authError;
        return authData;
      };

      const authData = await retryOperation(signUpOperation);

      if (!authData.user) {
        throw new Error("Failed to create user account");
      }

      // Create profile record
      const createProfileOperation = async () => {
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: authData.user!.id,
            email: email,
            role: "spectator",
            username: email.split("@")[0],
            name: userData.name,
            avatar_url: userData.avatar || null,
            status: "active",
            onboarding_completed: false,
          },
        ]);

        if (profileError) throw profileError;
      };

      await retryOperation(createProfileOperation);

      // If session exists, fetch profile and redirect
      if (authData.session) {
        await fetchUserProfile(authData.user);
        navigate("/");
      }
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const loginOperation = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        return data;
      };

      const data = await retryOperation(loginOperation);

      if (data?.user) {
        await fetchUserProfile(data.user);

        if (user?.role === "competitor" && !user.onboardingCompleted) {
          navigate("/onboarding");
        } else if (user?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    navigate("/");
  };

  const updateProfile = async (profileUpdate: Partial<Profile>) => {
    if (!user) throw new Error("No user logged in");

    const { error } = await supabase
      .from("profiles")
      .update({
        name: profileUpdate.name,
        bio: profileUpdate.bio,
        location: profileUpdate.location,
        specialties: profileUpdate.specialties,
        achievements: profileUpdate.achievements,
        social_links: profileUpdate.socialLinks,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) throw error;

    setUser((prev) =>
      prev
        ? {
            ...prev,
            profile: {
              ...prev.profile,
              ...profileUpdate,
            },
          }
        : null
    );
  };

  const completeOnboarding = async () => {
    if (!user) throw new Error("No user logged in");

    const { error } = await supabase
      .from("profiles")
      .update({
        onboarding_completed: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) throw error;

    setUser((prev) =>
      prev
        ? {
            ...prev,
            onboardingCompleted: true,
          }
        : null
    );

    navigate("/dashboard");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        updateProfile,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
