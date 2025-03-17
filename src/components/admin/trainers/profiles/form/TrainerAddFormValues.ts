
export interface TrainerAddFormValues {
  name: string;
  email: string;
  phone: string;
  bio: string;
  specializations: string[];
  certifications: string[];
  profile_picture: string;
  status: 'active' | 'inactive' | 'on leave';
  hire_date?: string;
  experience_years?: number;
  experience_level?: string;
}
