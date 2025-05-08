import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qrjwfiurwvcsyrcpewsj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyandmaXVyd3Zjc3lyY3Bld3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyNDI3ODQsImV4cCI6MjA1NzgxODc4NH0.F90uGmOPeM4bW2SRawsl6qJMkWwhOLFuUesORc4XK3w";

// Create the Supabase client with explicit settings for auth persistence
export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      storage: localStorage
    },
    global: {
      headers: {
        'X-Client-Info': 'supabase-js-web/2.49.1',
      },
    },
  }
);

// Add type assertions for custom tables in Database
declare module '@supabase/supabase-js' {
  interface Database {
    public: {
      Tables: {
        // Add our settings tables
        settings_general: any;
        settings_business_hours: any;
        settings_business_holidays: any;
        settings_security: any;
        settings_platform: any;
        settings_integrations: any;
        settings_roles: any;
        settings_members_defaults: any;
        settings_companies_automation: any;
        settings_notifications: any;
        settings_invoices_templates: any;
        settings_reports_export: any;
        settings_automations: any;
        settings_testing_accounts: any;
        settings_ui_messages: any;
        // ... existing tables
      }
    }
  }
}
