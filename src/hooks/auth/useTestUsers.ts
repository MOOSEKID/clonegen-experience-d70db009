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
        console.log('Checking for existing admin user...');
        // Force recreate admin user
        console.log('Recreating admin user...');
        const result = await createAdminUser(
          'admin@example.com', 
          'admin123', 
          'Admin User'
        );
        console.log('Admin creation/update result:', result);
        
        if (!result.success) {
          console.error('Failed to create/update admin user:', result.message);
          return;
        }

        // Verify admin profile is correctly set
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', result.userId)
          .single();

        if (profileError) {
          console.error('Error verifying admin profile:', profileError);
          return;
        }

        if (!profile.is_admin || profile.role !== 'admin') {
          console.log('Fixing admin profile configuration...');
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ 
              is_admin: true,
              role: 'admin',
              full_name: 'Admin User'
            })
            .eq('id', result.userId);

          if (updateError) {
            console.error('Error fixing admin profile:', updateError);
          } else {
            console.log('Admin profile configuration fixed');
          }
        }

        // Check if regular user exists
        console.log('Checking for existing regular user...');
        const { data: userExists, error: checkUserError } = await supabase
          .from('profiles')
          .select('id, role')
          .eq('role', 'member')
          .maybeSingle();
          
        if (checkUserError) {
          console.error('Error checking for regular user:', checkUserError);
        }
        
        // If regular user doesn't exist, create one
        if (!userExists) {
          console.log('No regular user found. Creating regular test user...');
          
          // First check if the user exists in auth
          const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
          
          if (authError) {
            console.error('Error checking for existing auth users:', authError);
          }
          
          let existingUser = null;
          if (authData && authData.users) {
            // Use explicit type assertion
            existingUser = authData.users.find((user: any) => user.email === 'user@example.com');
          }
          
          if (existingUser) {
            console.log('User exists in auth but not in profiles. Creating profile for existing user.');
            
            // Create a profile entry for the existing user
            const { error: profileError } = await supabase
              .from('profiles')
              .upsert([
                { 
                  id: existingUser.id,
                  full_name: 'Regular User',
                  role: 'member',
                  is_admin: false
                }
              ]);
              
            if (profileError) {
              console.error('Error creating user profile for existing auth user:', profileError);
            } else {
              console.log('Profile created for existing auth user.');
            }
          } else {
            // User doesn't exist in auth, create a new one
            console.log('Creating new regular user with auth and profile...');
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
              
              // If user already exists, try to get their ID to create a profile
              if (error.message && error.message.includes('already registered')) {
                console.log('User already registered, attempting to create profile...');
                
                // Sign in to get the user ID
                const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                  email: 'user@example.com',
                  password: 'user123'
                });
                
                if (signInError) {
                  console.error('Error signing in as existing user:', signInError);
                } else if (signInData && signInData.user) {
                  // Create a profile entry for the existing user
                  const { error: profileError } = await supabase
                    .from('profiles')
                    .upsert([
                      { 
                        id: signInData.user.id,
                        full_name: 'Regular User',
                        role: 'member',
                        is_admin: false
                      }
                    ]);
                    
                  if (profileError) {
                    console.error('Error creating user profile:', profileError);
                  } else {
                    console.log('Profile created for existing user after sign-in');
                  }
                }
              }
            } else if (data && data.user) {
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
                console.log('Regular user created successfully with profile');
              }
            }
          }
        } else {
          console.log('Regular user already exists:', userExists);
        }
      } catch (err) {
        console.error('Error creating test users:', err);
      }
    };
    
    createTestUsers();
  }, []);
};
