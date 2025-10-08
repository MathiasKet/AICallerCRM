import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local if it exists, otherwise from .env
const envPath = resolve(process.cwd(), '.env.local');
config({ path: envPath });

// Also load .env for Vite-specific variables
config();

// Validate required environment variables
const requiredEnvVars = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'DATABASE_URL',
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

console.log('✅ Environment variables loaded successfully');
