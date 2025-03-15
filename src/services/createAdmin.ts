
import { supabase } from '@/integrations/supabase/client';

export const createAdminUser = async (email: string, password: string, fullName: string) => {
  try {
    // Check if admin already exists
    const { data: existingAdmin, error: checkError } = await supabase
      .from('profiles')
      .select('id')
      .eq('role', 'admin')
      .eq('is_admin', true)
      .single();
      
    if (!checkError && existingAdmin) {
      console.log('Admin user already exists:', existingAdmin);
      return {
        success: false,
        message: 'Admin user already exists'
      };
    }
    
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
    
    // Update profile to admin role
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        role: 'admin',
        is_admin: true,
        full_name: fullName
      })
      .eq('id', authUser.user.id);
      
    if (profileError) {
      console.error('Error updating admin profile:', profileError);
      return {
        success: false,
        message: profileError.message
      };
    }
    
    return {
      success: true,
      message: 'Admin user created successfully',
      userId: authUser.user.id
    };
  } catch (error) {
    console.error('Error in createAdminUser:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error creating admin user'
    };
  }
};
