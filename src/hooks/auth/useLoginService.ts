
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
      console.log('Login service: Attempting to sign in with:', email);
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
        console.log('User authenticated:', data.user);
        
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
            console.log('Creating default profile for user');
            // Create a default profile
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([
                { 
                  id: data.user.id,
                  full_name: data.user.user_metadata?.full_name || '',
                  role: 'member',
                  is_admin: false
                }
              ]);
              
            if (insertError) {
              console.error('Error creating profile:', insertError);
            }
            
            // Set default values since profile creation might have failed
            toast.success('Login successful');
            return { 
              success: true,
              user: {
                ...data.user,
                email: data.user.email || '',
                role: 'member'
              },
              isAdmin: false
            };
          }
        }
        
        // Special case for known admin users
        let userRole = profile?.role || 'member';
        let userIsAdmin = profile?.is_admin || false;
        
        // Check for admin@example.com hardcoded admin account
        if (email.toLowerCase() === 'admin@example.com') {
          userRole = 'admin';
          userIsAdmin = true;
          
          // Update profile if needed
          if (!profile?.is_admin) {
            console.log('Updating admin status for admin@example.com');
            await supabase
              .from('profiles')
              .upsert([
                { 
                  id: data.user.id,
                  full_name: profile?.full_name || 'Admin User',
                  role: 'admin',
                  is_admin: true
                }
              ]);
          }
        }
        
        console.log('User role and admin status:', { userRole, userIsAdmin });
        toast.success('Login successful');
        
        return { 
          success: true,
          user: {
            ...data.user,
            email: data.user.email || '', // Ensure email is always provided
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
