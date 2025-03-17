
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { AuthUser, UserRole, AccessLevel } from '@/types/auth.types';

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
  }> => {
    try {
      console.log(`Attempting to sign in with email: ${email}`);
      
      // Validate inputs
      if (!email || !password) {
        toast.error('Email and password are required');
        return { success: false };
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Login error:', error);
        toast.error(error.message);
        return { success: false };
      }
      
      if (!data.user) {
        console.error('Login failed: No user data returned');
        toast.error('Login failed. Please try again.');
        return { success: false };
      }
      
      console.log('Login successful, user data:', data.user.email);
      
      // Check if this is one of our known admin emails
      const isKnownAdmin = email === 'admin@example.com' || email === 'admin@uptowngym.rw';
      
      // Get user role from profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role, is_admin, full_name')
        .eq('id', data.user.id)
        .single();
        
      if (profileError) {
        console.error('Error fetching user profile:', profileError);
        // Handle the case where profile doesn't exist yet
        if (profileError.code === 'PGRST116') {
          console.log('Profile not found, creating default profile');
          
          const userRole = isKnownAdmin ? 'admin' : 'member';
          
          // Create a default profile
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([
              { 
                id: data.user.id,
                full_name: data.user.user_metadata?.full_name || email,
                role: userRole as UserRole,
                is_admin: isKnownAdmin,
                access_level: 'Basic' as AccessLevel,
                status: 'Active'
              }
            ]);
            
          if (insertError) {
            console.error('Error creating profile:', insertError);
            // Continue anyway, as authentication was successful
          } else {
            console.log('Default profile created successfully');
          }
          
          // Return success with the admin status based on email
          toast.success('Login successful');
          return { 
            success: true,
            user: {
              id: data.user.id,
              email: data.user.email || '', 
              role: userRole as UserRole,
              full_name: data.user.user_metadata?.full_name || email,
              is_admin: isKnownAdmin,
              is_staff: false,
              status: 'Active',
              access_level: 'Basic' as AccessLevel,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            },
            isAdmin: isKnownAdmin
          };
        } else {
          // Some other error with profiles query
          console.error('Unexpected error with profiles:', profileError);
        }
      } else if (isKnownAdmin && !profile.is_admin) {
        // Update profile to set admin status for known admin emails
        console.log('Updating admin status for known admin email');
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            is_admin: true,
            role: 'admin' as UserRole
          })
          .eq('id', data.user.id);
          
        if (updateError) {
          console.error('Error updating admin status:', updateError);
        } else {
          console.log('Admin status updated successfully');
        }
      }
      
      // Get the latest profile data after possible updates
      const { data: updatedProfile } = await supabase
        .from('profiles')
        .select('role, is_admin')
        .eq('id', data.user.id)
        .single();
      
      const userRole = (updatedProfile?.role || (isKnownAdmin ? 'admin' : 'member')) as UserRole;
      const userIsAdmin = updatedProfile?.is_admin || isKnownAdmin;
      
      console.log('User authenticated with role:', userRole, 'isAdmin:', userIsAdmin);
      toast.success('Login successful');
      
      return { 
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email || '', 
          role: userRole,
          full_name: data.user.user_metadata?.full_name || email,
          is_admin: userIsAdmin,
          is_staff: false,
          status: 'Active',
          access_level: 'Basic' as AccessLevel,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        isAdmin: userIsAdmin
      };
    } catch (error) {
      console.error('Unexpected login error:', error);
      toast.error(error instanceof Error ? error.message : 'Login failed');
      return { success: false };
    }
  };

  return { login };
};
