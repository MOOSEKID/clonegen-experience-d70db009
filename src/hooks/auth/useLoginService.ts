
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
            // Create a default profile
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([
                { 
                  id: data.user.id,
                  full_name: data.user.user_metadata?.full_name || email,
                  role: isKnownAdmin ? 'admin' : 'member',
                  is_admin: isKnownAdmin
                }
              ]);
              
            if (insertError) {
              console.error('Error creating profile:', insertError);
            }
          }
        } else if (isKnownAdmin && !profile.is_admin) {
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
          }
        }
        
        // Get the latest profile data after possible updates
        const { data: updatedProfile } = await supabase
          .from('profiles')
          .select('role, is_admin')
          .eq('id', data.user.id)
          .single();
        
        const userRole = updatedProfile?.role || (isKnownAdmin ? 'admin' : 'member');
        const userIsAdmin = updatedProfile?.is_admin || isKnownAdmin;
        
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
      
      return { success: false };
    } catch (error) {
      console.error('Unexpected login error:', error);
      toast.error(error instanceof Error ? error.message : 'Login failed');
      return { success: false };
    }
  };

  return { login };
};
