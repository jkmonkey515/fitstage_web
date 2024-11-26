import { supabaseAdmin } from '../lib/database';

export async function queryDatabase(query: string, params?: any[]) {
  try {
    const { data, error } = await supabaseAdmin.rpc('execute_sql', {
      query_text: query,
      query_params: params
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Example usage:
// const result = await queryDatabase('SELECT * FROM profiles WHERE role = $1', ['admin']);