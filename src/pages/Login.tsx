
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';
import PresetButtons from '@/components/auth/PresetButtons';
import LoginInfo from '@/components/auth/LoginInfo';

const Login = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isAdmin } = useAuth();
  
  // Default redirect path (can be overridden by location state)
  const from = location.state?.from || '/dashboard';

  useEffect(() => {
    // Clear any previous errors
    setLoginError(null);
    
    // If user is already authenticated, redirect them
    if (isAuthenticated) {
      console.log('User is authenticated, redirecting to:', isAdmin ? '/admin' : '/dashboard');
      // Force navigation with replace to prevent back button from returning to login
      navigate(isAdmin ? '/admin' : '/dashboard', { replace: true });
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleLoginSubmit = async (email: string, password: string) => {
    setIsLoading(true);
    setLoginError(null);
    
    try {
      console.log('Attempting login with:', email);
      const success = await login(email, password);
      
      if (success) {
        console.log('Login successful!');
        toast.success('Login successful!');
        
        // Force navigation to dashboard
        const targetPath = isAdmin ? '/admin' : '/dashboard';
        console.log('Forcing navigation to:', targetPath);
        
        // Small timeout to ensure state is updated before redirect
        setTimeout(() => {
          console.log('Executing redirect now');
          navigate(targetPath, { replace: true });
        }, 500);
      } else {
        console.log('Login failed');
        setLoginError('Login failed. Please check your credentials.');
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(error instanceof Error ? error.message : 'Login failed');
      toast.error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = () => {
    handleLoginSubmit('admin@example.com', 'admin123');
  };

  const handleUserLogin = () => {
    handleLoginSubmit('user@example.com', 'user123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gym-dark pt-20">
      <Card className="w-full max-w-md p-6 bg-gym-darkblue text-white border border-white/10">
        <LoginInfo loginError={loginError} />
        
        <LoginForm 
          onLogin={handleLoginSubmit}
          isLoading={isLoading}
        />
        
        <PresetButtons 
          onAdminLogin={handleAdminLogin}
          onUserLogin={handleUserLogin}
          isLoading={isLoading}
        />
        
        <div className="mt-6 text-center text-sm text-white/70">
          Don't have an account?{' '}
          <a href="/signup" className="text-gym-orange hover:underline">
            Sign up
          </a>
        </div>
      </Card>
    </div>
  );
};

export default Login;
