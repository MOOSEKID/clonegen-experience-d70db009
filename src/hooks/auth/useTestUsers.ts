
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { createAdminUser } from '@/services/createAdmin';

/**
 * Hook that handles test user creation
 */
export const useTestUsers = () => {
  useEffect(() => {
    const createTestUsers = async () => {
      try {
        // Check if admin exists first
        const { data: adminExists, error: checkAdminError } = await supabase
          .from('profiles')
          .select('id')
          .eq('role', 'admin')
          .maybeSingle();
          
        if (checkAdminError) {
          console.error('Error checking for admin user:', checkAdminError);
        }
        
        // If admin doesn't exist, create one
        if (!adminExists) {
          console.log('Creating admin test user...');
          const result = await createAdminUser(
            'admin@example.com', 
            'admin123', 
            'Admin User'
          );
          console.log('Admin creation result:', result);
        }
        
        // Check if regular user exists
        const { data: userExists, error: checkUserError } = await supabase
          .from('profiles')
          .select('id')
          .eq('role', 'member')
          .maybeSingle();
          
        if (checkUserError) {
          console.error('Error checking for regular user:', checkUserError);
        }
        
        // If regular user doesn't exist, create one
        if (!userExists) {
          console.log('Creating regular test user...');
          const { data, error } = await supabase.auth.signUp({
            email: 'user@example.com',
            password: 'user123',
            options: {
              data: {
                full_name: 'Regular User'
              }
            }
          });
          
          if (error) {
            console.error('Error creating regular user:', error);
          } else if (data.user) {
            // Create a profile entry for the new user
            const { error: profileError } = await supabase
              .from('profiles')
              .upsert([
                { 
                  id: data.user.id,
                  full_name: 'Regular User',
                  role: 'member',
                  is_admin: false
                }
              ]);
              
            if (profileError) {
              console.error('Error creating user profile:', profileError);
            } else {
              console.log('Regular user created successfully');
            }
          }
        }
      } catch (err) {
        console.error('Error creating test users:', err);
      }
    };
    
    createTestUsers();
  }, []);
};
