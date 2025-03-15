
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { AuthContext, AuthContextType } from '@/contexts/auth/AuthContext';
import { useUserSession } from '@/hooks/auth/useUserSession';
import { 
  signInWithEmail, 
  signUpWithEmail, 
  signOutUser, 
  requestPasswordReset, 
  resetUserPassword 
} from '@/services/auth/authService';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get user session state
  const { user, isLoading, isAuthenticated, isAdmin } = useUserSession();

  // Create context value
  const authContextValue: AuthContextType = {
    user,
    isAuthenticated,
    isAdmin,
    isLoading,
    signIn: signInWithEmail,
    signUp: signUpWithEmail,
    signOut: async () => {
      await signOutUser();
      // No need to setUser(null) as the auth state change will trigger checkUser
    },
    requestPasswordReset,
    resetPassword: resetUserPassword,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default useAuth;
