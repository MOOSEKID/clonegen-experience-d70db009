
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserData } from './types';

export async function signInWithEmail(email: string, password: string) {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      toast.error(error.message);
      return { error };
    }
    
    toast.success('Logged in successfully');
    return { error: null };
  } catch (error) {
    toast.error('An unexpected error occurred');
    return { error };
  }
}

export async function signUpWithEmail(email: string, password: string, userData: UserData) {
  try {
    console.log('Signing up user with data:', { email, ...userData });
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: userData.name,
          username: userData.username || email.split('@')[0],
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }
    });
    
    if (error) {
      toast.error(error.message);
      return { error, data: null };
    }
    
    console.log('Signup successful:', data);
    
    if (data.user) {
      setTimeout(async () => {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user?.id)
          .single();
        
        if (profileError || !profile) {
          console.warn('Profile not created automatically, attempting manual creation');
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([{
              id: data.user?.id,
              full_name: userData.name,
              username: userData.username || email.split('@')[0],
            }]);
              
          if (insertError) {
            console.error('Error creating profile manually:', insertError);
          } else {
            console.log('Profile created manually');
          }
        } else {
          console.log('Profile created automatically:', profile);
        }
      }, 1000);
    }
    
    toast.success('Account created successfully!');
    return { error: null, data };
  } catch (error) {
    toast.error('An unexpected error occurred during signup');
    return { error, data: null };
  }
}

export async function signOutUser() {
  try {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    document.cookie = "session_active=; path=/; max-age=0";
    document.cookie = "user_role=; path=/; max-age=0";
  } catch (error) {
    toast.error('Error signing out');
    console.error('Error signing out:', error);
  }
}

export async function createAdmin(email: string, password: string, name: string) {
  try {
    console.log('Creating admin account:', email);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || email.split('@')[0],
          username: email.split('@')[0],
        }
      }
    });
    
    if (error) {
      toast.error(`Error creating admin: ${error.message}`);
      return { error, data: null };
    }
    
    console.log('Admin signup successful:', data);
    
    if (data.user) {
      setTimeout(async () => {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user?.id)
          .single();
        
        if (profileError || !profile) {
          console.warn('Profile not created automatically, creating manually');
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([{
              id: data.user?.id,
              full_name: name || email.split('@')[0],
              username: email.split('@')[0],
              is_admin: true,
              role: 'admin'
            }]);
              
          if (insertError) {
            console.error('Error creating admin profile manually:', insertError);
            toast.error('Error setting admin privileges');
          } else {
            console.log('Admin profile created manually');
            toast.success('Admin account created successfully');
          }
        } else {
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ 
              is_admin: true,
              role: 'admin'
            })
            .eq('id', data.user?.id);
              
          if (updateError) {
            console.error('Error updating profile to admin:', updateError);
            toast.error('Error setting admin privileges');
          } else {
            console.log('Profile updated to admin');
            toast.success('Admin account created successfully');
          }
        }
      }, 1000);
    }
    
    return { error: null, data };
  } catch (error) {
    toast.error('An unexpected error occurred creating admin account');
    return { error, data: null };
  }
}
