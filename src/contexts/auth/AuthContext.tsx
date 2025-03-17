
import { createContext, ReactNode } from 'react';
import { AuthContextType } from './types';
import { useAuthSession } from '@/hooks/auth/useAuthSession';
import { useAuthActions } from '@/hooks/auth/useAuthActions';

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { 
    user, 
    profile, 
    isAuthenticated, 
    isLoading, 
    isAdmin,
    setIsLoading,
    handleSignOut
  } = useAuthSession();

  const {
    login,
    signUp,
    logout,
    resetPassword,
    updatePassword
  } = useAuthActions(setIsLoading);

  const contextValue: AuthContextType = {
    user,
    profile,
    isAuthenticated,
    isLoading,
    isAdmin,
    login,
    signUp,
    logout,
    resetPassword,
    updatePassword
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
