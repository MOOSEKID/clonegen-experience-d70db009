
import { createContext, ReactNode, useEffect, useState } from 'react';
import { AuthContextType, AuthUser } from '@/types/auth.types';
import { useOptimizedAuth } from '@/hooks/useOptimizedAuth';

// Create the auth context with default values
export const OptimizedAuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const OptimizedAuthProvider = ({ children }: AuthProviderProps) => {
  // Use our optimized auth hook
  const auth = useOptimizedAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Mark the auth provider as ready after a short delay
    // This ensures all auth initialization processes have had time to complete
    const readyTimer = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(readyTimer);
  }, []);

  // Render a minimal loading state if not ready
  if (!isReady && auth.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gym-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gym-orange"></div>
      </div>
    );
  }

  return (
    <OptimizedAuthContext.Provider value={auth}>
      {children}
    </OptimizedAuthContext.Provider>
  );
};
