
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { AuthUser } from '@/types/auth.types';
import { User } from '@supabase/supabase-js';

/**
 * Hook that provides login functionality
 */
export const useLoginService = () => {
  /**
   * Login with email and password
   */
  const login = async (email: string, password: string): Promise<{
    success: boolean;
    user?: User;
    isAdmin?: boolean;
  }> => {
    try {
      console.log(`Attempting to log in with email: ${email}`);
      
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
        console.log('Login successful for user:', data.user.id);
        
        // Check if this is one of our known admin emails
        const isKnownAdmin = email === 'admin@example.com' || email === 'admin@uptowngym.rw';
        
        // Get user role from profiles table
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role, is_admin, full_name')
          .eq('id', data.user.id)
          .maybeSingle();
          
        let userRole = 'member';
        let userIsAdmin = false;
        let userProfile = profile;
        
        if (profileError) {
          // Only log real errors, not just "no rows returned"
          if (profileError.code !== 'PGRST116') {
            console.error('Error fetching user profile:', profileError);
          }
          
          // Handle the case where profile doesn't exist yet
          if (profileError.code === 'PGRST116') {
            console.log('Profile not found, creating default profile for user:', data.user.id);
            // Create a default profile - using single insert with maybeSingle() 
            // to prevent race conditions from multiple profile creations
            try {
              const { data: newProfile, error: insertError } = await supabase
                .from('profiles')
                .insert([
                  { 
                    id: data.user.id,
                    email: data.user.email,
                    full_name: data.user.user_metadata?.full_name || email,
                    role: isKnownAdmin ? 'admin' : 'member',
                    is_admin: isKnownAdmin
                  }
                ])
                .select('*')
                .maybeSingle();
                
              if (insertError) {
                console.error('Error creating profile:', insertError);
                toast.error('Login successful but profile creation failed');
              } else {
                console.log('Profile created successfully for user:', data.user.id);
                userProfile = newProfile;
                userRole = newProfile?.role || (isKnownAdmin ? 'admin' : 'member');
                userIsAdmin = newProfile?.is_admin || isKnownAdmin;
              }
            } catch (e) {
              console.error('Exception during profile creation:', e);
            }
          }
        } else if (profile) {
          if (isKnownAdmin && !profile.is_admin) {
            // Update profile to set admin status for known admin emails
            console.log('Known admin email found, updating admin status');
            
            const { error: updateError } = await supabase
              .from('profiles')
              .update({
                is_admin: true,
                role: 'admin'
              })
              .eq('id', data.user.id);
              
            if (updateError) {
              console.error('Error updating admin status:', updateError);
            } else {
              console.log('Admin status updated successfully');
              userIsAdmin = true;
              userRole = 'admin';
            }
          } else {
            userRole = profile.role || (isKnownAdmin ? 'admin' : 'member');
            userIsAdmin = profile.is_admin || isKnownAdmin;
          }
        }
        
        console.log('User login processed with roles:', {
          role: userRole,
          isAdmin: userIsAdmin
        });
        
        toast.success('Login successful');
        
        // Return the User object directly from Supabase rather than converting it here
        return { 
          success: true,
          user: data.user,
          isAdmin: userIsAdmin
        };
      }
      
      return { success: false };
    } catch (error) {
      console.error('Unexpected login error:', error);
      toast.error(error instanceof Error ? error.message : 'Login failed');
      return { success: false };
    }
  };

  return { login };
};
