// Auth and Profile Types
export type StaffCategory = 'management' | 'training' | 'operations' | 'reception' | 'maintenance';

export type UserRole =
  | 'admin'
  | 'general_manager'
  | 'operations_manager'
  | 'fitness_manager'
  | 'head_trainer'
  | 'senior_trainer'
  | 'trainer'
  | 'trainee_trainer'
  | 'operations_supervisor'
  | 'maintenance_supervisor'
  | 'receptionist'
  | 'membership_coordinator'
  | 'nutritionist'
  | 'physiotherapist'
  | 'maintenance_staff'
  | 'cleaner'
  | 'individual_client';

export type TrainerSpecialization =
  | 'general_fitness'
  | 'strength_conditioning'
  | 'cardio'
  | 'yoga'
  | 'pilates'
  | 'crossfit'
  | 'martial_arts'
  | 'swimming'
  | 'rehabilitation'
  | 'nutrition';

export type DepartmentType =
  | 'management'
  | 'training'
  | 'operations'
  | 'maintenance'
  | 'reception'
  | 'nutrition'
  | 'rehabilitation';

export type AccessLevel = 'full' | 'high' | 'medium' | 'basic' | 'limited';

export type StaffStatus = 'active' | 'inactive' | 'on_leave' | 'terminated';

export type WorkingHours = {
  start: string;
  end: string;
  days: string[];
};

export type EmergencyContact = {
  name: string;
  relationship: string;
  phone: string;
  email: string;
};

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole | null;
  is_admin: boolean;
  is_staff: boolean;
  staff_category: StaffCategory | null;
  department: DepartmentType | null;
  access_level: AccessLevel;
  status: StaffStatus;
  specializations: TrainerSpecialization[] | null;
  reporting_to: string | null;
  shift_preference: string | null;
  max_clients: number | null;
  certifications: string[] | null;
  primary_location: string | null;
  secondary_locations: string[] | null;
  working_hours: WorkingHours | null;
  contact_email: string | null;
  contact_phone: string | null;
  emergency_contact: EmergencyContact | null;
  last_login: string | null;
  created_at: string | null;
  updated_at: string | null;
}

// Helper functions for access control
export const hasFullAccess = (profile: UserProfile): boolean => {
  return profile.access_level === 'full';
};

export const hasHighAccess = (profile: UserProfile): boolean => {
  return profile.access_level === 'high' || hasFullAccess(profile);
};

export const hasMediumAccess = (profile: UserProfile): boolean => {
  return profile.access_level === 'medium' || hasHighAccess(profile);
};

export const hasBasicAccess = (profile: UserProfile): boolean => {
  return profile.access_level === 'basic' || hasMediumAccess(profile);
};

// Email validation helpers
export const isValidStaffEmail = (email: string): boolean => {
  return email.endsWith('@uptowngym.rw');
};

export const isAdminEmail = (email: string): boolean => {
  return email === 'admin@uptowngym.rw';
};

export const generateStaffEmail = (role: UserRole, fullName: string): string => {
  if (role === 'admin') {
    return 'admin@uptowngym.rw';
  }

  const formattedName = fullName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '.');

  const rolePrefix = role.replace('_', '.');
  return `${rolePrefix}.${formattedName}@uptowngym.rw`;
};
