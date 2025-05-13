
export interface StaffProfile {
  id: string;
  full_name: string;
  email?: string;
  phone?: string;
  role: 'trainer' | 'manager' | 'reception' | 'sales' | 'support';
  photo_url?: string;
  access_level?: string;
  status?: string;
  specialties?: string[];
  bio?: string;
  hire_date?: string;
  assigned_classes?: string[];
  assigned_members?: string[];
  created_at?: string;
  updated_at?: string;
  certifications?: StaffCertification[];
  availability?: StaffAvailability[];
}

export interface StaffCertification {
  id: string;
  staff_id: string;
  certification_name: string;
  issuing_organization?: string;
  issue_date?: string;
  expiry_date?: string;
  verified?: boolean;
  certification_file?: string;
  created_at?: string;
  updated_at?: string;
}

export interface StaffAvailability {
  id: string;
  staff_id: string;
  day_of_week?: string;
  start_time?: string;
  end_time?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ClientAssignment {
  id: string;
  staff_id: string;
  client_id?: string;
  assignment_date: string;
  end_date?: string;
  status?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ClientSession {
  id: string;
  staff_id: string;
  client_id?: string;
  session_date: string;
  start_time: string;
  end_time: string;
  duration?: number;
  session_type?: string;
  location?: string;
  status?: string;
  notes?: string;
  focus_areas?: string[];
  achievements?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ClientSessionInput extends Omit<ClientSession, 'id'> {}

// For backward compatibility
export type TrainerProfile = StaffProfile;
export type TrainerCertification = StaffCertification;
export type TrainerAvailability = StaffAvailability;

// Add types for the business hours page
export interface BusinessHour {
  id: string;
  day_of_week: string;
  open_time: string | null;
  close_time: string | null;
  is_closed: boolean;
  updated_at?: string;
}
