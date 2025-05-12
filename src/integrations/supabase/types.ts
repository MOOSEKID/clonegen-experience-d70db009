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
      categories: {
        Row: {
          created_at: string
          description: string | null
          featured: boolean | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          featured?: boolean | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          featured?: boolean | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
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
      cms_content_blocks: {
        Row: {
          content: Json
          created_at: string | null
          dynamic_source: string | null
          id: string
          is_dynamic: boolean
          is_editable: boolean
          order_index: number
          page_id: string
          type: string
          updated_at: string | null
        }
        Insert: {
          content?: Json
          created_at?: string | null
          dynamic_source?: string | null
          id?: string
          is_dynamic?: boolean
          is_editable?: boolean
          order_index?: number
          page_id: string
          type: string
          updated_at?: string | null
        }
        Update: {
          content?: Json
          created_at?: string | null
          dynamic_source?: string | null
          id?: string
          is_dynamic?: boolean
          is_editable?: boolean
          order_index?: number
          page_id?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cms_content_blocks_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "cms_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_nav_items: {
        Row: {
          created_at: string | null
          external_url: string | null
          id: string
          label: string
          linked_page_id: string | null
          nav_group: string | null
          order_index: number
          updated_at: string | null
          visible: boolean
        }
        Insert: {
          created_at?: string | null
          external_url?: string | null
          id?: string
          label: string
          linked_page_id?: string | null
          nav_group?: string | null
          order_index?: number
          updated_at?: string | null
          visible?: boolean
        }
        Update: {
          created_at?: string | null
          external_url?: string | null
          id?: string
          label?: string
          linked_page_id?: string | null
          nav_group?: string | null
          order_index?: number
          updated_at?: string | null
          visible?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "cms_nav_items_linked_page_id_fkey"
            columns: ["linked_page_id"]
            isOneToOne: false
            referencedRelation: "cms_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_pages: {
        Row: {
          created_at: string | null
          id: string
          meta_description: string | null
          meta_keywords: string | null
          parent_id: string | null
          slug: string
          source_path: string | null
          title: string
          type: string
          updated_at: string | null
          visible: boolean
        }
        Insert: {
          created_at?: string | null
          id?: string
          meta_description?: string | null
          meta_keywords?: string | null
          parent_id?: string | null
          slug: string
          source_path?: string | null
          title: string
          type?: string
          updated_at?: string | null
          visible?: boolean
        }
        Update: {
          created_at?: string | null
          id?: string
          meta_description?: string | null
          meta_keywords?: string | null
          parent_id?: string | null
          slug?: string
          source_path?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          visible?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "cms_pages_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "cms_pages"
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
      order_items: {
        Row: {
          created_at: string | null
          id: string
          order_id: string
          product_id: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id: string
          product_id: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          customer_email: string
          customer_name: string
          customer_phone: string | null
          delivery_address: string | null
          discount_amount: number | null
          id: string
          payment_method: string | null
          payment_status: string
          promo_code_id: string | null
          status: string
          total_amount: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          delivery_address?: string | null
          discount_amount?: number | null
          id?: string
          payment_method?: string | null
          payment_status?: string
          promo_code_id?: string | null
          status?: string
          total_amount: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          delivery_address?: string | null
          discount_amount?: number | null
          id?: string
          payment_method?: string | null
          payment_status?: string
          promo_code_id?: string | null
          status?: string
          total_amount?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_promo_code_id_fkey"
            columns: ["promo_code_id"]
            isOneToOne: false
            referencedRelation: "promo_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string
          category_id: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean
          is_instore: boolean
          is_member_only: boolean | null
          is_public: boolean
          member_price: number | null
          name: string
          price: number
          sku: string | null
          stock_count: number
          updated_at: string
        }
        Insert: {
          category: string
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_instore?: boolean
          is_member_only?: boolean | null
          is_public?: boolean
          member_price?: number | null
          name: string
          price: number
          sku?: string | null
          stock_count?: number
          updated_at?: string
        }
        Update: {
          category?: string
          category_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_instore?: boolean
          is_member_only?: boolean | null
          is_public?: boolean
          member_price?: number | null
          name?: string
          price?: number
          sku?: string | null
          stock_count?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          active_plan_id: string | null
          avatar_url: string | null
          billing_start_date: string | null
          bio: string | null
          contact_number: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          gym_location: string | null
          id: string
          is_admin: boolean | null
          is_staff: boolean | null
          preferred_workout_time: string | null
          role: string | null
          subscription_status: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          active_plan_id?: string | null
          avatar_url?: string | null
          billing_start_date?: string | null
          bio?: string | null
          contact_number?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          gym_location?: string | null
          id: string
          is_admin?: boolean | null
          is_staff?: boolean | null
          preferred_workout_time?: string | null
          role?: string | null
          subscription_status?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          active_plan_id?: string | null
          avatar_url?: string | null
          billing_start_date?: string | null
          bio?: string | null
          contact_number?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          gym_location?: string | null
          id?: string
          is_admin?: boolean | null
          is_staff?: boolean | null
          preferred_workout_time?: string | null
          role?: string | null
          subscription_status?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      promo_codes: {
        Row: {
          code: string
          created_at: string | null
          discount_type: string
          id: string
          is_active: boolean | null
          max_uses: number | null
          min_purchase_amount: number | null
          updated_at: string | null
          uses_count: number | null
          valid_from: string
          valid_until: string
          value: number
        }
        Insert: {
          code: string
          created_at?: string | null
          discount_type: string
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          min_purchase_amount?: number | null
          updated_at?: string | null
          uses_count?: number | null
          valid_from?: string
          valid_until: string
          value: number
        }
        Update: {
          code?: string
          created_at?: string | null
          discount_type?: string
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          min_purchase_amount?: number | null
          updated_at?: string | null
          uses_count?: number | null
          valid_from?: string
          valid_until?: string
          value?: number
        }
        Relationships: []
      }
      settings_automations: {
        Row: {
          created_at: string | null
          id: string
          rules: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          rules?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          rules?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      settings_business_holidays: {
        Row: {
          created_at: string | null
          holiday_date: string
          holiday_name: string
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          holiday_date: string
          holiday_name: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          holiday_date?: string
          holiday_name?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      settings_business_hours: {
        Row: {
          close_time: string | null
          created_at: string | null
          day_of_week: string
          id: string
          is_closed: boolean | null
          open_time: string | null
          updated_at: string | null
        }
        Insert: {
          close_time?: string | null
          created_at?: string | null
          day_of_week: string
          id?: string
          is_closed?: boolean | null
          open_time?: string | null
          updated_at?: string | null
        }
        Update: {
          close_time?: string | null
          created_at?: string | null
          day_of_week?: string
          id?: string
          is_closed?: boolean | null
          open_time?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      settings_companies_automation: {
        Row: {
          auto_generate_reports: boolean | null
          auto_invoice: boolean | null
          company_email_signature: string | null
          created_at: string | null
          default_notes: string | null
          id: string
          invoice_generation_day: number | null
          invoice_reminder_days: number[] | null
          invoice_template_id: string | null
          payment_due_days: number | null
          report_delivery_day: string | null
          report_frequency: string | null
          report_recipients: string | null
          report_types: string[] | null
          send_welcome_email: boolean | null
          updated_at: string | null
          welcome_email_template: string | null
        }
        Insert: {
          auto_generate_reports?: boolean | null
          auto_invoice?: boolean | null
          company_email_signature?: string | null
          created_at?: string | null
          default_notes?: string | null
          id?: string
          invoice_generation_day?: number | null
          invoice_reminder_days?: number[] | null
          invoice_template_id?: string | null
          payment_due_days?: number | null
          report_delivery_day?: string | null
          report_frequency?: string | null
          report_recipients?: string | null
          report_types?: string[] | null
          send_welcome_email?: boolean | null
          updated_at?: string | null
          welcome_email_template?: string | null
        }
        Update: {
          auto_generate_reports?: boolean | null
          auto_invoice?: boolean | null
          company_email_signature?: string | null
          created_at?: string | null
          default_notes?: string | null
          id?: string
          invoice_generation_day?: number | null
          invoice_reminder_days?: number[] | null
          invoice_template_id?: string | null
          payment_due_days?: number | null
          report_delivery_day?: string | null
          report_frequency?: string | null
          report_recipients?: string | null
          report_types?: string[] | null
          send_welcome_email?: boolean | null
          updated_at?: string | null
          welcome_email_template?: string | null
        }
        Relationships: []
      }
      settings_general: {
        Row: {
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          currency: string | null
          dark_mode_enabled: boolean | null
          default_language: string | null
          gym_name: string | null
          id: string
          logo_dark_url: string | null
          logo_light_url: string | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          currency?: string | null
          dark_mode_enabled?: boolean | null
          default_language?: string | null
          gym_name?: string | null
          id?: string
          logo_dark_url?: string | null
          logo_light_url?: string | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          currency?: string | null
          dark_mode_enabled?: boolean | null
          default_language?: string | null
          gym_name?: string | null
          id?: string
          logo_dark_url?: string | null
          logo_light_url?: string | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      settings_integrations: {
        Row: {
          airtel_api_key: string | null
          created_at: string | null
          id: string
          mtn_api_key: string | null
          smtp_host: string | null
          smtp_password: string | null
          smtp_port: number | null
          smtp_user: string | null
          stripe_public_key: string | null
          stripe_secret_key: string | null
          test_mode: boolean | null
          twilio_sid: string | null
          twilio_token: string | null
          updated_at: string | null
        }
        Insert: {
          airtel_api_key?: string | null
          created_at?: string | null
          id?: string
          mtn_api_key?: string | null
          smtp_host?: string | null
          smtp_password?: string | null
          smtp_port?: number | null
          smtp_user?: string | null
          stripe_public_key?: string | null
          stripe_secret_key?: string | null
          test_mode?: boolean | null
          twilio_sid?: string | null
          twilio_token?: string | null
          updated_at?: string | null
        }
        Update: {
          airtel_api_key?: string | null
          created_at?: string | null
          id?: string
          mtn_api_key?: string | null
          smtp_host?: string | null
          smtp_password?: string | null
          smtp_port?: number | null
          smtp_user?: string | null
          stripe_public_key?: string | null
          stripe_secret_key?: string | null
          test_mode?: boolean | null
          twilio_sid?: string | null
          twilio_token?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      settings_invoices_templates: {
        Row: {
          created_at: string | null
          id: string
          templates: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          templates?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          templates?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      settings_members_defaults: {
        Row: {
          allow_trial: boolean | null
          auto_renew: boolean | null
          created_at: string | null
          default_currency: string | null
          default_membership_fee: number | null
          default_membership_plan: string | null
          default_payment_method: string | null
          default_renewal_period: number | null
          default_signup_fee: number | null
          id: string
          require_address: boolean | null
          require_emergency_contact: boolean | null
          require_health_info: boolean | null
          require_photo: boolean | null
          trial_period_days: number | null
          updated_at: string | null
        }
        Insert: {
          allow_trial?: boolean | null
          auto_renew?: boolean | null
          created_at?: string | null
          default_currency?: string | null
          default_membership_fee?: number | null
          default_membership_plan?: string | null
          default_payment_method?: string | null
          default_renewal_period?: number | null
          default_signup_fee?: number | null
          id?: string
          require_address?: boolean | null
          require_emergency_contact?: boolean | null
          require_health_info?: boolean | null
          require_photo?: boolean | null
          trial_period_days?: number | null
          updated_at?: string | null
        }
        Update: {
          allow_trial?: boolean | null
          auto_renew?: boolean | null
          created_at?: string | null
          default_currency?: string | null
          default_membership_fee?: number | null
          default_membership_plan?: string | null
          default_payment_method?: string | null
          default_renewal_period?: number | null
          default_signup_fee?: number | null
          id?: string
          require_address?: boolean | null
          require_emergency_contact?: boolean | null
          require_health_info?: boolean | null
          require_photo?: boolean | null
          trial_period_days?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      settings_notifications: {
        Row: {
          created_at: string | null
          email_from_address: string | null
          email_from_name: string | null
          email_notifications_enabled: boolean | null
          email_reply_to: string | null
          email_signature: string | null
          id: string
          in_app_notifications_enabled: boolean | null
          push_notifications_enabled: boolean | null
          sms_notifications_enabled: boolean | null
          sms_sender_id: string | null
          templates: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email_from_address?: string | null
          email_from_name?: string | null
          email_notifications_enabled?: boolean | null
          email_reply_to?: string | null
          email_signature?: string | null
          id?: string
          in_app_notifications_enabled?: boolean | null
          push_notifications_enabled?: boolean | null
          sms_notifications_enabled?: boolean | null
          sms_sender_id?: string | null
          templates?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email_from_address?: string | null
          email_from_name?: string | null
          email_notifications_enabled?: boolean | null
          email_reply_to?: string | null
          email_signature?: string | null
          id?: string
          in_app_notifications_enabled?: boolean | null
          push_notifications_enabled?: boolean | null
          sms_notifications_enabled?: boolean | null
          sms_sender_id?: string | null
          templates?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      settings_platform: {
        Row: {
          created_at: string | null
          enable_reports: boolean | null
          enable_shop: boolean | null
          enable_support: boolean | null
          enable_test_mode: boolean | null
          enable_trainers: boolean | null
          id: string
          maintenance_mode: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          enable_reports?: boolean | null
          enable_shop?: boolean | null
          enable_support?: boolean | null
          enable_test_mode?: boolean | null
          enable_trainers?: boolean | null
          id?: string
          maintenance_mode?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          enable_reports?: boolean | null
          enable_shop?: boolean | null
          enable_support?: boolean | null
          enable_test_mode?: boolean | null
          enable_trainers?: boolean | null
          id?: string
          maintenance_mode?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      settings_reports_export: {
        Row: {
          created_at: string | null
          export_settings: Json | null
          id: string
          scheduled_reports: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          export_settings?: Json | null
          id?: string
          scheduled_reports?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          export_settings?: Json | null
          id?: string
          scheduled_reports?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      settings_roles: {
        Row: {
          created_at: string | null
          id: string
          roles: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          roles?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          roles?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      settings_security: {
        Row: {
          created_at: string | null
          enable_2fa: boolean | null
          id: string
          min_password_length: number | null
          require_numbers: boolean | null
          require_special_chars: boolean | null
          require_uppercase: boolean | null
          session_timeout_minutes: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          enable_2fa?: boolean | null
          id?: string
          min_password_length?: number | null
          require_numbers?: boolean | null
          require_special_chars?: boolean | null
          require_uppercase?: boolean | null
          session_timeout_minutes?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          enable_2fa?: boolean | null
          id?: string
          min_password_length?: number | null
          require_numbers?: boolean | null
          require_special_chars?: boolean | null
          require_uppercase?: boolean | null
          session_timeout_minutes?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      settings_testing_accounts: {
        Row: {
          automatically_sync_production_schema: boolean | null
          created_at: string | null
          id: string
          last_test_data_reset: string | null
          show_test_mode_banner: boolean | null
          test_accounts: Json | null
          test_data_reset_frequency: string | null
          test_mode_banner_color: string | null
          test_mode_enabled: boolean | null
          updated_at: string | null
        }
        Insert: {
          automatically_sync_production_schema?: boolean | null
          created_at?: string | null
          id?: string
          last_test_data_reset?: string | null
          show_test_mode_banner?: boolean | null
          test_accounts?: Json | null
          test_data_reset_frequency?: string | null
          test_mode_banner_color?: string | null
          test_mode_enabled?: boolean | null
          updated_at?: string | null
        }
        Update: {
          automatically_sync_production_schema?: boolean | null
          created_at?: string | null
          id?: string
          last_test_data_reset?: string | null
          show_test_mode_banner?: boolean | null
          test_accounts?: Json | null
          test_data_reset_frequency?: string | null
          test_mode_banner_color?: string | null
          test_mode_enabled?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      settings_ui_messages: {
        Row: {
          created_at: string | null
          custom_messages: Json | null
          enable_alerts: boolean | null
          enable_motivational_quotes: boolean | null
          enable_popup_messages: boolean | null
          id: string
          motivational_quotes: Json | null
          motivational_quotes_frequency: string | null
          popup_position: string | null
          popup_timeout_seconds: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          custom_messages?: Json | null
          enable_alerts?: boolean | null
          enable_motivational_quotes?: boolean | null
          enable_popup_messages?: boolean | null
          id?: string
          motivational_quotes?: Json | null
          motivational_quotes_frequency?: string | null
          popup_position?: string | null
          popup_timeout_seconds?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          custom_messages?: Json | null
          enable_alerts?: boolean | null
          enable_motivational_quotes?: boolean | null
          enable_popup_messages?: boolean | null
          id?: string
          motivational_quotes?: Json | null
          motivational_quotes_frequency?: string | null
          popup_position?: string | null
          popup_timeout_seconds?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      shop_settings: {
        Row: {
          created_at: string
          credit_limit: number | null
          default_currency: string | null
          email_low_stock: boolean | null
          enable_ecommerce: boolean | null
          enable_guest_checkout: boolean | null
          enable_inventory: boolean | null
          enable_member_tab: boolean | null
          enable_mtn: boolean | null
          enable_pos: boolean | null
          enable_stripe: boolean | null
          hide_out_of_stock: boolean | null
          id: string
          low_stock_threshold: number | null
          show_member_discounts: boolean | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          credit_limit?: number | null
          default_currency?: string | null
          email_low_stock?: boolean | null
          enable_ecommerce?: boolean | null
          enable_guest_checkout?: boolean | null
          enable_inventory?: boolean | null
          enable_member_tab?: boolean | null
          enable_mtn?: boolean | null
          enable_pos?: boolean | null
          enable_stripe?: boolean | null
          hide_out_of_stock?: boolean | null
          id?: string
          low_stock_threshold?: number | null
          show_member_discounts?: boolean | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          credit_limit?: number | null
          default_currency?: string | null
          email_low_stock?: boolean | null
          enable_ecommerce?: boolean | null
          enable_guest_checkout?: boolean | null
          enable_inventory?: boolean | null
          enable_member_tab?: boolean | null
          enable_mtn?: boolean | null
          enable_pos?: boolean | null
          enable_stripe?: boolean | null
          hide_out_of_stock?: boolean | null
          id?: string
          low_stock_threshold?: number | null
          show_member_discounts?: boolean | null
          updated_at?: string
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
      get_user_role: {
        Args: { user_id: string }
        Returns: string
      }
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
