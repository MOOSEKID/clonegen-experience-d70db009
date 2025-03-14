
import { createContext, useContext } from 'react';
import { AuthContextType, AuthProviderProps } from './types';
import { useSessionManager } from './useSessionManager';
import { signInWithEmail, signUpWithEmail, signOutUser, createAdmin } from './authOperations';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const { user, session, isLoading, isAdmin } = useSessionManager();

  const signIn = async (email: string, password: string) => {
    return signInWithEmail(email, password);
  };

  const signUp = async (email: string, password: string, userData: any) => {
    return signUpWithEmail(email, password, userData);
  };

  const signOut = async () => {
    return signOutUser();
  };

  const createAdminAccount = async (email: string, password: string, name: string) => {
    return createAdmin(email, password, name);
  };

  const value = {
    user,
    session,
    isLoading,
    isAdmin,
    signIn,
    signUp,
    signOut,
    createAdminAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
