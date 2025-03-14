
import { supabase } from '@/integrations/supabase/client';

export const createAdminUser = async (email: string, password: string, name = "Admin"): Promise<boolean> => {
  console.log('Creating admin account:', email);
  
  try {
    // 1. Create the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          username: email.split('@')[0],
        }
      }
    });
    
    if (authError) {
      console.error('Error creating admin auth:', authError);
      return false;
    }
    
    if (!authData.user) {
      console.error('No user returned from auth signup');
      return false;
    }
    
    // 2. Wait a bit for triggers to run
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 3. Check if profile exists
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();
    
    // 4. Create or update profile to be admin
    if (profileError || !profile) {
      // Create profile
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([{
          id: authData.user.id,
          full_name: name,
          username: email.split('@')[0],
          is_admin: true,
          role: 'admin'
        }]);
        
      if (insertError) {
        console.error('Error creating admin profile:', insertError);
        return false;
      }
    } else {
      // Update profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          is_admin: true,
          role: 'admin'
        })
        .eq('id', authData.user.id);
        
      if (updateError) {
        console.error('Error updating profile to admin:', updateError);
        return false;
      }
    }
    
    console.log('Admin account created successfully');
    return true;
  } catch (error) {
    console.error('Unexpected error creating admin:', error);
    return false;
  }
};

// Utility function to create the specified admin account
export const createSpecificAdmin = async (): Promise<void> => {
  const email = "uptowngym250@gmail.com";
  const password = "UptownGym@123";
  const name = "Uptown Gyms Admin";
  
  // Check if the admin already exists
  const { data: existingUsers, error: checkError } = await supabase.auth.admin.listUsers();
  
  if (checkError) {
    console.error('Error checking for existing admin:', checkError);
    return;
  }
  
  // Only create if the admin doesn't exist
  // Handle the case where existingUsers or existingUsers.users could be undefined
  const adminExists = existingUsers?.users ? existingUsers.users.some(user => user.email === email) : false;
  
  if (adminExists) {
    console.log('Admin account already exists');
    return;
  }
  
  const success = await createAdminUser(email, password, name);
  
  if (success) {
    console.log(`Admin account ${email} created successfully`);
  } else {
    console.error(`Failed to create admin account ${email}`);
  }
};
