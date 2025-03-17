
export interface TrainerProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  specializations: string[];
  profile_picture?: string;
  status: 'active' | 'inactive' | 'on leave';
  bio?: string;
  certifications?: string[];
}
