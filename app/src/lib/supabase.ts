import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Validate environment variables
const isPlaceholder = supabaseUrl.includes('placeholder') || supabaseAnonKey.includes('placeholder');

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY || isPlaceholder) {
  if (import.meta.env.PROD) {
    throw new Error('FATAL: Supabase environment variables are missing or contain placeholder values. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY before deploying.');
  } else {
    console.warn('[MAZGY] Supabase env vars missing or placeholders detected. Auth and database features will not work. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
