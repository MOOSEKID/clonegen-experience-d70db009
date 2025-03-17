
import { useState, useEffect } from 'react';
import { AuthUser } from '@/types/auth.types';
import useAuthStateChanges from './auth/useAuthStateChanges';
import useInitialAuthCheck from './auth/useInitialAuthCheck';

/**
 * A hook that provides the authentication state
 */
export const useAuthState = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const { checkAuth } = useInitialAuthCheck();

  // Set up auth state change listeners
  useAuthStateChanges({ setUser, setIsAdmin, setIsAuthenticated });

  // Perform initial auth check
  useEffect(() => {
    checkAuth({ setUser, setIsAdmin, setIsAuthenticated, setIsLoading });
  }, []);

  return {
    user,
    isAdmin,
    isLoading,
    isAuthenticated,
    setUser,
    setIsAdmin,
    setIsAuthenticated
  };
};

export default useAuthState;
