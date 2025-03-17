import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import LoginActions from '@/components/auth/LoginActions';
import { supabase } from '@/lib/supabase';

const Login = () => {
  const { login, isAuthenticated, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Force create admin user if it doesn't exist
  useEffect(() => {
    const createAdminIfNeeded = async () => {
      try {
        // Check if admin exists in profiles
        const { data: adminUsers, error: searchError } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', 'admin@uptowngym.rw')
          .eq('is_admin', true)
          .maybeSingle();
        
        if (searchError) console.error('Error checking for admin:', searchError);
        
        // If admin doesn't exist and we're in development mode, create one
        if (!adminUsers && process.env.NODE_ENV === 'development') {
          console.log('No admin found, attempting to create default admin account');
          
          // Create admin in auth
          const { data: adminAuth, error: adminAuthError } = await supabase.auth.signUp({
            email: 'admin@uptowngym.rw',
            password: 'Admin123!',
            options: {
              data: {
                full_name: 'System Administrator'
              }
            }
          });
          
          if (adminAuthError) {
            console.error('Error creating admin auth account:', adminAuthError);
          } else {
            console.log('Default admin account created successfully');
          }
        }
      } catch (error) {
        console.error('Error in createAdminIfNeeded:', error);
      }
    };

    createAdminIfNeeded();
  }, []);
  
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
