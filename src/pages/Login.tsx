
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError(null);
    
    try {
      // Email validation
      if (!email || !password) {
        setLoginError('Please enter both email and password');
        toast.error('Please enter both email and password');
        setIsLoading(false);
        return;
      }
      
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

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleAdminLogin = async () => {
    setEmail('admin@example.com');
    setPassword('admin123');
    // Submit form after setting credentials
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }, 100);
  };

  const handleUserLogin = async () => {
    setEmail('user@example.com');
    setPassword('user123');
    // Submit form after setting credentials
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }, 100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gym-dark pt-20">
      <Card className="w-full max-w-md p-6 bg-gym-darkblue text-white border border-white/10">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-white/70">Log in to access your account</p>
          <div className="mt-4 p-3 bg-gym-orange/10 rounded-md border border-gym-orange/20">
            <p className="text-sm font-medium text-gym-orange">Admin Login: admin@example.com / admin123</p>
            <p className="text-sm text-white/70 mt-1">User Login: user@example.com / user123</p>
          </div>
        </div>
        
        {loginError && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded text-white text-sm">
            {loginError}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-white/90">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={isLoading}
              required
              className="bg-gym-dark border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-white/90">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
                required
                className="bg-gym-dark border-white/20 text-white placeholder:text-white/50 pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white focus:outline-none"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-white/20 bg-gym-dark text-gym-orange focus:ring-gym-orange"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-white/70">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <a href="#" className="text-gym-orange hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gym-orange hover:bg-gym-orange/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Log in'}
          </Button>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full border-white/20 hover:bg-gym-dark/50"
              onClick={handleAdminLogin}
              disabled={isLoading}
            >
              Admin Login
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full border-white/20 hover:bg-gym-dark/50"
              onClick={handleUserLogin}
              disabled={isLoading}
            >
              User Login
            </Button>
          </div>
        </form>
        
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
