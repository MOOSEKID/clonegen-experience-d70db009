export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          role: string
          is_admin: boolean
          is_staff: boolean
          staff_category: string | null
          department: string | null
          specializations: string[] | null
          access_level: string
          reporting_to: string | null
          shift_preference: Json | null
          max_clients: number | null
          certifications: string[] | null
          primary_location: string | null
          secondary_locations: string[] | null
          working_hours: Json | null
          contact_phone: string | null
          emergency_contact: Json | null
          status: string
          created_at: string
          updated_at: string
          last_login: string | null
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role?: string
          is_admin?: boolean
          is_staff?: boolean
          staff_category?: string | null
          department?: string | null
          specializations?: string[] | null
          access_level?: string
          reporting_to?: string | null
          shift_preference?: Json | null
          max_clients?: number | null
          certifications?: string[] | null
          primary_location?: string | null
          secondary_locations?: string[] | null
          working_hours?: Json | null
          contact_phone?: string | null
          emergency_contact?: Json | null
          status?: string
          created_at?: string
          updated_at?: string
          last_login?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: string
          is_admin?: boolean
          is_staff?: boolean
          staff_category?: string | null
          department?: string | null
          specializations?: string[] | null
          access_level?: string
          reporting_to?: string | null
          shift_preference?: Json | null
          max_clients?: number | null
          certifications?: string[] | null
          primary_location?: string | null
          secondary_locations?: string[] | null
          working_hours?: Json | null
          contact_phone?: string | null
          emergency_contact?: Json | null
          status?: string
          created_at?: string
          updated_at?: string
          last_login?: string | null
        }
      }
      staff_schedules: {
        Row: {
          id: string
          staff_id: string
          day_of_week: number
          start_time: string
          end_time: string
          is_available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          staff_id: string
          day_of_week: number
          start_time: string
          end_time: string
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          staff_id?: string
          day_of_week?: number
          start_time?: string
          end_time?: string
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      staff_certifications: {
        Row: {
          id: string
          staff_id: string
          certification_name: string
          issuing_organization: string
          issue_date: string
          expiry_date: string | null
          verification_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          staff_id: string
          certification_name: string
          issuing_organization: string
          issue_date: string
          expiry_date?: string | null
          verification_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          staff_id?: string
          certification_name?: string
          issuing_organization?: string
          issue_date?: string
          expiry_date?: string | null
          verification_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_default_access_level: {
        Args: { role: string }
        Returns: string
      }
      get_staff_category: {
        Args: { role: string }
        Returns: string
      }
    }
    Enums: {
      staff_category: 'Management' | 'Training' | 'Operations' | 'Reception' | 'Maintenance'
      user_role: 
        | 'admin'
        | 'general_manager'
        | 'operations_manager'
        | 'fitness_manager'
        | 'head_trainer'
        | 'senior_trainer'
        | 'trainer'
        | 'trainee_trainer'
        | 'receptionist'
        | 'membership_coordinator'
        | 'nutritionist'
        | 'physiotherapist'
        | 'maintenance_supervisor'
        | 'maintenance_staff'
        | 'client'
      trainer_specialization:
        | 'Strength Training'
        | 'Cardio Fitness'
        | 'Yoga'
        | 'Pilates'
        | 'CrossFit'
        | 'Nutrition'
        | 'Personal Training'
        | 'Group Fitness'
        | 'Sports Conditioning'
        | 'Rehabilitation'
      department_type: 'Management' | 'Training' | 'Operations' | 'Reception' | 'Maintenance'
      access_level: 'Full' | 'High' | 'Medium' | 'Basic' | 'Limited'
      staff_status: 'Active' | 'Inactive' | 'On Leave' | 'Terminated'
    }
  }
}
