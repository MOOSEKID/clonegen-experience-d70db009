
import { supabase } from '@/integrations/supabase/client';

export const createAdminUser = async (email: string, password: string, fullName: string) => {
  try {
    // Check if admin already exists in auth
    // Note: We no longer use filters as it's not supported in the PageParams type
    const { data: authUsers, error: checkAuthError } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 100 // Get more users and filter in code
    });
    
    // Find the user with the matching email
    const existingAuthUser = authUsers?.users.find(user => user.email === email);
    let userId = existingAuthUser?.id;
    
    // If user doesn't exist in auth, create them
    if (!userId) {
      // Create admin user in auth
      const { data: authUser, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });
      
      if (authError) {
        console.error('Error creating admin auth user:', authError);
        return {
          success: false,
          message: authError.message
        };
      }
      
      if (!authUser.user) {
        return {
          success: false,
          message: 'Failed to create admin user'
        };
      }
      
      userId = authUser.user.id;
    }
    
    // Update or create profile as admin
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert([
        {
          id: userId,
          full_name: fullName,
          role: 'admin',
          is_admin: true
        }
      ]);
      
    if (profileError) {
      console.error('Error updating admin profile:', profileError);
      return {
        success: false,
        message: profileError.message
      };
    }
    
    return {
      success: true,
      message: 'Admin user created/updated successfully',
      userId: userId
    };
  } catch (error) {
    console.error('Error in createAdminUser:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error creating admin user'
    };
  }
};
