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
      attendance_tracking: {
        Row: {
          check_in: string | null
          check_out: string | null
          created_at: string | null
          id: string
          member_id: string | null
          notes: string | null
          status: string | null
          trainer_id: string | null
          updated_at: string | null
        }
        Insert: {
          check_in?: string | null
          check_out?: string | null
          created_at?: string | null
          id?: string
          member_id?: string | null
          notes?: string | null
          status?: string | null
          trainer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          check_in?: string | null
          check_out?: string | null
          created_at?: string | null
          id?: string
          member_id?: string | null
          notes?: string | null
          status?: string | null
          trainer_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_tracking_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_tracking_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainers"
            referencedColumns: ["id"]
          },
        ]
      }
      class_enrollments: {
        Row: {
          class_id: string | null
          enrollment_date: string | null
          id: string
          member_id: string | null
          status: string | null
          waitlist_position: number | null
        }
        Insert: {
          class_id?: string | null
          enrollment_date?: string | null
          id?: string
          member_id?: string | null
          status?: string | null
          waitlist_position?: number | null
        }
        Update: {
          class_id?: string | null
          enrollment_date?: string | null
          id?: string
          member_id?: string | null
          status?: string | null
          waitlist_position?: number | null
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
          capacity: number
          class_fees: number | null
          class_level: string | null
          created_at: string | null
          day: string
          description: string | null
          duration: number
          equipment_required: string[] | null
          fee_type: string | null
          id: string
          name: string
          recurrence: boolean | null
          recurrence_days: string[] | null
          room: string | null
          status: string | null
          time: string
          trainer_id: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          capacity: number
          class_fees?: number | null
          class_level?: string | null
          created_at?: string | null
          day: string
          description?: string | null
          duration: number
          equipment_required?: string[] | null
          fee_type?: string | null
          id?: string
          name: string
          recurrence?: boolean | null
          recurrence_days?: string[] | null
          room?: string | null
          status?: string | null
          time: string
          trainer_id?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          capacity?: number
          class_fees?: number | null
          class_level?: string | null
          created_at?: string | null
          day?: string
          description?: string | null
          duration?: number
          equipment_required?: string[] | null
          fee_type?: string | null
          id?: string
          name?: string
          recurrence?: boolean | null
          recurrence_days?: string[] | null
          room?: string | null
          status?: string | null
          time?: string
          trainer_id?: string | null
          type?: string
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
          duration: number
          focus_areas: string[] | null
          id: string
          notes: string | null
          session_date: string
          status: string | null
          trainer_id: string | null
          updated_at: string | null
        }
        Insert: {
          achievements?: string | null
          client_id?: string | null
          created_at?: string | null
          duration: number
          focus_areas?: string[] | null
          id?: string
          notes?: string | null
          session_date: string
          status?: string | null
          trainer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          achievements?: string | null
          client_id?: string | null
          created_at?: string | null
          duration?: number
          focus_areas?: string[] | null
          id?: string
          notes?: string | null
          session_date?: string
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
      exercise_logs: {
        Row: {
          created_at: string | null
          duration_seconds: number | null
          exercise_id: string | null
          id: string
          notes: string | null
          reps_completed: number | null
          sets_completed: number | null
          weight_used: number | null
          workout_log_id: string | null
        }
        Insert: {
          created_at?: string | null
          duration_seconds?: number | null
          exercise_id?: string | null
          id?: string
          notes?: string | null
          reps_completed?: number | null
          sets_completed?: number | null
          weight_used?: number | null
          workout_log_id?: string | null
        }
        Update: {
          created_at?: string | null
          duration_seconds?: number | null
          exercise_id?: string | null
          id?: string
          notes?: string | null
          reps_completed?: number | null
          sets_completed?: number | null
          weight_used?: number | null
          workout_log_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exercise_logs_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercise_logs_workout_log_id_fkey"
            columns: ["workout_log_id"]
            isOneToOne: false
            referencedRelation: "workout_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      exercises: {
        Row: {
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          equipment_needed: string | null
          id: string
          image_url: string | null
          instructions: string | null
          muscle_group: string | null
          name: string
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          equipment_needed?: string | null
          id?: string
          image_url?: string | null
          instructions?: string | null
          muscle_group?: string | null
          name: string
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          equipment_needed?: string | null
          id?: string
          image_url?: string | null
          instructions?: string | null
          muscle_group?: string | null
          name?: string
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      gym_locations: {
        Row: {
          capacity: number | null
          created_at: string
          equipment: string[] | null
          id: string
          name: string
          type: string
          updated_at: string
        }
        Insert: {
          capacity?: number | null
          created_at?: string
          equipment?: string[] | null
          id?: string
          name: string
          type: string
          updated_at?: string
        }
        Update: {
          capacity?: number | null
          created_at?: string
          equipment?: string[] | null
          id?: string
          name?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      member_workouts: {
        Row: {
          created_at: string | null
          end_date: string | null
          id: string
          member_id: string | null
          notes: string | null
          program_id: string | null
          start_date: string | null
          status: string | null
          trainer_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          member_id?: string | null
          notes?: string | null
          program_id?: string | null
          start_date?: string | null
          status?: string | null
          trainer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          member_id?: string | null
          notes?: string | null
          program_id?: string | null
          start_date?: string | null
          status?: string | null
          trainer_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "member_workouts_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_workouts_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "workout_programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "member_workouts_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainers"
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
      payments: {
        Row: {
          amount: number
          company_id: string | null
          created_at: string | null
          currency: string | null
          id: string
          invoice_id: string | null
          member_id: string | null
          notes: string | null
          payment_method: string | null
          payment_type: string | null
          status: string | null
          transaction_id: string | null
        }
        Insert: {
          amount: number
          company_id?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          invoice_id?: string | null
          member_id?: string | null
          notes?: string | null
          payment_method?: string | null
          payment_type?: string | null
          status?: string | null
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          company_id?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          invoice_id?: string | null
          member_id?: string | null
          notes?: string | null
          payment_method?: string | null
          payment_type?: string | null
          status?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "company_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          is_admin: boolean | null
          role: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          is_admin?: boolean | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          role?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      program_exercises: {
        Row: {
          created_at: string | null
          day_number: number | null
          duration_seconds: number | null
          exercise_id: string | null
          id: string
          notes: string | null
          order_in_workout: number | null
          program_id: string | null
          reps: number | null
          sets: number | null
          week_number: number | null
        }
        Insert: {
          created_at?: string | null
          day_number?: number | null
          duration_seconds?: number | null
          exercise_id?: string | null
          id?: string
          notes?: string | null
          order_in_workout?: number | null
          program_id?: string | null
          reps?: number | null
          sets?: number | null
          week_number?: number | null
        }
        Update: {
          created_at?: string | null
          day_number?: number | null
          duration_seconds?: number | null
          exercise_id?: string | null
          id?: string
          notes?: string | null
          order_in_workout?: number | null
          program_id?: string | null
          reps?: number | null
          sets?: number | null
          week_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "program_exercises_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_exercises_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "workout_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          permissions: Json
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          permissions?: Json
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          permissions?: Json
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
          date?: string
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
          day_of_week: string
          end_time: string
          id: string
          start_time: string
          trainer_id: string | null
        }
        Insert: {
          created_at?: string | null
          day_of_week: string
          end_time: string
          id?: string
          start_time: string
          trainer_id?: string | null
        }
        Update: {
          created_at?: string | null
          day_of_week?: string
          end_time?: string
          id?: string
          start_time?: string
          trainer_id?: string | null
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
          certification_name: string
          created_at: string | null
          expiry_date: string | null
          id: string
          issue_date: string | null
          issuing_organization: string
          trainer_id: string | null
        }
        Insert: {
          certification_name: string
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          issuing_organization: string
          trainer_id?: string | null
        }
        Update: {
          certification_name?: string
          created_at?: string | null
          expiry_date?: string | null
          id?: string
          issue_date?: string | null
          issuing_organization?: string
          trainer_id?: string | null
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
          id: string
          status: string | null
          trainer_id: string | null
          updated_at: string | null
        }
        Insert: {
          assignment_date?: string
          client_id?: string | null
          created_at?: string | null
          id?: string
          status?: string | null
          trainer_id?: string | null
          updated_at?: string | null
        }
        Update: {
          assignment_date?: string
          client_id?: string | null
          created_at?: string | null
          id?: string
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
      trainer_performance: {
        Row: {
          avg_session_rating: number | null
          class_fill_rate: number | null
          classes_taught: number | null
          created_at: string | null
          date: string
          id: string
          monthly_goal_progress: number | null
          new_clients: number | null
          private_sessions: number | null
          total_hours: number | null
          trainer_id: string
          updated_at: string | null
        }
        Insert: {
          avg_session_rating?: number | null
          class_fill_rate?: number | null
          classes_taught?: number | null
          created_at?: string | null
          date?: string
          id?: string
          monthly_goal_progress?: number | null
          new_clients?: number | null
          private_sessions?: number | null
          total_hours?: number | null
          trainer_id: string
          updated_at?: string | null
        }
        Update: {
          avg_session_rating?: number | null
          class_fill_rate?: number | null
          classes_taught?: number | null
          created_at?: string | null
          date?: string
          id?: string
          monthly_goal_progress?: number | null
          new_clients?: number | null
          private_sessions?: number | null
          total_hours?: number | null
          trainer_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trainer_performance_trainer_id_fkey"
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
          is_flagged: boolean | null
          member_id: string | null
          member_name: string | null
          rating: number
          review: string | null
          trainer_id: string | null
          trainer_response: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_flagged?: boolean | null
          member_id?: string | null
          member_name?: string | null
          rating: number
          review?: string | null
          trainer_id?: string | null
          trainer_response?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_flagged?: boolean | null
          member_id?: string | null
          member_name?: string | null
          rating?: number
          review?: string | null
          trainer_id?: string | null
          trainer_response?: string | null
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
          bio: string | null
          created_at: string | null
          email: string
          experience_level: string | null
          experience_years: number | null
          hire_date: string | null
          hiredate: string | null
          id: string
          name: string
          phone: string | null
          profile_picture: string | null
          profilepicture: string | null
          schedule: Json | null
          specialization: string[] | null
          status: string | null
          stripe_account_id: string | null
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          email: string
          experience_level?: string | null
          experience_years?: number | null
          hire_date?: string | null
          hiredate?: string | null
          id?: string
          name: string
          phone?: string | null
          profile_picture?: string | null
          profilepicture?: string | null
          schedule?: Json | null
          specialization?: string[] | null
          status?: string | null
          stripe_account_id?: string | null
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          email?: string
          experience_level?: string | null
          experience_years?: number | null
          hire_date?: string | null
          hiredate?: string | null
          id?: string
          name?: string
          phone?: string | null
          profile_picture?: string | null
          profilepicture?: string | null
          schedule?: Json | null
          specialization?: string[] | null
          status?: string | null
          stripe_account_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_logs: {
        Row: {
          created_at: string | null
          date: string | null
          duration_minutes: number | null
          id: string
          member_id: string | null
          member_workout_id: string | null
          notes: string | null
          rating: number | null
        }
        Insert: {
          created_at?: string | null
          date?: string | null
          duration_minutes?: number | null
          id?: string
          member_id?: string | null
          member_workout_id?: string | null
          notes?: string | null
          rating?: number | null
        }
        Update: {
          created_at?: string | null
          date?: string | null
          duration_minutes?: number | null
          id?: string
          member_id?: string | null
          member_workout_id?: string | null
          notes?: string | null
          rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "workout_logs_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_logs_member_workout_id_fkey"
            columns: ["member_workout_id"]
            isOneToOne: false
            referencedRelation: "member_workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_programs: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          difficulty_level: string | null
          duration_weeks: number | null
          id: string
          is_template: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty_level?: string | null
          duration_weeks?: number | null
          id?: string
          is_template?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty_level?: string | null
          duration_weeks?: number | null
          id?: string
          is_template?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workout_programs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "trainers"
            referencedColumns: ["id"]
          },
        ]
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
