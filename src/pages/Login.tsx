
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
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isAdmin } = useAuth();
  const from = location.state?.from || '/dashboard';

  useEffect(() => {
    // Check if user is already logged in
    if (isAuthenticated) {
      // Redirect based on user role
      navigate(isAdmin ? '/admin' : '/dashboard');
    }
  }, [navigate, isAuthenticated, isAdmin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Email validation
      if (!email || !password) {
        toast.error('Please enter both email and password');
        setIsLoading(false);
        return;
      }
      
      const success = await login(email, password);
      
      if (success) {
        // Navigate after successful login
        // The destination will be determined by isAdmin in the useEffect
        console.log('Login successful! Redirecting...');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gym-dark">
      <Card className="w-full max-w-md p-6 bg-gym-darkblue text-white border border-white/10">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-white/70">Log in to access your account</p>
          <div className="mt-4 p-3 bg-gym-orange/10 rounded-md border border-gym-orange/20">
            <p className="text-sm font-medium text-gym-orange">Admin Login: admin@example.com / admin123</p>
            <p className="text-sm text-white/70 mt-1">User Login: user@example.com / user123</p>
          </div>
        </div>
        
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
