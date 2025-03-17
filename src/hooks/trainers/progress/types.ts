
export interface ClientProgressRecord {
  id: string;
  client_id: string;
  trainer_id: string;
  date: string;
  weight?: number;
  body_fat_percentage?: number;
  chest_measurement?: number;
  waist_measurement?: number;
  hip_measurement?: number;
  arm_measurement?: number;
  thigh_measurement?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  client_name?: string;
}

export interface ClientProgressInput {
  client_id: string;
  trainer_id: string;
  date: string;
  weight?: number;
  body_fat_percentage?: number;
  chest_measurement?: number;
  waist_measurement?: number;
  hip_measurement?: number;
  arm_measurement?: number;
  thigh_measurement?: number;
  notes?: string;
}

// Define measurements as a nested type to match database schema
export interface ProgressMeasurements {
  chest?: number;
  waist?: number;
  hip?: number;
  arm?: number;
  thigh?: number;
}
