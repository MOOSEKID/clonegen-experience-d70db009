import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { AuthUser, UserRole } from '@/types/auth.types';
import { Database } from '@/types/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];

/**
 * Hook that provides login functionality
 */
export const useLoginService = () => {
  /**
   * Login with email and password
   */
  const login = async (email: string, password: string): Promise<{
    success: boolean;
    user?: AuthUser;
    isAdmin?: boolean;
    isStaff?: boolean;
  }> => {
    try {
      console.log('Attempting login for:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Login error:', error);
        toast.error(error.message);
        return { success: false };
      }
      
      if (data.user) {
        console.log('User authenticated:', data.user.email);
        
        // Determine initial role based on email
        const initialRole = determineInitialRole(email);
        console.log('Initial role determined:', initialRole);
        
        // Get user profile from profiles table
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (profileError) {
          console.error('Error fetching user profile:', profileError);
          // Handle the case where profile doesn't exist yet
          if (profileError.code === 'PGRST116') {
            console.log('Profile not found, creating new profile');
            // Create a default profile
            const newProfile: ProfileInsert = {
              id: data.user.id,
              email: email,
              full_name: data.user.user_metadata?.full_name || email,
              role: initialRole,
              is_admin: initialRole === 'admin',
              is_staff: isStaffRole(initialRole),
              staff_type: getStaffType(initialRole),
              customer_type: getCustomerType(initialRole),
              membership_status: 'pending'
            };
            
            const { error: insertError } = await supabase
              .from('profiles')
              .insert(newProfile);
              
            if (insertError) {
              console.error('Error creating profile:', insertError);
              toast.error('Error setting up user profile');
            } else {
              console.log('Profile created successfully');
            }
          }
        } else {
          console.log('Existing profile found:', profile);
          // Update profile if role needs to be changed
          if (shouldUpdateRole(profile, initialRole)) {
            console.log('Updating profile role and permissions');
            const updates: Partial<Profile> = {
              role: initialRole,
              is_admin: initialRole === 'admin',
              is_staff: isStaffRole(initialRole),
              staff_type: getStaffType(initialRole),
              customer_type: getCustomerType(initialRole)
            };
            
            const { error: updateError } = await supabase
              .from('profiles')
              .update(updates)
              .eq('id', data.user.id);
              
            if (updateError) {
              console.error('Error updating profile:', updateError);
              toast.error('Error updating user permissions');
            } else {
              console.log('Profile updated successfully');
            }
          }
        }
        
        // Get the final profile state
        const { data: finalProfile, error: finalProfileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        if (finalProfileError) {
          console.error('Error fetching final profile:', finalProfileError);
          toast.error('Error loading user profile');
          return { success: false };
        }
        
        console.log('Final user state:', {
          role: finalProfile.role,
          isAdmin: finalProfile.is_admin,
          isStaff: finalProfile.is_staff
        });
        
        toast.success('Login successful');
        
        return { 
          success: true,
          user: {
            ...data.user,
            email: data.user.email || '',
            role: finalProfile.role as UserRole
          },
          isAdmin: finalProfile.is_admin,
          isStaff: finalProfile.is_staff
        };
      }
      
      console.error('Login failed: No user data returned');
      toast.error('Login failed. Please try again.');
      return { success: false };
    } catch (error) {
      console.error('Unexpected login error:', error);
      toast.error(error instanceof Error ? error.message : 'Login failed');
      return { success: false };
    }
  };

  return { login };
};

// Helper functions
function determineInitialRole(email: string): UserRole {
  if (email === 'admin@uptowngym.rw') {
    return 'admin';
  }
  if (email.endsWith('@uptowngym.rw')) {
    if (email.includes('manager')) return 'manager';
    if (email.includes('trainer')) return 'trainer';
    return 'staff';
  }
  if (email.includes('corporate') || email.endsWith('@company.com')) {
    return 'corporate_client';
  }
  return 'individual_client';
}

function isStaffRole(role: UserRole): boolean {
  return ['admin', 'manager', 'trainer', 'staff'].includes(role);
}

function getStaffType(role: UserRole): string | undefined {
  switch (role) {
    case 'manager': return 'manager';
    case 'trainer': return 'trainer';
    case 'staff': return 'other';
    default: return undefined;
  }
}

function getCustomerType(role: UserRole): string | undefined {
  switch (role) {
    case 'individual_client': return 'individual';
    case 'corporate_client': return 'corporate';
    default: return undefined;
  }
}

function shouldUpdateRole(profile: Profile, newRole: UserRole): boolean {
  // Always update if roles don't match
  if (profile.role !== newRole) return true;
  
  // Update if admin status doesn't match role
  if (newRole === 'admin' && !profile.is_admin) return true;
  
  // Update if staff status doesn't match role
  const shouldBeStaff = isStaffRole(newRole);
  if (profile.is_staff !== shouldBeStaff) return true;
  
  // Update if staff type doesn't match role
  const expectedStaffType = getStaffType(newRole);
  if (expectedStaffType && profile.staff_type !== expectedStaffType) return true;
  
  // Update if customer type doesn't match role
  const expectedCustomerType = getCustomerType(newRole);
  if (expectedCustomerType && profile.customer_type !== expectedCustomerType) return true;
  
  return false;
}
