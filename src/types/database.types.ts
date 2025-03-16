export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: string;
          is_admin: boolean;
          is_staff: boolean;
          company_id?: string;
          position?: string;
          department?: string;
          staff_type?: string;
          specialization?: string[];
          customer_type?: string;
          membership_type?: string;
          membership_status?: string;
          created_at: string;
          updated_at: string;
          avatar_url?: string;
          username?: string;
          contact_number?: string;
          gym_location?: string;
          preferred_workout_time?: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role: string;
          is_admin: boolean;
          is_staff: boolean;
          company_id?: string;
          position?: string;
          department?: string;
          staff_type?: string;
          specialization?: string[];
          customer_type?: string;
          membership_type?: string;
          membership_status?: string;
          created_at?: string;
          updated_at?: string;
          avatar_url?: string;
          username?: string;
          contact_number?: string;
          gym_location?: string;
          preferred_workout_time?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: string;
          is_admin?: boolean;
          is_staff?: boolean;
          company_id?: string;
          position?: string;
          department?: string;
          staff_type?: string;
          specialization?: string[];
          customer_type?: string;
          membership_type?: string;
          membership_status?: string;
          created_at?: string;
          updated_at?: string;
          avatar_url?: string;
          username?: string;
          contact_number?: string;
          gym_location?: string;
          preferred_workout_time?: string;
        };
      };
      companies: {
        Row: {
          id: string;
          name: string;
          industry?: string;
          contact_email?: string;
          contact_phone?: string;
          address?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          industry?: string;
          contact_email?: string;
          contact_phone?: string;
          address?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          industry?: string;
          contact_email?: string;
          contact_phone?: string;
          address?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      company_memberships: {
        Row: {
          id: string;
          company_id: string;
          membership_type: string;
          start_date: string;
          end_date?: string;
          status: string;
          max_employees?: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company_id: string;
          membership_type: string;
          start_date: string;
          end_date?: string;
          status?: string;
          max_employees?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company_id?: string;
          membership_type?: string;
          start_date?: string;
          end_date?: string;
          status?: string;
          max_employees?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      staff_assignments: {
        Row: {
          id: string;
          staff_id: string;
          assigned_to_id: string;
          assignment_type: string;
          start_date: string;
          end_date?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          staff_id: string;
          assigned_to_id: string;
          assignment_type: string;
          start_date: string;
          end_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          staff_id?: string;
          assigned_to_id?: string;
          assignment_type?: string;
          start_date?: string;
          end_date?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
