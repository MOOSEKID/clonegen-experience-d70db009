
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { createAdminUser } from '@/services/createAdmin';
import { toast } from 'sonner';

/**
 * Hook that handles test user creation
 */
export const useTestUsers = () => {
  useEffect(() => {
    const createTestUsers = async () => {
      // Check if test users have already been initialized
      const testUsersInitialized = localStorage.getItem('testUsersInitialized') === 'true';
      if (testUsersInitialized) {
        // Skip initialization if already done
        console.log('Test users already initialized, skipping creation');
        return;
      }
      
      try {
        console.log('Starting test user creation/verification...');
        
        // First check for active session to avoid interfering with existing login
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session) {
          console.log('Active session detected, skipping test user creation');
          localStorage.setItem('testUsersInitialized', 'true');
          return;
        }
        
        // Check for admin exists first using the profiles table
        const { data: adminProfile, error: profileError } = await supabase
          .from('profiles')
          .select('id, role, is_admin')
          .eq('is_admin', true)
          .maybeSingle();
        
        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error checking for admin profile:', profileError);
        }
        
        // Determine if admin exists in profiles table
        if (adminProfile) {
          console.log('Admin profile found:', adminProfile);
          localStorage.setItem('testUsersInitialized', 'true');
          return; // Admin exists, no need to create one
        }
        
        // Try to see if admin email is already registered without signing in
        const { data: adminData, error: adminError } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', 'admin@example.com')
          .maybeSingle();
          
        if (!adminError && adminData) {
          console.log('Admin user found in profiles, skipping creation');
          localStorage.setItem('testUsersInitialized', 'true');
          return;
        }
        
        // Admin doesn't exist, create one
        console.log('No admin found. Creating admin test user...');
        
        try {
          const result = await createAdminUser(
            'admin@example.com', 
            'admin123', 
            'Admin User'
          );
          
          console.log('Admin creation result:', result);
          
          if (result.success) {
            toast.success('Admin user created successfully');
          } else {
            toast.error(`Admin creation failed: ${result.message}`);
          }
        } catch (createError) {
          console.error('Error during admin creation:', createError);
          toast.error('Failed to create admin user');
        }
        
        // Create regular user if needed
        await createRegularTestUser();
        
        // Mark test users as initialized to prevent recreation on reload
        localStorage.setItem('testUsersInitialized', 'true');
      } catch (err) {
        console.error('Error in useTestUsers hook:', err);
        toast.error('Error setting up test users');
      }
    };
    
    const createRegularTestUser = async () => {
      try {
        console.log('Checking for existing regular user...');
        // First check if regular user exists in profiles without signing in
        const { data: userProfileData, error: userProfileError } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', 'user@example.com')
          .maybeSingle();
          
        if (!userProfileError && userProfileData) {
          console.log('Regular user found in profiles, skipping creation');
          return;
        }
        
        console.log('No regular user found. Creating regular test user...');
        
        try {
          // Create a new user
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
          } else if (data && data.user) {
            console.log('Regular user created successfully');
            toast.success('Regular user created successfully');
            
            // Important: Sign out after creating the test user
            // to prevent interfering with existing sessions
            await supabase.auth.signOut();
          }
        } catch (createError) {
          console.error('Error creating regular user:', createError);
          toast.error('Failed to create regular user');
        }
      } catch (err) {
        console.error('Error creating regular test user:', err);
      }
    };
    
    // Execute user creation after a short delay to ensure
    // it doesn't interfere with existing authentication
    const timeoutId = setTimeout(createTestUsers, 1500);
    
    // Clean up timeout if component unmounts
    return () => clearTimeout(timeoutId);
  }, []);
};
