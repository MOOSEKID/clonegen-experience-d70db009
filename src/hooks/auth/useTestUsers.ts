
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
      try {
        console.log('Starting test user creation/verification...');
        // Check for admin exists first using the profiles table
        const { data: adminProfile, error: profileError } = await supabase
          .from('profiles')
          .select('id, role, is_admin')
          .eq('is_admin', true)
          .maybeSingle();
        
        if (profileError) {
          console.error('Error checking for admin profile:', profileError);
        }
        
        // Check if admin exists in auth table
        const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
        
        if (authError) {
          console.error('Error listing auth users:', authError);
          // Try fallback approach - check session
          const { data: sessionData } = await supabase.auth.getSession();
          if (sessionData && sessionData.session) {
            console.log('Session exists, admin user might be present');
          } else {
            console.log('No session found, admin creation likely needed');
          }
        }
        
        // Determine if admin exists in auth table
        let adminExistsInAuth = false;
        if (authData && authData.users) {
          // Explicitly type the user object to avoid TypeScript errors
          adminExistsInAuth = authData.users.some((user: any) => {
            return user.email === 'admin@example.com' || user.email === 'admin@uptowngym.rw';
          });
          console.log('Admin exists in auth table:', adminExistsInAuth);
        }
        
        // If admin doesn't exist in either table or auth, create one
        if (!adminProfile && !adminExistsInAuth) {
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
        } else {
          console.log('Admin user already exists:', adminProfile || 'Admin found in auth table');
        }
        
        // Create regular user if needed
        await createRegularTestUser();
      } catch (err) {
        console.error('Error in useTestUsers hook:', err);
        toast.error('Error setting up test users');
      }
    };
    
    const createRegularTestUser = async () => {
      try {
        console.log('Checking for existing regular user...');
        const { data: userProfile, error: profileError } = await supabase
          .from('profiles')
          .select('id, role')
          .eq('role', 'member')
          .maybeSingle();
          
        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error checking for regular user profile:', profileError);
        }
        
        // Check auth table for regular user
        let regularUserExists = false;
        const { data: authData } = await supabase.auth.admin.listUsers();
        if (authData && authData.users) {
          regularUserExists = authData.users.some((user: any) => {
            if (user.email) {
              return user.email === 'user@example.com';
            }
            return false;
          });
        }
        
        if (!userProfile && !regularUserExists) {
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
              // Try sign-in approach if user might already exist
              if (error.message && error.message.includes('already registered')) {
                console.log('User might already exist, attempting sign-in...');
                const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                  email: 'user@example.com',
                  password: 'user123'
                });
                
                if (signInError) {
                  console.error('Error signing in as existing user:', signInError);
                } else if (signInData && signInData.user) {
                  console.log('Successfully signed in as regular user, creating profile');
                  // Create profile for existing user
                  await createProfileForUser(signInData.user.id, 'Regular User');
                  toast.success('Regular user profile created');
                }
              }
            } else if (data && data.user) {
              console.log('Regular user created in auth, creating profile');
              await createProfileForUser(data.user.id, 'Regular User');
              toast.success('Regular user created successfully');
            }
          } catch (createError) {
            console.error('Error creating regular user:', createError);
            toast.error('Failed to create regular user');
          }
        } else {
          console.log('Regular user already exists');
        }
      } catch (err) {
        console.error('Error creating regular test user:', err);
      }
    };
    
    const createProfileForUser = async (userId: string, fullName: string) => {
      try {
        // Check if profile already exists
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', userId)
          .maybeSingle();
          
        if (existingProfile) {
          console.log('Profile already exists for user:', userId);
          return;
        }
        
        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { 
              id: userId,
              full_name: fullName,
              role: 'member',
              is_admin: false
            }
          ]);
          
        if (profileError) {
          console.error('Error creating user profile:', profileError);
          throw new Error(`Profile creation failed: ${profileError.message}`);
        } else {
          console.log('Profile created successfully for user:', userId);
        }
      } catch (error) {
        console.error('Error in createProfileForUser:', error);
        throw error;
      }
    };
    
    // Execute user creation
    createTestUsers();
  }, []);
};
