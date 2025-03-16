import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { AuthUser } from '@/types/auth.types';

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
        // Check if this is one of our known admin emails
        const isKnownAdmin = email === 'admin@example.com' || email === 'admin@uptowngym.rw';
        console.log('Is known admin email:', isKnownAdmin);
        
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
            console.log('Profile not found, creating new profile');
            // Create a default profile
            const { error: insertError } = await supabase
              .from('profiles')
              .upsert([
                { 
                  id: data.user.id,
                  full_name: data.user.user_metadata?.full_name || email,
                  role: isKnownAdmin ? 'admin' : 'member',
                  is_admin: isKnownAdmin
                }
              ], {
                onConflict: 'id'
              });
              
            if (insertError) {
              console.error('Error creating profile:', insertError);
              toast.error('Error setting up user profile');
            } else {
              console.log('Profile created successfully');
            }
          }
        } else {
          console.log('Existing profile found:', profile);
          if (isKnownAdmin && (!profile.is_admin || profile.role !== 'admin')) {
            console.log('Updating profile for known admin user');
            // Update profile to set admin status for known admin emails
            const { error: updateError } = await supabase
              .from('profiles')
              .update({
                is_admin: true,
                role: 'admin'
              })
              .eq('id', data.user.id);
              
            if (updateError) {
              console.error('Error updating admin status:', updateError);
              toast.error('Error updating admin privileges');
            } else {
              console.log('Admin status updated successfully');
            }
          }
        }
        
        // Get the latest profile data after possible updates
        const { data: updatedProfile, error: finalProfileError } = await supabase
          .from('profiles')
          .select('role, is_admin')
          .eq('id', data.user.id)
          .single();
        
        if (finalProfileError) {
          console.error('Error fetching final profile:', finalProfileError);
        }
        
        const userRole = updatedProfile?.role || (isKnownAdmin ? 'admin' : 'member');
        const userIsAdmin = updatedProfile?.is_admin || isKnownAdmin;
        
        console.log('Final user state:', { role: userRole, isAdmin: userIsAdmin });
        toast.success('Login successful');
        
        return { 
          success: true,
          user: {
            ...data.user,
            email: data.user.email || '', 
            role: userRole
          },
          isAdmin: userIsAdmin
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
