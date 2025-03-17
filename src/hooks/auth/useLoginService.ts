import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthUser, UserRole, StaffCategory, AccessLevel, Department, StaffStatus } from '@/types/auth.types';
import { Database } from '@/types/database.types';
import { toast } from 'sonner';

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];

interface LoginResponse {
  success: boolean;
  message: string;
  user?: AuthUser;
}

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

export const useLoginService = () => {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      setLoading(true);

      // Sign in user
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        return {
          success: false,
          message: 'Invalid email or password',
        };
      }

      if (!data.user) {
        return {
          success: false,
          message: 'No user data returned',
        };
      }

      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError.message);
        return {
          success: false,
          message: 'Error fetching user profile',
        };
      }

      // If profile doesn't exist, create it
      if (!profile) {
        const role: UserRole = email === 'admin@uptowngym.rw' ? 'admin' : 'individual_client';
        const staffCategory = getStaffCategory(role);
        const accessLevel = getDefaultAccessLevel(role);
        const department = getDepartment(role);

        const newProfile: ProfileInsert = {
          id: data.user.id,
          email: email,
          full_name: data.user.user_metadata?.full_name || email.split('@')[0],
          role: role,
          is_admin: role === 'admin',
          is_staff: staffCategory !== null,
          staff_category: staffCategory || undefined,
          access_level: accessLevel,
          department: department,
          status: 'active' as StaffStatus,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const { error: createError } = await supabase
          .from('profiles')
          .insert(newProfile);

        if (createError) {
          console.error('Profile creation error:', createError.message);
          return {
            success: false,
            message: 'Error creating user profile',
          };
        }

        // Return the new profile as AuthUser
        const authUser: AuthUser = {
          id: data.user.id,
          email: email,
          full_name: newProfile.full_name,
          role: role,
          is_admin: newProfile.is_admin,
          is_staff: newProfile.is_staff,
          app_metadata: data.user.app_metadata,
          aud: data.user.aud
        };

        toast.success('Login successful');
        return {
          success: true,
          message: 'Login successful',
          user: authUser
        };
      }

      // Update last login
      await supabase
        .from('profiles')
        .update({ 
          last_login: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', profile.id);

      // Convert profile to AuthUser
      const authUser: AuthUser = {
        id: data.user.id,
        email: profile.email,
        full_name: profile.full_name,
        role: profile.role as UserRole,
        is_admin: profile.is_admin,
        is_staff: profile.is_staff,
        app_metadata: data.user.app_metadata,
        aud: data.user.aud
      };

      toast.success('Login successful');
      return {
        success: true,
        message: 'Login successful',
        user: authUser
      };

    } catch (error) {
      console.error('Unexpected login error:', error);
      return {
        success: false,
        message: 'An unexpected error occurred',
      };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
