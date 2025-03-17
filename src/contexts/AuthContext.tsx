
// This file is kept for backward compatibility, but it delegates to the new implementation

import { ReactNode } from 'react';
import { AuthProvider as NewAuthProvider } from '@/contexts/auth/AuthContext';
import AuthContext from '@/contexts/auth/AuthContext';
export { default } from '@/contexts/auth/AuthContext';
export type { UserProfile } from '@/contexts/auth/types';
export type { AuthContextType } from '@/contexts/auth/types';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <NewAuthProvider>{children}</NewAuthProvider>;
};
