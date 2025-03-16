
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
            .select('id, full_name');
          
          if (profileError) {
            console.error('Error checking existing profiles:', profileError);
            return;
          }
          
          const existingProfileIds = existingProfiles?.map(profile => profile.id) || [];
          console.log('Existing profile IDs:', existingProfileIds);
          
          // Get auth users to check emails (since profiles might not have emails)
          const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
          if (authError) {
            console.error('Error listing auth users:', authError);
          }
          
          const existingEmails = authUsers?.users?.map(user => user.email) || [];
          console.log('Existing user emails:', existingEmails);
          
          // Create test admin user if it doesn't exist
          if (!existingEmails.includes('admin@example.com')) {
            console.log('Creating test admin user...');
            await createAdminUser(
              'admin@example.com',
              'admin123',
              'Admin User'
            );
          }
          
          // Create another admin for Uptown Gym
          if (!existingEmails.includes('admin@uptowngym.rw')) {
            console.log('Creating Uptown Gym admin user...');
            await createAdminUser(
              'admin@uptowngym.rw',
              'admin123',
              'Uptown Gym Admin'
            );
          }
          
          // Create test regular user if it doesn't exist
          if (!existingEmails.includes('user@example.com')) {
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
