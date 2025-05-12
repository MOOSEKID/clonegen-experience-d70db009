
export interface StaffProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  profile_picture?: string;
  role: string;
  specialization: string[];
  status?: string;
  hire_date?: string;
  experience_years?: number;
  experience_level?: string;
  stripe_account_id?: string;
  certifications: StaffCertification[];
  availability: StaffAvailability[];
}

export interface StaffCertification {
  id: string;
  staff_id: string;
  certification_name: string;
  issuing_organization: string;
  issue_date?: string;
  expiry_date?: string;
}

export interface StaffAvailability {
  id: string;
  staff_id: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
}

// For backward compatibility
export type TrainerProfile = StaffProfile;
export type TrainerCertification = StaffCertification;
export type TrainerAvailability = StaffAvailability;
