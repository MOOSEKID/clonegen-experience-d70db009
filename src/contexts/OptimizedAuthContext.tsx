
import { createContext, ReactNode } from 'react';
import { AuthContextType } from '@/types/auth.types';
import { useOptimizedAuth } from '@/hooks/useOptimizedAuth';

// Create the auth context with default values
export const OptimizedAuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const OptimizedAuthProvider = ({ children }: AuthProviderProps) => {
  // Use our new optimized auth hook
  const auth = useOptimizedAuth();

  return (
    <OptimizedAuthContext.Provider value={auth}>
      {children}
    </OptimizedAuthContext.Provider>
  );
};
