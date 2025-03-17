
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

/**
 * Hook that provides signup functionality
 */
export const useSignUpService = () => {
  /**
   * Sign up a new user
   */
  const signUp = async (email: string, password: string, fullName: string): Promise<boolean> => {
    try {
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
      
      if (data.user) {
        // Create a profile entry for the new user
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: data.user.email,
            full_name: fullName,
            role: 'member',
            is_admin: false,
            access_level: 'limited',
            status: 'active',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
          
        if (profileError) {
          console.error('Error creating user profile:', profileError);
          toast.error('Account created but profile setup failed');
        }
        
        toast.success('Sign up successful! Please check your email to confirm your account.');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Unexpected sign up error:', error);
      toast.error(error instanceof Error ? error.message : 'Sign up failed');
      return false;
    }
  };

  return { signUp };
};
