
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import LoginActions from '@/components/auth/LoginActions';

// Define the location state type
interface LocationState {
  from?: string;
  message?: string;
}

const Login = () => {
  const { login, isAuthenticated, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Get state from location (if redirected from another page)
  const state = location.state as LocationState | null;
  const from = state?.from || '/dashboard';
  const message = state?.message;
  
  // Show toast if there's a message in the location state
  useEffect(() => {
    if (message) {
      toast.info(message);
    }
  }, [message]);
  
  useEffect(() => {
    // Check if user is already authenticated and redirect accordingly
    if (isAuthenticated && !isLoading) {
      const redirectPath = isAdmin ? '/admin/dashboard' : '/dashboard';
      console.log('User is authenticated, redirecting to:', redirectPath);
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, isAdmin, isLoading, navigate]);

  const handleLogin = async (email: string, password: string) => {
    try {
      setAuthError(null);
      console.log('Attempting login with:', email);
      const success = await login(email, password);
      
      if (success) {
        toast.success('Login successful!');
        // Redirect will be handled by the useEffect
      } else {
        setAuthError('Login failed. Please check your credentials.');
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setAuthError('Login failed. Please check your credentials.');
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const handleAdminLogin = async () => {
    console.log('Using quick admin login');
    await handleLogin('admin@uptowngym.rw', 'Admin123!');
  };

  const handleUserLogin = async () => {
    console.log('Using quick user login');
    await handleLogin('user@example.com', 'user123');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gym-dark pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gym-orange"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gym-dark pt-20">
      <LoginActions 
        loginError={authError}
        isLoading={isLoading}
        fallbackMode={false}
        onLogin={handleLogin}
        onAdminLogin={handleAdminLogin}
        onUserLogin={handleUserLogin}
      />
    </div>
  );
};

export default Login;
