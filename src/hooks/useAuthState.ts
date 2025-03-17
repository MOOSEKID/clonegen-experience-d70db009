import { useState } from 'react';
import { AuthUser } from '@/types/auth.types';

export const useAuthState = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return {
    user,
    isAdmin,
    isStaff,
    isLoading,
    isAuthenticated,
    setUser,
    setIsAdmin,
    setIsStaff,
    setIsLoading,
    setIsAuthenticated,
  };
};
