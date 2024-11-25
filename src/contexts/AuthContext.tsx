import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface Profile {
  name: string;
  username: string;
  avatar: string;
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
  role: 'admin' | 'competitor' | 'spectator';
  profile: Profile;
  status: 'active' | 'disabled';
  onboardingCompleted?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<Profile>) => Promise<void>;
  completeOnboarding: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserProfile(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (authUser: User) => {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return;
    }

    if (profile) {
      setUser({
        id: authUser.id,
        email: authUser.email!,
        role: profile.role,
        profile: {
          name: profile.name,
          username: profile.username,
          avatar: profile.avatar_url,
          bio: profile.bio,
          location: profile.location,
          specialties: profile.specialties,
          achievements: profile.achievements,
          socialLinks: profile.social_links
        },
        status: profile.status,
        onboardingCompleted: profile.onboarding_completed
      });
    }
  };

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw error;
    }

    if (data?.user) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      if (profile) {
        setUser({
          id: data.user.id,
          email: data.user.email!,
          role: profile.role,
          profile: {
            name: profile.name,
            username: profile.username,
            avatar: profile.avatar_url,
            bio: profile.bio,
            location: profile.location,
            specialties: profile.specialties,
            achievements: profile.achievements,
            socialLinks: profile.social_links
          },
          status: profile.status,
          onboardingCompleted: profile.onboarding_completed
        });

        if (profile.role === 'competitor' && !profile.onboarding_completed) {
          navigate('/onboarding');
        } else if (profile.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    } else {
      setUser(null);
      navigate('/');
    }
  };

  const updateProfile = async (profileData: Partial<Profile>) => {
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        name: profileData.name,
        bio: profileData.bio,
        location: profileData.location,
        specialties: profileData.specialties,
        achievements: profileData.achievements,
        social_links: profileData.socialLinks,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (error) {
      throw error;
    }

    setUser(prev => prev ? {
      ...prev,
      profile: {
        ...prev.profile,
        ...profileData
      }
    } : null);
  };

  const completeOnboarding = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .update({
        onboarding_completed: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (error) {
      throw error;
    }

    setUser(prev => prev ? {
      ...prev,
      onboardingCompleted: true
    } : null);

    navigate('/dashboard');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      updateProfile,
      completeOnboarding
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}