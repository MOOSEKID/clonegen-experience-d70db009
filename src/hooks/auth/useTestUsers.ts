
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { createAdminUser } from '@/services/createAdmin';

/**
 * Sets up test users in the database for demo purposes
 */
export const useTestUsers = () => {
  useEffect(() => {
    const initializeTestUsers = async () => {
      try {
        if (import.meta.env.DEV || import.meta.env.VITE_ENABLE_TEST_USERS === 'true') {
          // Check for existing users first by checking profiles instead of auth users
          const { data: existingProfiles, error: profileError } = await supabase
            .from('profiles')
            .select('email');
          
          if (profileError) {
            console.error('Error checking existing profiles:', profileError);
            return;
          }
          
          const userEmails = existingProfiles?.map(profile => profile.email) || [];
          console.log('Existing user emails:', userEmails);
          
          // Create test admin user if it doesn't exist
          if (!userEmails.includes('admin@example.com')) {
            console.log('Creating test admin user...');
            await createAdminUser(
              'admin@example.com',
              'admin123',
              'Admin User'
            );
          }
          
          // Create another admin for Uptown Gym
          if (!userEmails.includes('admin@uptowngym.rw')) {
            console.log('Creating Uptown Gym admin user...');
            await createAdminUser(
              'admin@uptowngym.rw',
              'admin123',
              'Uptown Gym Admin'
            );
          }
          
          // Create test regular user if it doesn't exist
          if (!userEmails.includes('user@example.com')) {
            console.log('Creating test regular user...');
            const { data: regularUser, error: regularUserError } = await supabase.auth.signUp({
              email: 'user@example.com',
              password: 'user123',
              options: {
                data: {
                  full_name: 'Regular User'
                }
              }
            });
            
            if (regularUserError) {
              console.error('Error creating regular user:', regularUserError);
            } else {
              console.log('Regular user created:', regularUser);
              
              // Make sure the profile is set up correctly with non-admin role
              if (regularUser.user) {
                const { error: profileError } = await supabase
                  .from('profiles')
                  .upsert({
                    id: regularUser.user.id,
                    full_name: 'Regular User',
                    email: 'user@example.com',
                    role: 'member',
                    is_admin: false
                  });
                  
                if (profileError) {
                  console.error('Error setting up regular user profile:', profileError);
                }
              }
            }
          }
        } else {
          console.log('Test users initialization skipped (not in development mode)');
        }
      } catch (error) {
        console.error('Error in useTestUsers:', error);
      }
    };
    
    initializeTestUsers();
  }, []);
};

export default useTestUsers;
