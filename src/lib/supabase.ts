import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          staff_category: string;
          role: string;
          is_admin: boolean;
          is_staff: boolean;
          access_level: string;
          status: string;
          created_at: string;
          updated_at: string;
          last_login: string;
          department: string | null;
          specializations: string[] | null;
          reporting_to: string | null;
          shift_preference: string | null;
          max_clients: number | null;
          certifications: string[] | null;
          primary_location: string | null;
          secondary_locations: string[] | null;
          working_hours: {
            start: string;
            end: string;
            days: string[];
          } | null;
          contact_email: string | null;
          contact_phone: string | null;
          emergency_contact: {
            name: string;
            phone: string;
            relationship: string;
          } | null;
        };
        Insert: {
          id?: string;
          email: string;
          full_name: string;
          staff_category: string;
          role: string;
          is_admin?: boolean;
          is_staff?: boolean;
          access_level: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
          last_login?: string;
          department?: string | null;
          specializations?: string[] | null;
          reporting_to?: string | null;
          shift_preference?: string | null;
          max_clients?: number | null;
          certifications?: string[] | null;
          primary_location?: string | null;
          secondary_locations?: string[] | null;
          working_hours?: {
            start: string;
            end: string;
            days: string[];
          } | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          emergency_contact?: {
            name: string;
            phone: string;
            relationship: string;
          } | null;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          staff_category?: string;
          role?: string;
          is_admin?: boolean;
          is_staff?: boolean;
          access_level?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
          last_login?: string;
          department?: string | null;
          specializations?: string[] | null;
          reporting_to?: string | null;
          shift_preference?: string | null;
          max_clients?: number | null;
          certifications?: string[] | null;
          primary_location?: string | null;
          secondary_locations?: string[] | null;
          working_hours?: {
            start: string;
            end: string;
            days: string[];
          } | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          emergency_contact?: {
            name: string;
            phone: string;
            relationship: string;
          } | null;
        };
      };
      availability: {
        Row: {
          id: string;
          trainer_id: string;
          day_of_week: string;
          start_time: string;
          end_time: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          trainer_id: string;
          day_of_week: string;
          start_time: string;
          end_time: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          trainer_id?: string;
          day_of_week?: string;
          start_time?: string;
          end_time?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
