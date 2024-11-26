import { supabase } from '../lib/supabase';

export async function testDatabaseConnection() {
  try {
    // Test insert into profiles table
    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          username: 'testuser',
          name: 'Test User',
          email: 'test@example.com',
          role: 'spectator'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Database test error:', error);
      return { success: false, error };
    }

    console.log('Successfully inserted test data:', data);
    return { success: true, data };

  } catch (error) {
    console.error('Connection test failed:', error);
    return { success: false, error };
  }
}