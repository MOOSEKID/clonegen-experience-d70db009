
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { AuthContextType } from '@/types/auth.types';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

/**
 * Custom hook to access the authentication context
 * @returns The authentication context
 */
export const useAuth = (): AuthContextType => {
  try {
    const context = useContext(AuthContext);
    
    if (!context) {
      console.error('useAuth must be used within an AuthProvider');
      
      // Provide a fallback value for error cases
      return {
        user: null,
        isAdmin: false,
        isLoading: false,
        isAuthenticated: false,
        login: async () => false,
        signUp: async () => false,
        logout: async () => false,
        requestPasswordReset: async () => false,
        updatePassword: async () => false
      };
    }
    
    return context;
  } catch (error) {
    // Provide a fallback value for edge cases where context isn't available yet
    console.error('Auth context error:', error);
    
    return {
      user: null,
      isAdmin: false,
      isLoading: false,
      isAuthenticated: false,
      login: async () => false,
      signUp: async () => false,
      logout: async () => false,
      requestPasswordReset: async () => false,
      updatePassword: async () => false
    };
  }
};

export default useAuth;
