
import { supabase } from '@/integrations/supabase/client';

export const createAdminUser = async (email: string, password: string, fullName: string) => {
  try {
    console.log(`Attempting to create or update admin user: ${email}`);
    
    // First check if user exists in auth
    let userId: string | undefined;
    
    // Try to sign in with the credentials to check if user exists
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (!signInError && signInData?.user) {
      console.log('User already exists, using existing user:', signInData.user.id);
      userId = signInData.user.id;
      
      // Sign out if we were just checking existence
      await supabase.auth.signOut();
    } else {
      console.log('No existing user found or unable to sign in, creating new admin user');
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
      console.log('Created new admin user:', userId);
    }
    
    // Check if profile exists
    const { data: existingProfile, error: profileCheckError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle(); // Use maybeSingle instead of single to avoid errors if no profile exists
      
    if (profileCheckError) {
      console.error('Error checking for existing profile:', profileCheckError);
    }
    
    // Create a Supabase client with service role to bypass RLS
    // Normally we'd use service role client, but since we have proper RLS policies now,
    // we can use the current client with proper settings
    
    if (existingProfile) {
      console.log('Admin profile already exists, updating:', existingProfile.id);
      // Update existing profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          role: 'admin',
          is_admin: true
        })
        .eq('id', userId);
        
      if (updateError) {
        console.error('Error updating admin profile:', updateError);
        return {
          success: false,
          message: updateError.message
        };
      }
    } else {
      console.log('Creating new admin profile for user:', userId);
      // Create new profile
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([
          {
            id: userId,
            full_name: fullName,
            email: email,
            role: 'admin',
            is_admin: true
          }
        ]);
        
      if (insertError) {
        console.error('Error creating admin profile:', insertError);
        return {
          success: false,
          message: insertError.message
        };
      }
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
