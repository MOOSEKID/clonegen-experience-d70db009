
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qrjwfiurwvcsyrcpewsj.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyandmaXVyd3Zjc3lyY3Bld3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyNDI3ODQsImV4cCI6MjA1NzgxODc4NH0.F90uGmOPeM4bW2SRawsl6qJMkWwhOLFuUesORc4XK3w';

// Create and export Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});
