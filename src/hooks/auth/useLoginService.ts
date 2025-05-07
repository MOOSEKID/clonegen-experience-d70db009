
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
        
        // Fast path for known admin emails to avoid extra database call
        const isKnownAdmin = email.toLowerCase() === 'admin@example.com' || email.toLowerCase() === 'admin@uptowngym.rw';
        
        // If this is a known admin email, return immediately for faster response
        if (isKnownAdmin) {
          console.log('Known admin email detected, fast path enabled');
          
          // Update admin status in profile async (don't wait for it)
          setTimeout(async () => {
            try {
              // Check if profile exists first
              const { data: existingProfile, error: checkError } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', data.user.id)
                .maybeSingle();
                
              if (checkError && checkError.code !== 'PGRST116') {
                console.error('Error checking profile:', checkError);
              }
              
              if (existingProfile) {
                // Update existing profile
                await supabase
                  .from('profiles')
                  .update({
                    is_admin: true,
                    role: 'admin'
                  })
                  .eq('id', data.user.id);
              } else {
                // Create new profile
                await supabase
                  .from('profiles')
                  .insert([
                    { 
                      id: data.user.id,
                      email: data.user.email,
                      full_name: data.user.user_metadata?.full_name || email,
                      role: 'admin',
                      is_admin: true
                    }
                  ]);
              }
              
              console.log('Admin status updated successfully in background');
            } catch (e) {
              console.error('Exception updating admin profile in background:', e);
            }
          }, 0);
          
          toast.success('Admin login successful');
          
          return { 
            success: true,
            user: data.user,
            isAdmin: true
          };
        }
        
        // Regular path for non-admin users
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
                    role: 'member',
                    is_admin: false
                  }
                ])
                .select('*')
                .maybeSingle();
                
              if (insertError) {
                console.error('Error creating profile:', insertError);
              } else {
                console.log('Profile created successfully for user:', data.user.id);
                userProfile = newProfile;
                userRole = newProfile?.role || 'member';
                userIsAdmin = newProfile?.is_admin || false;
              }
            } catch (e) {
              console.error('Exception during profile creation:', e);
            }
          }
        } else if (profile) {
          userRole = profile.role || 'member';
          userIsAdmin = profile.is_admin || false;
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
