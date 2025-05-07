
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { OptimizedAuthContext } from '@/contexts/OptimizedAuthContext';
import { AuthContextType } from '@/types/auth.types';

/**
 * Custom hook to access the authentication context
 * Tries the optimized context first, falls back to the original for backward compatibility
 * @returns The authentication context
 */
export const useAuth = (): AuthContextType => {
  try {
    // Try the optimized context first
    const optimizedContext = useContext(OptimizedAuthContext);
    if (optimizedContext) {
      return optimizedContext;
    }
    
    // Fall back to the original context
    const originalContext = useContext(AuthContext);
    
    if (!originalContext) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    
    return originalContext;
  } catch (error) {
    // Provide a fallback value for edge cases where context isn't available yet
    console.error('Auth context error:', error);
    
    return {
      user: null,
      isAdmin: false,
      isLoading: true,
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
