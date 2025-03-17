import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';
import PresetButtons from '@/components/auth/PresetButtons';
import LoginInfo from '@/components/auth/LoginInfo';
import { supabase } from '@/integrations/supabase/client';

// Fallback test credentials for when Supabase is unreachable
const TEST_CREDENTIALS = {
  'admin@example.com': { password: 'admin123', isAdmin: true },
  'user@example.com': { password: 'user123', isAdmin: false },
};

const Login = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fallbackMode, setFallbackMode] = useState(false); // New state to track fallback mode
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isAdmin } = useAuth();
  
  // Default redirect path (can be overridden by location state)
  const from = location.state?.from || '/dashboard';

  useEffect(() => {
    // Clear any previous errors
    setLoginError(null);
    
    // Check if Supabase is reachable
    const checkSupabaseConnection = async () => {
      try {
        console.log('Checking Supabase connection...');
        const { data, error } = await supabase.from('profiles').select('count').limit(1);
        
        if (error) {
          console.error('Supabase connection error:', error);
          setFallbackMode(true);
          console.log('Using fallback authentication mode');
        } else {
          console.log('Supabase connection successful');
          setFallbackMode(false);
        }
      } catch (error) {
        console.error('Failed to connect to Supabase:', error);
        setFallbackMode(true);
        console.log('Using fallback authentication mode due to connection error');
      }
    };
    
    checkSupabaseConnection();
    
    const checkAuthStatus = async () => {
      try {
        console.log('Checking authentication status in Login page');
        
        // If in fallback mode, check localStorage for fallback auth
        if (fallbackMode) {
          const fallbackAuth = localStorage.getItem('fallbackAuth');
          if (fallbackAuth) {
            const authData = JSON.parse(fallbackAuth);
            const targetPath = authData.isAdmin ? '/admin' : '/dashboard';
            console.log('Fallback auth found, redirecting to:', targetPath);
            navigate(targetPath, { replace: true });
            return;
          }
        }
        
        // Otherwise check Supabase session
        try {
          // Get the session directly from Supabase
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error("Error checking authentication status:", error);
            return;
          }
          
          if (session) {
            console.log('User is authenticated via Supabase, redirecting');
            
            // Check if user is admin by querying the profiles table
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('is_admin, role')
              .eq('id', session.user.id)
              .single();
              
            if (profileError) {
              console.error("Error fetching profile:", profileError);
              // Continue with redirect to dashboard as fallback
              navigate('/dashboard', { replace: true });
              return;
            }
            
            // Check if it's one of our admin users
            const userEmail = session.user.email;
            let userIsAdmin = profileData?.is_admin || false;
            
            // Explicitly check for the admin email addresses
            if (userEmail === 'admin@example.com' || userEmail === 'admin@uptowngym.rw') {
              userIsAdmin = true;
            }
            
            const redirectPath = userIsAdmin ? '/admin' : '/dashboard';
            
            // Force navigation with replace to prevent back button from returning to login
            navigate(redirectPath, { replace: true });
          }
        } catch (error) {
          console.error("Error in Supabase authentication check:", error);
          setFallbackMode(true);
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
  }, [isAuthenticated, isAdmin, navigate, fallbackMode]);

  const handleLoginSubmit = async (email: string, password: string) => {
    setIsLoading(true);
    setLoginError(null);
    
    try {
      console.log('Attempting login with:', email);
      
      // If in fallback mode or if Supabase connection fails, use test accounts directly
      if (fallbackMode) {
        console.log('Using fallback login method');
        const testAccount = TEST_CREDENTIALS[email as keyof typeof TEST_CREDENTIALS];
        
        if (testAccount && testAccount.password === password) {
          console.log('Test account login successful');
          
          // Store fallback auth in localStorage
          localStorage.setItem('fallbackAuth', JSON.stringify({
            email: email,
            isAdmin: testAccount.isAdmin,
            timestamp: new Date().toISOString()
          }));
          
          // Simulate redirect based on admin status
          const targetPath = testAccount.isAdmin ? '/admin' : '/dashboard';
          console.log('Redirecting to:', targetPath);
          navigate(targetPath, { replace: true });
          toast.success('Login successful! (Using fallback mode)');
        } else {
          console.log('Fallback login failed - invalid credentials');
          setLoginError('Login failed. Please check your credentials.');
          toast.error('Login failed. Please check your credentials.');
        }
        
        setIsLoading(false);
        return;
      }
      
      // Try to login with Supabase if not in fallback mode
      let success = false;
      
      try {
        success = await login(email, password);
      } catch (supabaseError) {
        console.error('Supabase login error:', supabaseError);
        
        // If Supabase is unreachable, use fallback for test accounts
        if (supabaseError.message?.includes('Failed to fetch')) {
          console.log('Supabase unreachable, trying fallback login');
          setFallbackMode(true);
          
          // Check if this is a test account
          const testAccount = TEST_CREDENTIALS[email as keyof typeof TEST_CREDENTIALS];
          if (testAccount && testAccount.password === password) {
            console.log('Test account login successful');
            
            // Store fallback auth in localStorage
            localStorage.setItem('fallbackAuth', JSON.stringify({
              email: email,
              isAdmin: testAccount.isAdmin,
              timestamp: new Date().toISOString()
            }));
            
            // Simulate redirect based on admin status
            const targetPath = testAccount.isAdmin ? '/admin' : '/dashboard';
            console.log('Redirecting to:', targetPath);
            navigate(targetPath, { replace: true });
            toast.success('Login successful! (Using fallback mode)');
            setIsLoading(false);
            return;
          }
        }
        
        // If it's not a test account or the password is wrong, show error
        setLoginError('Login failed. Please check your credentials.');
        toast.error('Login failed. Please check your credentials.');
        setIsLoading(false);
        return;
      }
      
      if (success) {
        console.log('Login successful!');
        toast.success('Login successful!');
        
        // Check if this is one of our admin emails
        const isAdminUser = email === 'admin@example.com' || email === 'admin@uptowngym.rw';
        
        // Force navigation to dashboard
        const targetPath = isAdminUser ? '/admin' : '/dashboard';
        console.log('Forcing navigation to:', targetPath);
        
        navigate(targetPath, { replace: true });
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
    console.log('Admin login button clicked');
    handleLoginSubmit('admin@example.com', 'admin123');
  };

  const handleUserLogin = () => {
    console.log('User login button clicked');
    handleLoginSubmit('user@example.com', 'user123');
  };

  const handleResetAuth = () => {
    console.log('Resetting authentication state');
    // Clear any localStorage fallback auth
    localStorage.removeItem('fallbackAuth');
    
    // Clear Supabase session
    supabase.auth.signOut().catch(error => {
      console.error('Error signing out from Supabase:', error);
    });
    
    // Clear local storage items that might be used for auth
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    // Clear cookies
    document.cookie = "session_active=; path=/; max-age=0";
    document.cookie = "user_role=; path=/; max-age=0";
    
    toast.success('Authentication has been reset');
    
    // Refresh the page to clear any in-memory auth state
    setTimeout(() => window.location.reload(), 1000);
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
        
        {/* Reset Authentication button */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleResetAuth}
            className="text-xs text-gym-orange hover:underline"
          >
            Reset Authentication
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
