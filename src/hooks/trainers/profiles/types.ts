
// Types for trainer profiles and related entities
export interface TrainerProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  profile_picture?: string;
  specialization: string[];
  status?: string;
  hire_date?: string;
  experience_years?: number;
  experience_level?: string;
  stripe_account_id?: string;
  certifications: TrainerCertification[];
  availability: TrainerAvailability[];
}

export interface TrainerCertification {
  id: string;
  trainer_id: string;
  certification_name: string;
  issuing_organization: string;
  issue_date?: string;
  expiry_date?: string;
}

export interface TrainerAvailability {
  id: string;
  trainer_id: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
}
