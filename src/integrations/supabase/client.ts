
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://uldnqunqeibvocxsbkhb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZG5xdW5xZWlidm9jeHNia2hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5MDgxNjgsImV4cCI6MjA1NzQ4NDE2OH0.q4yP7fQWPRC2MEE3j5LTFfPCCeFFRridDnn_II6Us0I";

// Create the Supabase client with explicit headers for CORS support
export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'X-Client-Info': 'supabase-js-web/2.49.1',
      },
    },
  }
);
