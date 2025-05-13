
import { StaffProfile, TrainerProfile } from './types';

/**
 * Adapts trainer properties to staff properties for backward compatibility
 */
export const adaptTrainerToStaff = (trainer: any): StaffProfile => {
  return {
    id: trainer.id,
    full_name: trainer.name || '',
    email: trainer.email || '',
    phone: trainer.phone || '',
    role: 'trainer',
    photo_url: trainer.profile_picture || trainer.profilepicture || null,
    access_level: trainer.access_level || 'staff',
    status: trainer.status || 'Active',
    specialties: trainer.specialization || [],
    bio: trainer.bio || null,
    hire_date: trainer.hire_date || trainer.hiredate || null,
    certifications: trainer.certifications || [],
    availability: trainer.availability || [],
    created_at: trainer.created_at || null,
    updated_at: trainer.updated_at || null,
    assigned_classes: [],
    assigned_members: [],
    experience_years: trainer.experience_years || 0,
    experience_level: trainer.experience_level || 'Beginner'
  };
};

/**
 * Adapts staff properties to trainer properties for backward compatibility
 */
export const adaptStaffToTrainer = (staff: any): any => {
  return {
    name: staff.full_name,
    email: staff.email,
    phone: staff.phone,
    profile_picture: staff.photo_url,
    specialization: staff.specialties,
    status: staff.status,
    hire_date: staff.hire_date,
    bio: staff.bio,
    role: staff.role,
    experience_years: staff.experience_years || 0,
    experience_level: staff.experience_level || 'Beginner',
  };
};
