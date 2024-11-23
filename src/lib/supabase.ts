import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Profile {
  id: string;
  email: string;
  username: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  role: 'admin' | 'competitor' | 'spectator';
  status: 'active' | 'pending' | 'disabled';
}

export const createProfile = async (userId: string, profile: Partial<Profile>) => {
  const { error } = await supabase
    .from('profiles')
    .insert([
      {
        id: userId,
        ...profile,
        status: 'pending'
      }
    ]);

  if (error) throw error;
};