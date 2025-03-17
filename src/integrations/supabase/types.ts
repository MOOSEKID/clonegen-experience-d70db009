export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      class_enrollments: {
        Row: {
          attendance_date: string | null
          attended: boolean | null
          class_id: string | null
          enrolled_at: string | null
          id: string
          member_id: string | null
          status: string | null
        }
        Insert: {
          attendance_date?: string | null
          attended?: boolean | null
          class_id?: string | null
          enrolled_at?: string | null
          id?: string
          member_id?: string | null
          status?: string | null
        }
        Update: {
          attendance_date?: string | null
          attended?: boolean | null
          class_id?: string | null
          enrolled_at?: string | null
          id?: string
          member_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "class_enrollments_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_enrollments_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          capacity: number | null
          class_type: string | null
          created_at: string | null
          day_of_week: string | null
          description: string | null
          difficulty_level: string | null
          duration: number | null
          end_time: string | null
          equipment_required: string[] | null
          id: string
          location: string | null
          name: string
          recurring: boolean | null
          start_time: string | null
          status: string | null
          trainer_id: string | null
          updated_at: string | null
        }
        Insert: {
          capacity?: number | null
          class_type?: string | null
          created_at?: string | null
          day_of_week?: string | null
          description?: string | null
          difficulty_level?: string | null
          duration?: number | null
          end_time?: string | null
          equipment_required?: string[] | null
          id?: string
          location?: string | null
          name: string
          recurring?: boolean | null
          start_time?: string | null
          status?: string | null
          trainer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          capacity?: number | null
          class_type?: string | null
          created_at?: string | null
          day_of_week?: string | null
          description?: string | null
          difficulty_level?: string | null
          duration?: number | null
          end_time?: string | null
          equipment_required?: string[] | null
          id?: string
          location?: string | null
          name?: string
          recurring?: boolean | null
          start_time?: string | null
          status?: string | null
          trainer_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainers"
            referencedColumns: ["id"]
          },
        ]
      }
      client_progress: {
        Row: {
          arm_measurement: number | null
          body_fat_percentage: number | null
          chest_measurement: number | null
          client_id: string | null
          created_at: string | null
          date: string
          hip_measurement: number | null
          id: string
          notes: string | null
          thigh_measurement: number | null
          trainer_id: string | null
          updated_at: string | null
          waist_measurement: number | null
          weight: number | null
        }
        Insert: {
          arm_measurement?: number | null
          body_fat_percentage?: number | null
          chest_measurement?: number | null
          client_id?: string | null
          created_at?: string | null
          date: string
          hip_measurement?: number | null
          id?: string
          notes?: string | null
          thigh_measurement?: number | null
          trainer_id?: string | null
          updated_at?: string | null
          waist_measurement?: number | null
          weight?: number | null
        }
        Update: {
          arm_measurement?: number | null
          body_fat_percentage?: number | null
          chest_measurement?: number | null
          client_id?: string | null
          created_at?: string | null
          date?: string
          hip_measurement?: number | null
          id?: string
          notes?: string | null
          thigh_measurement?: number | null
          trainer_id?: string | null
          updated_at?: string | null
          waist_measurement?: number | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "client_progress_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_progress_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainers"
            referencedColumns: ["id"]
          },
        ]
      }
      client_sessions: {
        Row: {
          achievements: string | null
          client_id: string | null
          created_at: string | null
          duration: number | null
          end_time: string
          focus_areas: string[] | null
          id: string
          location: string | null
          notes: string | null
          session_date: string
          session_type: string | null
          start_time: string
          status: string | null
          trainer_id: string | null
          updated_at: string | null
        }
        Insert: {
          achievements?: string | null
          client_id?: string | null
          created_at?: string | null
          duration?: number | null
          end_time: string
          focus_areas?: string[] | null
          id?: string
          location?: string | null
          notes?: string | null
          session_date: string
          session_type?: string | null
          start_time: string
          status?: string | null
          trainer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          achievements?: string | null
          client_id?: string | null
          created_at?: string | null
          duration?: number | null
          end_time?: string
          focus_areas?: string[] | null
          id?: string
          location?: string | null
          notes?: string | null
          session_date?: string
          session_type?: string | null
          start_time?: string
          status?: string | null
          trainer_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_sessions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_sessions_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainers"
            referencedColumns: ["id"]
          },
        ]
      }
      gym_locations: {
        Row: {
          capacity: number | null
          created_at: string | null
          equipment: string[] | null
          id: string
          name: string
          type: string
          updated_at: string | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string | null
          equipment?: string[] | null
          id?: string
          name: string
          type: string
          updated_at?: string | null
        }
        Update: {
          capacity?: number | null
          created_at?: string | null
          equipment?: string[] | null
          id?: string
          name?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      members: {
        Row: {
          accountenabled: boolean | null
          address: string | null
          created_at: string | null
          dateofbirth: string | null
          discountsused: string | null
          email: string | null
          emergencycontact: string | null
          enddate: string | null
          fingerprintid: string | null
          gender: string | null
          id: string
          lastcheckin: string | null
          lastlogin: string | null
          linkedcompanyid: string | null
          linkedtocompany: boolean | null
          medicalconditions: string | null
          membershipcategory: string | null
          membershipplan: string | null
          membershiptype: string | null
          name: string
          nfccardid: string | null
          notes: string | null
          passwordresetrequired: boolean | null
          paymentstatus: string | null
          phone: string | null
          preferredworkouttime: string[] | null
          profilepicture: string | null
          startdate: string | null
          status: string | null
          trainerassigned: string | null
          updated_at: string | null
          username: string | null
          workoutgoals: string | null
        }
        Insert: {
          accountenabled?: boolean | null
          address?: string | null
          created_at?: string | null
          dateofbirth?: string | null
          discountsused?: string | null
          email?: string | null
          emergencycontact?: string | null
          enddate?: string | null
          fingerprintid?: string | null
          gender?: string | null
          id?: string
          lastcheckin?: string | null
          lastlogin?: string | null
          linkedcompanyid?: string | null
          linkedtocompany?: boolean | null
          medicalconditions?: string | null
          membershipcategory?: string | null
          membershipplan?: string | null
          membershiptype?: string | null
          name: string
          nfccardid?: string | null
          notes?: string | null
          passwordresetrequired?: boolean | null
          paymentstatus?: string | null
          phone?: string | null
          preferredworkouttime?: string[] | null
          profilepicture?: string | null
          startdate?: string | null
          status?: string | null
          trainerassigned?: string | null
          updated_at?: string | null
          username?: string | null
          workoutgoals?: string | null
        }
        Update: {
          accountenabled?: boolean | null
          address?: string | null
          created_at?: string | null
          dateofbirth?: string | null
          discountsused?: string | null
          email?: string | null
          emergencycontact?: string | null
          enddate?: string | null
          fingerprintid?: string | null
          gender?: string | null
          id?: string
          lastcheckin?: string | null
          lastlogin?: string | null
          linkedcompanyid?: string | null
          linkedtocompany?: boolean | null
          medicalconditions?: string | null
          membershipcategory?: string | null
          membershipplan?: string | null
          membershiptype?: string | null
          name?: string
          nfccardid?: string | null
          notes?: string | null
          passwordresetrequired?: boolean | null
          paymentstatus?: string | null
          phone?: string | null
          preferredworkouttime?: string[] | null
          profilepicture?: string | null
          startdate?: string | null
          status?: string | null
          trainerassigned?: string | null
          updated_at?: string | null
          username?: string | null
          workoutgoals?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          is_admin: boolean | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          is_admin?: boolean | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      trainer_attendance: {
        Row: {
          check_in_time: string | null
          check_out_time: string | null
          created_at: string | null
          date: string
          id: string
          notes: string | null
          trainer_id: string | null
          updated_at: string | null
        }
        Insert: {
          check_in_time?: string | null
          check_out_time?: string | null
          created_at?: string | null
          date: string
          id?: string
          notes?: string | null
          trainer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          check_in_time?: string | null
          check_out_time?: string | null
          created_at?: string | null
          date?: string
          id?: string
          notes?: string | null
          trainer_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trainer_attendance_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainers"
            referencedColumns: ["id"]
          },
        ]
      }
      trainer_availability: {
        Row: {
          created_at: string | null
          day_of_week: string | null
          end_time: string | null
          id: string
          start_time: string | null
          trainer_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          day_of_week?: string | null
          end_time?: string | null
          id?: string
          start_time?: string | null
          trainer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          day_of_week?: string | null
          end_time?: string | null
          id?: string
          start_time?: string | null
          trainer_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trainer_availability_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainers"
            referencedColumns: ["id"]
          },
        ]
      }
      trainer_certifications: {
        Row: {
          certification_file: string | null
          certification_name: string
          created_at: string | null
          expiry_date: string | null
          id: string
          issue_date: string | null
          issuing_organization: string | null
          trainer_id: string | null
          updated_at: string | null
          verified: boolean | null
        }
        Insert: {
          certification_file?: string | null
          certification_name: string
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          issuing_organization?: string | null
          trainer_id?: string | null
          updated_at?: string | null
          verified?: boolean | null
        }
        Update: {
          certification_file?: string | null
          certification_name?: string
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          issuing_organization?: string | null
          trainer_id?: string | null
          updated_at?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "trainer_certifications_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainers"
            referencedColumns: ["id"]
          },
        ]
      }
      trainer_client_assignments: {
        Row: {
          assignment_date: string
          client_id: string | null
          created_at: string | null
          end_date: string | null
          id: string
          notes: string | null
          status: string | null
          trainer_id: string | null
          updated_at: string | null
        }
        Insert: {
          assignment_date: string
          client_id?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          notes?: string | null
          status?: string | null
          trainer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          assignment_date?: string
          client_id?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          notes?: string | null
          status?: string | null
          trainer_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trainer_client_assignments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trainer_client_assignments_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainers"
            referencedColumns: ["id"]
          },
        ]
      }
      trainer_ratings: {
        Row: {
          created_at: string | null
          id: string
          member_id: string | null
          rating: number | null
          review: string | null
          trainer_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          member_id?: string | null
          rating?: number | null
          review?: string | null
          trainer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          member_id?: string | null
          rating?: number | null
          review?: string | null
          trainer_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trainer_ratings_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trainer_ratings_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainers"
            referencedColumns: ["id"]
          },
        ]
      }
      trainers: {
        Row: {
          availability: Json | null
          bio: string | null
          certifications: string[] | null
          created_at: string | null
          email: string | null
          hiredate: string | null
          hourlyrate: number | null
          id: string
          name: string
          phone: string | null
          profilepicture: string | null
          specialization: string[] | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          availability?: Json | null
          bio?: string | null
          certifications?: string[] | null
          created_at?: string | null
          email?: string | null
          hiredate?: string | null
          hourlyrate?: number | null
          id?: string
          name: string
          phone?: string | null
          profilepicture?: string | null
          specialization?: string[] | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          availability?: Json | null
          bio?: string | null
          certifications?: string[] | null
          created_at?: string | null
          email?: string | null
          hiredate?: string | null
          hourlyrate?: number | null
          id?: string
          name?: string
          phone?: string | null
          profilepicture?: string | null
          specialization?: string[] | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
