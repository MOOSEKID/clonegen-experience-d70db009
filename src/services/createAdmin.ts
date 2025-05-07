
import { supabase } from '@/integrations/supabase/client';

/**
 * Creates an admin user in the Supabase Auth system if it doesn't exist.
 * @param email The admin user's email
 * @param password The admin user's password
 * @param fullName The admin user's full name
 * @returns Result object indicating success/failure
 */
export const createAdminUser = async (
  email: string,
  password: string,
  fullName: string
): Promise<{ success: boolean; message: string; userId?: string }> => {
  try {
    console.log(`Checking if admin user ${email} exists...`);
    
    // Check if admin already exists in auth
    const { data: existingUsers, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('is_admin', true)
      .limit(1);
      
    if (!checkError && existingUsers && existingUsers.length > 0) {
      console.log('Admin user already exists');
      return {
        success: true,
        message: 'Admin user already exists',
        userId: existingUsers[0].id
      };
    }
    
    // Create admin user
    console.log('Creating admin user...');
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: 'admin'
        }
      }
    });
    
    if (authError) {
      console.error('Failed to create admin auth record:', authError);
      
      // If the error is because the user already exists, try to sign in
      if (authError.message.includes('already registered')) {
        console.log('Admin email already registered, attempting to sign in...');
        
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (signInError) {
          console.error('Failed to sign in as admin:', signInError);
          return { success: false, message: 'Admin exists but could not sign in: ' + signInError.message };
        }
        
        // Successfully signed in, now ensure profile exists with admin rights
        const userId = signInData.user?.id;
        
        if (!userId) {
          return { success: false, message: 'Admin sign in successful but no user ID returned' };
        }
        
        // Create or update profile
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert([{
            id: userId,
            full_name: fullName,
            email: email,
            role: 'admin',
            is_admin: true
          }]);
          
        if (profileError) {
          console.error('Failed to create/update admin profile:', profileError);
          return { success: false, message: 'Failed to create admin profile: ' + profileError.message };
        }
        
        // Sign out after setting up
        await supabase.auth.signOut();
        
        return {
          success: true,
          message: 'Admin user exists, profile updated with admin rights',
          userId
        };
      }
      
      return { success: false, message: 'Failed to create admin: ' + authError.message };
    }
    
    const userId = authData?.user?.id;
    
    if (!userId) {
      return { success: false, message: 'Admin creation successful but no user ID returned' };
    }
    
    // Ensure profile exists with admin rights
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert([{
        id: userId,
        full_name: fullName,
        email: email,
        role: 'admin',
        is_admin: true
      }]);
      
    if (profileError) {
      console.error('Failed to create admin profile:', profileError);
      return { success: false, message: 'Failed to create admin profile: ' + profileError.message };
    }
    
    return {
      success: true,
      message: 'Admin user created successfully',
      userId
    };
  } catch (error) {
    console.error('Unexpected error creating admin user:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, message: `Unexpected error: ${errorMessage}` };
  }
};
