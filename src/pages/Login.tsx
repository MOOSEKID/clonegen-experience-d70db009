import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';
import PresetButtons from '@/components/auth/PresetButtons';
import LoginInfo from '@/components/auth/LoginInfo';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { supabase } from '@/integrations/supabase/client';

const Login = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isAdmin } = useAuth();
  
  // Default redirect path (can be overridden by location state)
  const from = location.state?.from || '/dashboard';

  useEffect(() => {
    // Clear any previous errors
    setLoginError(null);
    
    // Check if user is already authenticated from context
    if (isAuthenticated) {
      console.log('Already authenticated, redirecting...');
      navigate(isAdmin ? '/admin' : '/dashboard', { replace: true });
      return;
    }
    
    // Fast client-side check using localStorage
    const isLoggedInLocal = localStorage.getItem('isLoggedIn') === 'true';
    const isAdminLocal = localStorage.getItem('isAdmin') === 'true';
    
    if (isLoggedInLocal) {
      console.log('User appears to be authenticated via local storage');
      // Quick redirect while verification continues
      navigate(isAdminLocal ? '/admin' : '/dashboard', { replace: true });
    }
    
    // Check session asynchronously without blocking
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          console.log('Session verified, user is authenticated');
          setIsCheckingAuth(false);
        } else {
          console.log('No active session found');
          setIsCheckingAuth(false);
        }
      } catch (error) {
        console.error('Session check error:', error);
        setIsCheckingAuth(false);
      }
    };
    
    // Run session check without blocking initial render
    checkSession();
  }, [isAuthenticated, isAdmin, navigate]);

  const handleLoginSubmit = async (email: string, password: string) => {
    setIsLoading(true);
    setLoginError(null);
    
    try {
      console.log('Attempting login with:', email);
      const success = await login(email, password);
      
      if (success) {
        console.log('Login successful!');
        
        // Check if this is one of our admin emails
        const isAdminUser = email === 'admin@example.com' || email === 'admin@uptowngym.rw';
        
        // Determine redirect path
        const targetPath = isAdminUser ? '/admin' : '/dashboard';
        console.log('Redirecting to:', targetPath);
        
        // Immediate redirect for better user experience
        navigate(targetPath, { replace: true });
      } else {
        console.log('Login failed');
        setLoginError('Login failed. Please check your credentials.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(error instanceof Error ? error.message : 'Login failed');
      setIsLoading(false);
    }
  };

  const handleAdminLogin = () => {
    handleLoginSubmit('admin@example.com', 'admin123');
  };

  const handleUserLogin = () => {
    handleLoginSubmit('user@example.com', 'user123');
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gym-dark pt-20">
        <Card className="w-full max-w-md p-6 bg-gym-darkblue text-white border border-white/10 flex items-center justify-center">
          <LoadingSpinner color="gym-orange" size="lg" text="Checking authentication status..." />
        </Card>
      </div>
    );
  }

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
