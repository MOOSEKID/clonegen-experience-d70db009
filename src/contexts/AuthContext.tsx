
import { createContext } from 'react';
import { AuthContextType } from '@/types/auth.types';

// Create the auth context with default values
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Re-export the provider for backwards compatibility
export { AuthProvider } from './AuthProvider';
