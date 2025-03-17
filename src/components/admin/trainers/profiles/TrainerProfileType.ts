
export interface TrainerProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  specializations: string[];
  specialization?: string[]; // For backward compatibility
  profile_picture?: string;
  status: 'active' | 'inactive' | 'on leave';
  bio?: string;
  certifications?: string[];
  hire_date?: string;
  experience_years?: number;
  experience_level?: string;
}
