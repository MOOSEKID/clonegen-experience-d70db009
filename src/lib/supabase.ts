
import { createClient } from '@supabase/supabase-js';

// Use default public values for demo purposes if env vars are missing
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.example';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
