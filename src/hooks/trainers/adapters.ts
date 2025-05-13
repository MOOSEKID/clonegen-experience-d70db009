
import { StaffProfile } from './types';

// Convert from StaffProfile to trainer fields format
export const adaptStaffToTrainer = (staff: Partial<StaffProfile> | Omit<StaffProfile, 'id' | 'certifications' | 'availability'>) => {
  return {
    name: staff.full_name,
    email: staff.email,
    phone: staff.phone,
    bio: staff.bio,
    profilepicture: staff.photo_url,
    specialization: staff.specialties,
    status: staff.status,
    hiredate: staff.hire_date,
    experience_years: staff.experience_years,
    experience_level: staff.experience_level
  };
};

// Convert from trainer data to StaffProfile format
export const adaptTrainerToStaff = (trainer: any): StaffProfile => {
  return {
    id: trainer.id || `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    full_name: trainer.name || 'Unknown',
    email: trainer.email,
    phone: trainer.phone,
    bio: trainer.bio,
    photo_url: trainer.profilepicture,
    role: 'trainer',
    status: trainer.status,
    specialties: trainer.specialization,
    hire_date: trainer.hiredate,
    certifications: Array.isArray(trainer.certifications) 
      ? trainer.certifications.map((cert: string) => ({
          id: `temp-${Date.now()}-${Math.random()}`,
          staff_id: trainer.id,
          certification_name: cert
        }))
      : [],
    availability: [],
    experience_years: trainer.experience_years !== undefined ? Number(trainer.experience_years) : undefined,
    experience_level: trainer.experience_level
  };
};

// Helper to convert between trainer_id and staff_id
export const convertTrainerCertToStaffCert = (trainerCert: any): any => {
  const staffCert = { ...trainerCert };
  staffCert.staff_id = trainerCert.trainer_id;
  delete staffCert.trainer_id;
  return staffCert;
};

// Helper to convert between trainer_id and staff_id for availability
export const convertTrainerAvailabilityToStaffAvailability = (trainerAvail: any): any => {
  const staffAvail = { ...trainerAvail };
  staffAvail.staff_id = trainerAvail.trainer_id;
  delete staffAvail.trainer_id;
  return staffAvail;
};

// Helper function to validate staff role type
export const validateStaffRole = (role: string): 'trainer' | 'manager' | 'reception' | 'sales' | 'support' => {
  const validRoles = ['trainer', 'manager', 'reception', 'sales', 'support'];
  if (validRoles.includes(role)) {
    return role as 'trainer' | 'manager' | 'reception' | 'sales' | 'support';
  }
  return 'trainer'; // Default fallback
};

// Convert from old TrainerAddFormValues to new StaffProfile format
export const adaptFormToStaffProfile = (formData: any): Omit<StaffProfile, 'id' | 'certifications' | 'availability'> => {
  return {
    full_name: formData.full_name || 'New Trainer',
    email: formData.email,
    phone: formData.phone,
    role: 'trainer',
    photo_url: formData.photo_url,
    status: formData.status,
    specialties: formData.specialties || [],
    bio: formData.bio,
    hire_date: formData.hire_date,
    experience_years: formData.experience_years,
    experience_level: formData.experience_level
  };
};
