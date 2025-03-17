import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { UserRole, StaffCategory, AccessLevel, Department, StaffStatus } from '@/types/auth.types';
import { Database } from '@/types/database.types';
import { toast } from 'sonner';

type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];

interface TestUser {
  email: string;
  password: string;
  role: UserRole;
  full_name: string;
}

// Helper function to generate staff email based on role and name
const generateStaffEmail = (role: UserRole, name: string): string => {
  if (role === 'admin') return 'admin@uptowngym.rw';
  
  // Convert name to lowercase and replace special characters with dots
  const formattedName = name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // Remove special characters
    .replace(/\s+/g, '.'); // Replace spaces with dots
  
  // Get role prefix based on role type
  let rolePrefix: string;
  
  // Management roles
  if (role === 'general_manager') rolePrefix = 'general.manager';
  else if (role === 'operations_manager') rolePrefix = 'operations.manager';
  else if (role === 'fitness_manager') rolePrefix = 'fitness.manager';
  
  // Training roles
  else if (role === 'head_trainer') rolePrefix = 'head.trainer';
  else if (role === 'senior_trainer') rolePrefix = 'senior.trainer';
  else if (role === 'trainee_trainer') rolePrefix = 'trainee';
  else if (role === 'trainer') rolePrefix = 'trainer';
  
  // Operations roles
  else if (role === 'operations_supervisor') rolePrefix = 'supervisor';
  else if (role === 'receptionist') rolePrefix = 'receptionist';
  else if (role === 'membership_coordinator') rolePrefix = 'membership';
  else if (role === 'nutritionist') rolePrefix = 'nutritionist';
  else if (role === 'physiotherapist') rolePrefix = 'physio';
  
  // Maintenance roles
  else if (role === 'maintenance_supervisor') rolePrefix = 'maintenance.supervisor';
  else if (role === 'maintenance_staff') rolePrefix = 'maintenance';
  else if (role === 'cleaner') rolePrefix = 'cleaner';
  
  else rolePrefix = role.replace(/_/g, '.');
  
  return `${rolePrefix}.${formattedName}@uptowngym.rw`;
};

// Get default access level based on role
const getDefaultAccessLevel = (role: UserRole): AccessLevel => {
  switch (role) {
    case 'admin':
    case 'general_manager':
      return 'full';
    case 'operations_manager':
    case 'fitness_manager':
    case 'head_trainer':
      return 'high';
    case 'senior_trainer':
    case 'operations_supervisor':
    case 'maintenance_supervisor':
      return 'medium';
    case 'trainer':
    case 'receptionist':
    case 'membership_coordinator':
    case 'nutritionist':
    case 'physiotherapist':
    case 'maintenance_staff':
      return 'basic';
    default:
      return 'limited';
  }
};

// Get staff category based on role
const getStaffCategory = (role: UserRole): StaffCategory | null => {
  if (role === 'admin' || role.includes('manager')) {
    return 'management';
  }
  if (role.includes('trainer')) {
    return 'training';
  }
  if (role === 'receptionist') {
    return 'reception';
  }
  if (role.includes('maintenance') || role === 'cleaner') {
    return 'maintenance';
  }
  if (
    role === 'operations_supervisor' ||
    role === 'membership_coordinator' ||
    role === 'nutritionist' ||
    role === 'physiotherapist'
  ) {
    return 'operations';
  }
  return null;
};

// Get department based on role
const getDepartment = (role: UserRole): Department => {
  if (role === 'admin' || role === 'general_manager') {
    return 'management';
  }
  if (role.includes('trainer') || role === 'fitness_manager') {
    return 'training';
  }
  if (role === 'receptionist') {
    return 'reception';
  }
  if (role.includes('maintenance') || role === 'cleaner') {
    return 'maintenance';
  }
  if (role === 'nutritionist') {
    return 'nutrition';
  }
  if (role === 'physiotherapist') {
    return 'rehabilitation';
  }
  if (role.includes('operations') || role === 'membership_coordinator') {
    return 'operations';
  }
  return 'management'; // Default to management
};

// Test users data
const testUsers: TestUser[] = [
  // Management
  { email: 'admin@uptowngym.rw', password: 'admin123', role: 'admin', full_name: 'Admin User' },
  { email: '', password: 'manager123', role: 'general_manager', full_name: 'John Smith' },
  { email: '', password: 'ops123', role: 'operations_manager', full_name: 'Sarah Johnson' },
  { email: '', password: 'fit123', role: 'fitness_manager', full_name: 'Mike Wilson' },
  
  // Training staff
  { email: '', password: 'head123', role: 'head_trainer', full_name: 'David Brown' },
  { email: '', password: 'senior123', role: 'senior_trainer', full_name: 'Emma Davis' },
  { email: '', password: 'trainer123', role: 'trainer', full_name: 'James Anderson' },
  { email: '', password: 'trainee123', role: 'trainee_trainer', full_name: 'Lisa White' },
  
  // Operations staff
  { email: '', password: 'super123', role: 'operations_supervisor', full_name: 'Robert Taylor' },
  { email: '', password: 'recep123', role: 'receptionist', full_name: 'Mary Clark' },
  { email: '', password: 'member123', role: 'membership_coordinator', full_name: 'Patricia Lee' },
  { email: '', password: 'nutri123', role: 'nutritionist', full_name: 'Daniel Green' },
  { email: '', password: 'physio123', role: 'physiotherapist', full_name: 'Susan Hall' },
  
  // Maintenance staff
  { email: '', password: 'maint123', role: 'maintenance_supervisor', full_name: 'George King' },
  { email: '', password: 'staff123', role: 'maintenance_staff', full_name: 'Thomas Wright' },
  { email: '', password: 'clean123', role: 'cleaner', full_name: 'Linda Martinez' }
];

// Generate staff emails for test users
testUsers.forEach(user => {
  if (!user.email && user.role !== 'admin') {
    user.email = generateStaffEmail(user.role, user.full_name);
  }
});

export const useTestUsers = () => {
  const [loading, setLoading] = useState(false);

  const createTestUsers = async () => {
    try {
      setLoading(true);

      for (const user of testUsers) {
        // Check if user already exists
        const { data: existingUser } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', user.email)
          .maybeSingle();

        if (existingUser) {
          console.log(`User ${user.email} already exists, skipping...`);
          continue;
        }

        // Create auth user
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: user.email,
          password: user.password,
          options: {
            data: {
              full_name: user.full_name
            }
          }
        });

        if (signUpError) {
          console.error(`Error creating user ${user.email}:`, signUpError.message);
          continue;
        }

        if (!data.user) {
          console.error(`No user data returned for ${user.email}`);
          continue;
        }

        const staffCategory = getStaffCategory(user.role);
        const accessLevel = getDefaultAccessLevel(user.role);
        const department = getDepartment(user.role);

        // Create user profile
        const profile: ProfileInsert = {
          id: data.user.id,
          email: user.email,
          full_name: user.full_name,
          role: user.role,
          is_admin: user.role === 'admin',
          is_staff: staffCategory !== null,
          staff_category: staffCategory || undefined,
          access_level: accessLevel,
          department: department,
          status: 'active' as StaffStatus,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const { error: profileError } = await supabase
          .from('profiles')
          .insert(profile);

        if (profileError) {
          console.error(`Error creating profile for ${user.email}:`, profileError.message);
          continue;
        }

        console.log(`Successfully created user and profile for ${user.email}`);
      }

      toast.success('Test users created successfully');
    } catch (error) {
      console.error('Error creating test users:', error);
      toast.error('Error creating test users');
    } finally {
      setLoading(false);
    }
  };

  return { createTestUsers, loading };
};
