import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';
import PresetButtons from '@/components/auth/PresetButtons';
import LoginInfo from '@/components/auth/LoginInfo';
import { supabase } from '@/integrations/supabase/client';

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
    
    const checkAuthStatus = async () => {
      try {
        // Get the session directly from Supabase
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error checking authentication status:", error);
          return;
        }
        
        if (session) {
          console.log('User is authenticated via Supabase, checking admin status');
          
          // Check if user is admin by querying the profiles table
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('is_admin, role')
            .eq('id', session.user.id)
            .maybeSingle();
            
          if (profileError && profileError.code !== 'PGRST116') {
            console.error("Error fetching profile:", profileError);
            return;
          }
          
          // Check if it's one of our admin users
          const userEmail = session.user.email;
          let userIsAdmin = profileData?.is_admin || false;
          
          // Explicitly check for the admin email addresses
          if (userEmail === 'admin@example.com' || userEmail === 'admin@uptowngym.rw') {
            userIsAdmin = true;
          }
          
          console.log('Login redirect check:', { userEmail, userIsAdmin, profileData });
          
          // Direct redirect based on admin status
          const redirectPath = userIsAdmin ? '/admin' : '/dashboard';
          console.log('Redirecting to:', redirectPath);
          
          // Force navigation with replace to prevent back button from returning to login
          navigate(redirectPath, { replace: true });
        }
      } catch (error) {
        console.error("Error in authentication check:", error);
      }
    };
    
    checkAuthStatus();
    
    // If user is already authenticated through the context, also redirect
    if (isAuthenticated) {
      console.log('User is authenticated through context, redirecting to:', isAdmin ? '/admin' : '/dashboard');
      // Force navigation with replace to prevent back button from returning to login
      navigate(isAdmin ? '/admin' : '/dashboard', { replace: true });
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleLoginSubmit = async (email: string, password: string) => {
    setIsLoading(true);
    setLoginError(null);
    
    // Increased timeout to 30 seconds to prevent premature timeouts
    const loginTimeout = setTimeout(() => {
      console.log('Login operation timed out after 30 seconds');
      setIsLoading(false);
      setLoginError('Login timed out. Please try again.');
      toast.error('Login timed out. Please try again.');
    }, 30000); // Increased from 15s to 30s
    
    try {
      console.log('Attempting login with:', email);
      const success = await login(email, password);
      
      // Clear timeout since operation completed
      clearTimeout(loginTimeout);
      
      if (success) {
        console.log('Login successful!');
        toast.success('Login successful!');
        
        // Check if this is one of our admin emails
        const isAdminUser = email === 'admin@example.com' || email === 'admin@uptowngym.rw';
        
        // Determine if user should go to admin or dashboard
        const isAdminRedirect = isAdminUser || false;
        console.log('Admin redirect check:', { isAdminUser, isAdminRedirect });
        
        // Force navigation to admin dashboard for admin users
        const targetPath = isAdminRedirect ? '/admin' : '/dashboard';
        console.log('Forcing navigation to:', targetPath);
        
        // Immediate redirect for better user experience
        navigate(targetPath, { replace: true });
      } else {
        console.log('Login failed');
        setLoginError('Login failed. Please check your credentials.');
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      // Clear timeout since operation completed with error
      clearTimeout(loginTimeout);
      
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
