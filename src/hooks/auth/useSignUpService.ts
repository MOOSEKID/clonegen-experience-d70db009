
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import type { UserRole } from '@/types/auth.types';

/**
 * Hook that provides signup functionality
 */
export const useSignUpService = () => {
  /**
   * Sign up a new user
   */
  const signUp = async (email: string, password: string, fullName: string, role: UserRole = 'member'): Promise<boolean> => {
    try {
      console.log('Signing up user with email:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      
      if (error) {
        console.error('Sign up error:', error);
        toast.error(error.message);
        return false;
      }
      
      if (data?.user) {
        console.log('User created successfully:', data.user.id);
        
        // Profile creation is now handled by the database trigger
        // But we still check if it was created successfully
        
        toast.success('Sign up successful! Please check your email to confirm your account.');
        return true;
      }
      
      console.log('No user data returned after signup');
      return false;
    } catch (error) {
      console.error('Unexpected sign up error:', error);
      toast.error(error instanceof Error ? error.message : 'Sign up failed');
      return false;
    }
  };

  return { signUp };
};
