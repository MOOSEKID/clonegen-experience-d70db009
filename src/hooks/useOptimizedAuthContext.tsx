
import { useContext } from 'react';
import { OptimizedAuthContext } from '@/contexts/OptimizedAuthContext';
import { AuthContextType } from '@/types/auth.types';

/**
 * Custom hook to access the optimized authentication context
 * @returns The authentication context
 */
export const useOptimizedAuthContext = (): AuthContextType => {
  const context = useContext(OptimizedAuthContext);
  
  if (!context) {
    throw new Error('useOptimizedAuthContext must be used within an OptimizedAuthProvider');
  }
  
  return context;
};

export default useOptimizedAuthContext;
