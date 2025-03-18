
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
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
      
      // Profile is created by database trigger if it doesn't exist
      // Fetch the profile to get user role and permissions
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
        
      if (profileError) {
        console.error('Error fetching user profile:', profileError);
        // Still return success but with limited user info
        toast.success('Login successful');
        return { 
          success: true,
          user: {
            id: data.user.id,
            email: data.user.email || '', 
            full_name: data.user.user_metadata?.full_name || data.user.email || '',
            role: 'member',
            is_admin: false,
            is_staff: false,
            status: 'Active',
            access_level: 'Basic' as AccessLevel,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          isAdmin: false
        };
      }
      
      // Return user with profile data
      toast.success('Login successful');
      return { 
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email || '', 
          full_name: profile.full_name || data.user.user_metadata?.full_name || '',
          role: profile.role || 'member',
          is_admin: profile.is_admin || false,
          is_staff: profile.is_staff || false,
          status: profile.status || 'Active',
          access_level: profile.access_level || 'Basic',
          created_at: profile.created_at || new Date().toISOString(),
          updated_at: profile.updated_at || new Date().toISOString()
        },
        isAdmin: profile.is_admin || false
      };
    } catch (error) {
      console.error('Unexpected login error:', error);
      toast.error(error instanceof Error ? error.message : 'Login failed');
      return { success: false };
    }
  };

  return { login };
};
