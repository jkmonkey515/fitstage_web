import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface Profile {
  name: string;
  username: string;
  avatar: string;
  bio?: string;  // Optional field
  location?: string;  // Optional field
  specialties?: string[];  // Optional field
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
      console.log('Initial session check:', session);
      if (session?.user) {
        fetchUserProfile(session.user);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state change:', event, session);
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
      console.log('Fetching profile for user:', authUser.id);
      
      // First try to get existing profile
      let { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      console.log('Profile fetch result:', { profile, error });

      // If no profile exists, create one
      if (error && error.code === 'PGRST116') {
        console.log('No profile found, creating new profile');
        const defaultProfile = {
          id: authUser.id,
          email: authUser.email,
          role: 'spectator',
          username: authUser.email?.split('@')[0] || `user_${Date.now()}`,
          name: '',
          avatar_url: null,
          status: 'active'
        };

        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([defaultProfile])
          .select()
          .single();

        console.log('New profile creation result:', { newProfile, createError });

        if (createError) throw createError;
        profile = newProfile;
      } else if (error) {
        throw error;
      }

      if (profile) {
        console.log('Setting user state with profile:', profile);
        setUser({
          id: authUser.id,
          email: authUser.email!,
          role: profile.role,
          profile: {
            name: profile.name || '',
            username: profile.username,
            avatar: profile.avatar_url || '',
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
    } catch (error) {
      console.error('Error handling user profile:', error);
      setUser(null);
    }
  };

  const login = async (email: string, password: string) => {
    console.log('Attempting login for:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    console.log('Login result:', { data, error });

    if (error) throw error;

    if (data?.user) {
      await fetchUserProfile(data.user);
      
      const profile = user;
      console.log('Post-login profile:', profile);
      
      if (profile) {
        if (profile.role === 'competitor' && !profile.onboardingCompleted) {
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
    if (error) throw error;
    setUser(null);
    navigate('/');
  };

  const updateProfile = async (profileUpdate: Partial<Profile>) => {
    if (!user) throw new Error('No user logged in');

    const { error } = await supabase
      .from('profiles')
      .update({
        name: profileUpdate.name,
        bio: profileUpdate.bio,
        location: profileUpdate.location,
        specialties: profileUpdate.specialties,
        achievements: profileUpdate.achievements,
        social_links: profileUpdate.socialLinks,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (error) throw error;

    setUser(prev => prev ? {
      ...prev,
      profile: {
        ...prev.profile,
        ...profileUpdate
      }
    } : null);
  };

  const completeOnboarding = async () => {
    if (!user) throw new Error('No user logged in');

    const { error } = await supabase
      .from('profiles')
      .update({
        onboarding_completed: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (error) throw error;

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