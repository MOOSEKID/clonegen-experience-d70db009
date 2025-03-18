
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/lib/supabase';
import { useSignUpService } from './auth/useSignUpService';
import { useLoginService } from './auth/useLoginService';
import { useAuthStateChanges } from './auth/useAuthStateChanges';
import { useInitialAuthCheck } from './auth/useInitialAuthCheck';
import type { AuthUser } from '@/types/auth.types';

interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, fullName: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { signUp } = useSignUpService();
  const { login: loginService } = useLoginService();
  const { checkAuth } = useInitialAuthCheck();

  // Setup auth state change listener
  useAuthStateChanges({ setUser, setIsAdmin, setIsAuthenticated });
  
  // Perform initial auth check on mount
  useEffect(() => {
    checkAuth({ setUser, setIsAdmin, setIsAuthenticated, setIsLoading });
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { success, user, isAdmin } = await loginService(email, password);
      
      if (success && user) {
        setUser(user);
        setIsAdmin(isAdmin || false);
        setIsAuthenticated(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error in useAuth:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setIsAdmin(false);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    isAdmin,
    isAuthenticated,
    isLoading,
    login,
    signUp,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default useAuth;
