
import { useContext } from 'react';
import { AuthContext } from '@/contexts/auth/AuthContext';
import { AuthContextType } from '@/contexts/auth/types';

/**
 * Custom hook to access the authentication context
 * Provides access to:
 * - User authentication state
 * - Profile management (staff categories, roles, departments)
 * - Access level control (full, high, medium, basic, limited)
 * - Session management (sign in, sign out, refresh)
 * @returns The authentication context with proper access control
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default useAuth;
