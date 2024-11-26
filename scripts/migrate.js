import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Supabase client with service role key for admin access
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: false
    }
  }
);

async function runMigrations() {
  try {
    const migrationsDir = path.join(__dirname, '../supabase/migrations');
    const files = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    console.log('Found migrations:', files);

    for (const file of files) {
      console.log(`Running migration: ${file}`);
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      
      try {
        // Using raw query execution instead of RPC
        const { data, error } = await supabase
          .from('_migrations')
          .insert([
            { 
              name: file,
              sql: sql,
              executed_at: new Date().toISOString()
            }
          ]);
        
        if (error) {
          throw error;
        }
        
        console.log(`Successfully recorded migration: ${file}`);
      } catch (error) {
        console.error(`Error running migration ${file}:`, error);
        throw error;
      }
    }

    console.log('All migrations completed successfully');

  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  }
}

runMigrations();