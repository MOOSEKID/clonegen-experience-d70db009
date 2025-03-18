
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    console.error("useAuth must be used within an AuthProvider");
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Re-export the AuthProvider component for convenience
export { AuthProvider } from '@/contexts/AuthProvider';

export default useAuth;
