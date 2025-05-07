
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useOptimizedAuthContext } from '@/hooks/useOptimizedAuthContext';
import LoginForm from '@/components/auth/LoginForm';
import PresetButtons from '@/components/auth/PresetButtons';
import LoginInfo from '@/components/auth/LoginInfo';
import { supabase } from '@/integrations/supabase/client';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

const Login = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isAdmin } = useOptimizedAuthContext();
  
  // Default redirect path (can be overridden by location state)
  const from = location.state?.from || '/dashboard';

  useEffect(() => {
    // Clear any previous errors
    setLoginError(null);
    
    const checkAuthStatus = async () => {
      try {
        // Fast client-side check using localStorage
        const isLoggedInLocal = localStorage.getItem('isLoggedIn') === 'true';
        const isAdminLocal = localStorage.getItem('isAdmin') === 'true';
        
        if (isLoggedInLocal) {
          console.log('User appears to be authenticated via local storage');
          // Quick redirect while we verify with Supabase
          const redirectPath = isAdminLocal ? '/admin' : '/dashboard';
          navigate(redirectPath, { replace: true });
          return;
        }
        
        // Get the session directly from Supabase
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error checking authentication status:", error);
          setIsCheckingAuth(false);
          return;
        }
        
        if (session) {
          console.log('User is authenticated via Supabase');
          
          // Check if user is admin by querying the profiles table
          const { data: profileData } = await supabase
            .from('profiles')
            .select('is_admin, role')
            .eq('id', session.user.id)
            .maybeSingle();
            
          // Check if it's one of our admin users
          const userEmail = session.user.email;
          let userIsAdmin = profileData?.is_admin || false;
          
          // Explicitly check for the admin email addresses
          if (userEmail === 'admin@example.com' || userEmail === 'admin@uptowngym.rw') {
            userIsAdmin = true;
          }
          
          // Direct redirect based on admin status
          const redirectPath = userIsAdmin ? '/admin' : '/dashboard';
          console.log('Redirecting to:', redirectPath);
          
          // Force navigation with replace to prevent back button from returning to login
          navigate(redirectPath, { replace: true });
        } else {
          setIsCheckingAuth(false);
        }
      } catch (error) {
        console.error("Error in authentication check:", error);
        setIsCheckingAuth(false);
      }
    };
    
    checkAuthStatus();
    
    // If user is already authenticated through the context, also redirect
    if (isAuthenticated) {
      console.log('User is authenticated through context, redirecting');
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
        
        // Check if this is one of our admin emails
        const isAdminUser = email === 'admin@example.com' || email === 'admin@uptowngym.rw';
        
        // Determine if user should go to admin or dashboard
        const isAdminRedirect = isAdminUser || false;
        
        // Force navigation to admin dashboard for admin users
        const targetPath = isAdminRedirect ? '/admin' : '/dashboard';
        console.log('Forcing navigation to:', targetPath);
        
        // Immediate redirect for better user experience
        navigate(targetPath, { replace: true });
      } else {
        console.log('Login failed');
        setLoginError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(error instanceof Error ? error.message : 'Login failed');
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
