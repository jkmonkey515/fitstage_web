import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { generateVerificationToken, sendVerificationEmail } from "../lib/email";
import toast from "react-hot-toast";

type SignUpProps = {
  email: string;
  password: string;
  accountType: string;
  name: string;
};

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (variables: SignUpProps) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check active sessions
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setUser(profile);
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Error fetching user profile");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const apiUrl = backendUrl + "/api/login";
      const params = {
        email: email,
        password: password,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      const result = await response.json();
      toast.success("Successfully signed in!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Error signing in:", error);
      toast.error(error.message || "Error signing in");
      throw error;
    }
  };

  const signup = async (variables: SignUpProps) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const apiUrl = backendUrl + "/api/register";
      const params = {
        ...variables,
        password_confirmation: variables.password,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      const result = await response.json();
      // const { data: { user: authUser }, error: signUpError } = await supabase.auth.signUp({
      //   email,
      //   password,
      //   options: {
      //     data: {
      //       full_name: name,
      //       role: role
      //     }
      //   }
      // });

      // if (signUpError) throw signUpError;
      // if (!authUser) throw new Error('No user returned from sign up');

      // // Create profile
      // const { error: profileError } = await supabase
      //   .from('profiles')
      //   .insert([{
      //     id: authUser.id,
      //     email,
      //     username: email.split('@')[0],
      //     full_name: name,
      //     role: role as 'admin' | 'competitor' | 'spectator',
      //     avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6B46C1&color=fff`,
      //     status: 'active'
      //   }]);

      // if (profileError) throw profileError;

      // Generate and send verification email
      const verificationToken = generateVerificationToken(variables.email);
      await sendVerificationEmail(variables.email, verificationToken);

      toast.success("Successfully signed up! Please check your email.");
      navigate("/check-email");
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast.error(error.message || "Error creating account");
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      navigate("/");
      toast.success("Successfully signed out!");
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast.error(error.message || "Error signing out");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {!loading && children}
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
