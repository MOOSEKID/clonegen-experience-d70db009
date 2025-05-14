import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qrjwfiurwvcsyrcpewsj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyandmaXVyd3Zjc3lyY3Bld3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyNDI3ODQsImV4cCI6MjA1NzgxODc4NH0.F90uGmOPeM4bW2SRawsl6qJMkWwhOLFuUesORc4XK3w";

// Only use localStorage if in a browser
const isBrowser = typeof window !== 'undefined';

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: isBrowser, // only persist in browser
      detectSessionInUrl: isBrowser,
      storage: isBrowser ? localStorage : undefined,
    },
    global: {
      headers: {
        'X-Client-Info': 'supabase-js-web/2.49.1',
      },
    },
  }
);