
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { getUserProfile } from '@/services/auth/authService';
import { AuthUser } from '@/contexts/auth/AuthContext';

export const useUserSession = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check and update user
  const checkUser = async () => {
    try {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Get profile data from profiles table to determine role/admin status
        const profile = await getUserProfile(session.user.id);
        
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          role: profile?.role || 'member',
          isAdmin: profile?.is_admin || false,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking user:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Check user on auth state change
  const handleAuthChange = async (event: string, session: Session | null) => {
    await checkUser();
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);
    
    // Initial session check
    checkUser();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: !!user?.isAdmin
  };
};
