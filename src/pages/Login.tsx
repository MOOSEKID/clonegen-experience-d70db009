
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';
import PresetButtons from '@/components/auth/PresetButtons';
import LoginInfo from '@/components/auth/LoginInfo';
import { supabase } from '@/integrations/supabase/client';

// Test credentials for when Supabase is unreachable
const TEST_CREDENTIALS = {
  'admin@example.com': { password: 'admin123', isAdmin: true },
  'user@example.com': { password: 'user123', isAdmin: false },
};

const Login = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fallbackMode, setFallbackMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isAdmin } = useAuth();
  
  // Default redirect path
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
          toast.warning('Using test authentication mode - Supabase is unreachable');
        } else {
          console.log('Supabase connection successful');
          setFallbackMode(false);
        }
      } catch (error) {
        console.error('Failed to connect to Supabase:', error);
        setFallbackMode(true);
        toast.warning('Using test authentication mode - Supabase is unreachable');
      }
    };
    
    checkSupabaseConnection();
    
    // Check if user is already authenticated
    const checkAuthStatus = async () => {
      try {
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
        
        // Check Supabase session if not in fallback mode
        if (!fallbackMode) {
          const { data: { session }, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error("Error checking session:", error);
            setFallbackMode(true);
            return;
          }
          
          if (session) {
            console.log('User authenticated via Supabase:', session.user.email);
            
            // Get user role from profiles table
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('is_admin, role')
              .eq('id', session.user.id)
              .single();
              
            if (profileError && profileError.code !== 'PGRST116') {
              console.error("Error fetching profile:", profileError);
              navigate('/dashboard', { replace: true });
              return;
            }
            
            // Special handling for admin emails
            const userEmail = session.user.email;
            let userIsAdmin = profileData?.is_admin || false;
            
            if (userEmail === 'admin@example.com' || userEmail === 'admin@uptowngym.rw') {
              userIsAdmin = true;
              
              // Ensure profile has admin role
              if (!profileData || !profileData.is_admin) {
                await supabase
                  .from('profiles')
                  .upsert({ 
                    id: session.user.id, 
                    is_admin: true, 
                    role: 'admin' 
                  });
              }
            }
            
            const redirectPath = userIsAdmin ? '/admin' : '/dashboard';
            navigate(redirectPath, { replace: true });
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setFallbackMode(true);
      }
    };
    
    checkAuthStatus();
    
    // Also check context authentication
    if (isAuthenticated) {
      console.log('User authenticated through context, redirecting');
      navigate(isAdmin ? '/admin' : '/dashboard', { replace: true });
    }
  }, [isAuthenticated, isAdmin, navigate, fallbackMode]);

  const handleLoginSubmit = async (email: string, password: string) => {
    setIsLoading(true);
    setLoginError(null);
    
    try {
      console.log('Login attempt with:', email);
      
      // Handle fallback mode authentication
      if (fallbackMode) {
        console.log('Using fallback authentication mode');
        const testAccount = TEST_CREDENTIALS[email as keyof typeof TEST_CREDENTIALS];
        
        if (testAccount && testAccount.password === password) {
          console.log('Test account login successful');
          
          // Store auth info in localStorage
          localStorage.setItem('fallbackAuth', JSON.stringify({
            email: email,
            isAdmin: testAccount.isAdmin,
            timestamp: new Date().toISOString()
          }));
          
          // Redirect based on admin status
          const targetPath = testAccount.isAdmin ? '/admin' : '/dashboard';
          toast.success('Login successful (Test Mode)');
          navigate(targetPath, { replace: true });
        } else {
          console.log('Test login failed - invalid credentials');
          setLoginError('Invalid email or password');
          toast.error('Login failed. Please check your credentials.');
        }
        
        setIsLoading(false);
        return;
      }
      
      // Try Supabase login
      try {
        console.log('Attempting Supabase login');
        const success = await login(email, password);
        
        if (success) {
          console.log('Supabase login successful');
          toast.success('Login successful!');
          
          // Special handling for known admin emails
          const isAdminUser = email === 'admin@example.com' || email === 'admin@uptowngym.rw';
          
          // Force navigation to correct dashboard
          const targetPath = isAdminUser ? '/admin' : '/dashboard';
          navigate(targetPath, { replace: true });
        } else {
          console.log('Supabase login failed');
          setLoginError('Invalid email or password');
          toast.error('Login failed. Please check your credentials.');
        }
      } catch (error) {
        console.error('Supabase login error:', error);
        
        // If Supabase is unreachable, try fallback for test accounts
        if (error instanceof Error && error.message?.includes('Failed to fetch')) {
          setFallbackMode(true);
          
          // Check if this is a test account
          const testAccount = TEST_CREDENTIALS[email as keyof typeof TEST_CREDENTIALS];
          if (testAccount && testAccount.password === password) {
            console.log('Fallback to test account successful');
            
            localStorage.setItem('fallbackAuth', JSON.stringify({
              email: email,
              isAdmin: testAccount.isAdmin,
              timestamp: new Date().toISOString()
            }));
            
            toast.success('Login successful (Fallback Mode)');
            const targetPath = testAccount.isAdmin ? '/admin' : '/dashboard';
            navigate(targetPath, { replace: true });
            setIsLoading(false);
            return;
          }
        }
        
        setLoginError('Login failed. Please check your credentials.');
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(error instanceof Error ? error.message : 'Login failed');
      toast.error('Login failed. An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = () => {
    console.log('Admin login clicked');
    handleLoginSubmit('admin@example.com', 'admin123');
  };

  const handleUserLogin = () => {
    console.log('User login clicked');
    handleLoginSubmit('user@example.com', 'user123');
  };

  const handleResetAuth = () => {
    console.log('Resetting authentication state');
    
    // Clear localStorage fallback auth
    localStorage.removeItem('fallbackAuth');
    
    // Sign out from Supabase
    supabase.auth.signOut().catch(error => {
      console.error('Error signing out from Supabase:', error);
    });
    
    // Clear all localStorage auth items
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    // Clear session cookies
    document.cookie = "session_active=; path=/; max-age=0";
    document.cookie = "user_role=; path=/; max-age=0";
    
    toast.success('Authentication reset successful');
    
    // Reload page to clear memory state
    setTimeout(() => window.location.reload(), 500);
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
          
          {fallbackMode && (
            <div className="mt-2 text-xs text-amber-400">
              ⚠️ Using test authentication mode - Supabase is unreachable
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Login;
