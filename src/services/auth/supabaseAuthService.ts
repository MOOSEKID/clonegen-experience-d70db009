
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type UserRoleParams = {
  user_id: string;
};

/**
 * Fetches the role of a user from Supabase using an RPC function
 */
export const fetchUserRole = async (userId: string): Promise<string | null> => {
  try {
    const { data, error } = await supabase.rpc<string, UserRoleParams>(
      'get_user_role', 
      { user_id: userId }
    );
      
    if (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
    
    return data || 'member';
  } catch (error) {
    console.error('Failed to fetch user role:', error);
    return null;
  }
};

/**
 * Sign in with email and password
 */
export const signInWithEmailPassword = async (
  email: string, 
  password: string
): Promise<{ success: boolean; error?: Error }> => {
  try {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error as Error };
  }
};

/**
 * Sign up a new user
 */
export const signUpUser = async (
  email: string, 
  password: string, 
  userData: {
    name: string;
    email: string;
    phone?: string;
  }
): Promise<{ success: boolean; error?: Error }> => {
  try {
    // Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          name: userData.name,
        }
      }
    });
    
    if (authError) {
      throw authError;
    }
    
    if (!authData.user) {
      throw new Error('User data not returned after signup');
    }
    
    // Create start and end dates
    const startDate = new Date().toISOString().split('T')[0];
    const endDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      .toISOString()
      .split('T')[0];
    
    // Create member record
    const { error: memberError } = await supabase.from('members').insert({
      id: authData.user.id,
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '',
      membershiptype: 'Basic',
      status: 'Pending',
      username: userData.email,
      startdate: startDate,
      enddate: endDate
    });
    
    if (memberError) {
      console.error('Error creating member record:', memberError);
      toast.error('Account created but profile setup failed');
      return { success: false, error: memberError };
    }
    
    // Assign member role
    const { data: roleData } = await supabase
      .from('roles')
      .select('id')
      .eq('name', 'member')
      .single();
      
    if (roleData?.id) {
      await supabase.from('user_roles').insert({
        user_id: authData.user.id,
        role_id: roleData.id
      });
    }
    
    toast.success('Account created successfully!');
    return { success: true };
  } catch (error) {
    console.error('Signup error:', error);
    return { success: false, error: error as Error };
  }
};

/**
 * Sign out the current user
 */
export const signOutUser = async (): Promise<{ success: boolean; error?: Error }> => {
  try {
    await supabase.auth.signOut();
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: error as Error };
  }
};

/**
 * Send password reset email
 */
export const sendPasswordResetEmail = async (email: string): Promise<{ success: boolean; error?: Error }> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) {
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Password reset error:', error);
    return { success: false, error: error as Error };
  }
};

/**
 * Update user password
 */
export const updateUserPassword = async (newPassword: string): Promise<{ success: boolean; error?: Error }> => {
  try {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    
    if (error) {
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Update password error:', error);
    return { success: false, error: error as Error };
  }
};

/**
 * Get the current session
 */
export const getCurrentSession = async () => {
  return await supabase.auth.getSession();
};

/**
 * Set up auth state change listener
 */
export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
  return supabase.auth.onAuthStateChange(callback);
};
