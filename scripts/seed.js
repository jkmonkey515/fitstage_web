import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import pg from 'pg';
const { Pool } = pg;

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function seedDatabase() {
  const client = await pool.connect();
  
  try {
    // Start transaction
    await client.query('BEGIN');

    // Check if admin user exists
    const { rows: existingAdmin } = await client.query(`
      SELECT id FROM profiles WHERE role = 'admin' LIMIT 1
    `);

    if (existingAdmin.length === 0) {
      // Insert admin user
      await client.query(`
        INSERT INTO profiles (
          id,
          email,
          role,
          username,
          name,
          status
        ) VALUES (
          '00000000-0000-0000-0000-000000000000',
          'admin@demo.com',
          'admin',
          'admin',
          'System Admin',
          'active'
        )
      `);
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }

    // Commit transaction
    await client.query('COMMIT');
    console.log('Database seeding completed successfully');

  } catch (error) {
    // Rollback transaction on error
    await client.query('ROLLBACK');
    console.error('Seeding error:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seedDatabase();