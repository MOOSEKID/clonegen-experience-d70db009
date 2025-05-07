
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
};

export default useAuth;
