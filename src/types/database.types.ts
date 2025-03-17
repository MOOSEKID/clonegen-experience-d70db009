export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: UserRole;
          is_admin: boolean;
          is_staff: boolean;
          staff_category: StaffCategory | null;
          department: DepartmentType | null;
          access_level: AccessLevel;
          status: StaffStatus;
          specializations: TrainerSpecialization[] | null;
          reporting_to: string | null;
          shift_preference: string | null;
          max_clients: number | null;
          certifications: string[] | null;
          working_hours: WorkingHours | null;
          primary_location: string | null;
          secondary_locations: string[] | null;
          contact_email: string | null;
          contact_phone: string | null;
          emergency_contact: EmergencyContact | null;
          last_login: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role: UserRole;
          is_admin: boolean;
          is_staff: boolean;
          staff_category?: StaffCategory | null;
          department?: DepartmentType | null;
          access_level: AccessLevel;
          status: StaffStatus;
          specializations?: TrainerSpecialization[] | null;
          reporting_to?: string | null;
          shift_preference?: string | null;
          max_clients?: number | null;
          certifications?: string[] | null;
          working_hours?: WorkingHours | null;
          primary_location?: string | null;
          secondary_locations?: string[] | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          emergency_contact?: EmergencyContact | null;
          last_login?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: UserRole;
          is_admin?: boolean;
          is_staff?: boolean;
          staff_category?: StaffCategory | null;
          department?: DepartmentType | null;
          access_level?: AccessLevel;
          status?: StaffStatus;
          specializations?: TrainerSpecialization[] | null;
          reporting_to?: string | null;
          shift_preference?: string | null;
          max_clients?: number | null;
          certifications?: string[] | null;
          working_hours?: WorkingHours | null;
          primary_location?: string | null;
          secondary_locations?: string[] | null;
          contact_email?: string | null;
          contact_phone?: string | null;
          emergency_contact?: EmergencyContact | null;
          last_login?: string | null;
          created_at?: string;
          updated_at?: string;
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
      staff_schedules: {
        Row: {
          id: string;
          staff_id: string;
          start_time: string;
          end_time: string;
          days: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          staff_id: string;
          start_time: string;
          end_time: string;
          days: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          staff_id?: string;
          start_time?: string;
          end_time?: string;
          days?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      staff_certifications: {
        Row: {
          id: string;
          staff_id: string;
          name: string;
          issuer: string;
          issue_date: string;
          expiry_date?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          staff_id: string;
          name: string;
          issuer: string;
          issue_date: string;
          expiry_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          staff_id?: string;
          name?: string;
          issuer?: string;
          issue_date?: string;
          expiry_date?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never;

// Custom Types
export type UserRole =
  | "admin"
  | "general_manager"
  | "operations_manager"
  | "fitness_manager"
  | "head_trainer"
  | "senior_trainer"
  | "trainer"
  | "trainee_trainer"
  | "supervisor"
  | "receptionist"
  | "membership_coordinator"
  | "nutritionist"
  | "physiotherapist"
  | "maintenance_supervisor"
  | "maintenance_staff"
  | "cleaner"
  | "individual_client";

export type StaffCategory =
  | "management"
  | "training"
  | "operations"
  | "reception"
  | "maintenance";

export type DepartmentType =
  | "management"
  | "fitness"
  | "operations"
  | "maintenance";

export type AccessLevel =
  | "full"
  | "high"
  | "medium"
  | "basic"
  | "limited";

export type StaffStatus =
  | "active"
  | "inactive"
  | "on_leave"
  | "terminated";

export type TrainerSpecialization =
  | "strength_training"
  | "cardio"
  | "yoga"
  | "pilates"
  | "crossfit"
  | "nutrition"
  | "rehabilitation"
  | "sports_specific"
  | "group_fitness"
  | "personal_training";

export type WorkingHours = {
  start: string;
  end: string;
  days: string[];
};

export type EmergencyContact = {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  address?: string;
};

// Profile type for use in the application
export type UserProfile = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];
