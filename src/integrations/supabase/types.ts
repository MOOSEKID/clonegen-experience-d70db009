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
      attendance_records: {
        Row: {
          checkintime: string
          checkouttime: string | null
          created_at: string | null
          date: string
          duration: number | null
          id: string
          memberid: string | null
        }
        Insert: {
          checkintime: string
          checkouttime?: string | null
          created_at?: string | null
          date?: string
          duration?: number | null
          id?: string
          memberid?: string | null
        }
        Update: {
          checkintime?: string
          checkouttime?: string | null
          created_at?: string | null
          date?: string
          duration?: number | null
          id?: string
          memberid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_records_memberid_fkey"
            columns: ["memberid"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          adminsetuprequired: boolean | null
          billingcycle: string | null
          companyaddress: string | null
          companycontactperson: string | null
          companyemail: string
          companylogo: string | null
          companymembershipplan: string | null
          companyname: string
          companyphone: string | null
          companytin: string | null
          corporatediscounttype: string | null
          corporatediscountvalue: number | null
          created_at: string | null
          enddate: string
          hasadminuser: boolean | null
          id: string
          memberscovered: number | null
          paymentmode: string | null
          startdate: string
          status: string
          subscriptionmodel: string | null
          updated_at: string | null
        }
        Insert: {
          adminsetuprequired?: boolean | null
          billingcycle?: string | null
          companyaddress?: string | null
          companycontactperson?: string | null
          companyemail: string
          companylogo?: string | null
          companymembershipplan?: string | null
          companyname: string
          companyphone?: string | null
          companytin?: string | null
          corporatediscounttype?: string | null
          corporatediscountvalue?: number | null
          created_at?: string | null
          enddate: string
          hasadminuser?: boolean | null
          id?: string
          memberscovered?: number | null
          paymentmode?: string | null
          startdate?: string
          status?: string
          subscriptionmodel?: string | null
          updated_at?: string | null
        }
        Update: {
          adminsetuprequired?: boolean | null
          billingcycle?: string | null
          companyaddress?: string | null
          companycontactperson?: string | null
          companyemail?: string
          companylogo?: string | null
          companymembershipplan?: string | null
          companyname?: string
          companyphone?: string | null
          companytin?: string | null
          corporatediscounttype?: string | null
          corporatediscountvalue?: number | null
          created_at?: string | null
          enddate?: string
          hasadminuser?: boolean | null
          id?: string
          memberscovered?: number | null
          paymentmode?: string | null
          startdate?: string
          status?: string
          subscriptionmodel?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      company_invoices: {
        Row: {
          companyid: string | null
          created_at: string | null
          duedate: string
          id: string
          invoicenumber: string
          issuedate: string
          items: Json | null
          notes: string | null
          status: string | null
          totalamount: number
          updated_at: string | null
        }
        Insert: {
          companyid?: string | null
          created_at?: string | null
          duedate: string
          id?: string
          invoicenumber: string
          issuedate?: string
          items?: Json | null
          notes?: string | null
          status?: string | null
          totalamount: number
          updated_at?: string | null
        }
        Update: {
          companyid?: string | null
          created_at?: string | null
          duedate?: string
          id?: string
          invoicenumber?: string
          issuedate?: string
          items?: Json | null
          notes?: string | null
          status?: string | null
          totalamount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_invoices_companyid_fkey"
            columns: ["companyid"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          accountenabled: boolean | null
          address: string | null
          created_at: string | null
          dateofbirth: string | null
          discountsused: string | null
          email: string
          emergencycontact: string | null
          enddate: string
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
          membershiptype: string
          name: string
          nfccardid: string | null
          notes: string | null
          passwordresetrequired: boolean | null
          paymentstatus: string | null
          phone: string | null
          preferredworkouttime: string[] | null
          profilepicture: string | null
          startdate: string
          status: string
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
          email: string
          emergencycontact?: string | null
          enddate: string
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
          membershiptype: string
          name: string
          nfccardid?: string | null
          notes?: string | null
          passwordresetrequired?: boolean | null
          paymentstatus?: string | null
          phone?: string | null
          preferredworkouttime?: string[] | null
          profilepicture?: string | null
          startdate?: string
          status?: string
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
          email?: string
          emergencycontact?: string | null
          enddate?: string
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
          membershiptype?: string
          name?: string
          nfccardid?: string | null
          notes?: string | null
          passwordresetrequired?: boolean | null
          paymentstatus?: string | null
          phone?: string | null
          preferredworkouttime?: string[] | null
          profilepicture?: string | null
          startdate?: string
          status?: string
          trainerassigned?: string | null
          updated_at?: string | null
          username?: string | null
          workoutgoals?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_linked_company"
            columns: ["linkedcompanyid"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      trainers: {
        Row: {
          bio: string | null
          created_at: string | null
          email: string
          hiredate: string | null
          id: string
          name: string
          phone: string | null
          profilepicture: string | null
          schedule: Json | null
          specialization: string[] | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          email: string
          hiredate?: string | null
          id?: string
          name: string
          phone?: string | null
          profilepicture?: string | null
          schedule?: Json | null
          specialization?: string[] | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          email?: string
          hiredate?: string | null
          id?: string
          name?: string
          phone?: string | null
          profilepicture?: string | null
          schedule?: Json | null
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
