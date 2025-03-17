
export interface TrainerProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  hire_date?: string;
  experience_years?: number;
  experience_level?: string;
  specializations?: string[];
  bio?: string;
  profile_picture?: string;
  certifications?: {
    id: string;
    name: string;
    issuer: string;
    issuance_date: string;
    expiry_date?: string;
    file_url?: string;
  }[];
  availability?: {
    id: string;
    day: string;
    start_time: string;
    end_time: string;
  }[];
}
