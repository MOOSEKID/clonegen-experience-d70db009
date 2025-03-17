
export interface ClientProgressRecord {
  id: string;
  client_id: string;
  trainer_id: string;
  date: string;
  weight: number;
  height: number;
  body_fat_percentage: number;
  arm_measurement: number;
  chest_measurement: number;
  waist_measurement: number;
  hip_measurement: number;
  thigh_measurement: number;
  notes: string;
  client_name?: string;
  created_at: string;
  updated_at: string;
}

export interface TrainerAttendanceRecord {
  id: string;
  trainer_id: string;
  date: string;
  check_in_time: string;
  check_out_time: string;
  notes: string;
  trainer_name?: string;
  created_at: string;
  updated_at: string;
}

export interface TrainerAvailability {
  id: string;
  trainer_id: string;
  day_of_week: string;
  start_time: string;
  end_time: string;
}

export interface TrainerCertification {
  id: string;
  trainer_id: string;
  name: string;
  issuer: string;
  issue_date: string;
  expiry_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface TrainerProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  is_admin: boolean;
  specializations: string[];
  bio: string;
  phone: string;
  profile_picture: string | null;
  hire_date: string;
  experience_years: number;
  experience_level: string;
  status: string;
  certifications?: TrainerCertification[];
  availability?: TrainerAvailability[];
  created_at: string;
  updated_at: string;
}

// Map for accessing properties with the appropriate casing
export const availabilityPropertyMap = {
  dayOfWeek: 'day_of_week',
  startTime: 'start_time',
  endTime: 'end_time'
};
