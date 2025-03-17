import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { signIn, isAuthenticated, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get referrer from state or query parameter, ensure it works with base URL
  const from = location.state?.from || 
    new URLSearchParams(location.search).get('redirect') || 
    (import.meta.env.PROD ? '/clonegen-experience/dashboard' : '/dashboard');
  
  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log('User authenticated, redirecting to:', from);
      // Redirect based on saved path or user role
      const basePath = import.meta.env.PROD ? '/clonegen-experience' : '';
      navigate(from || (isAdmin ? `${basePath}/admin/trainers` : `${basePath}/dashboard`), { replace: true });
    }
  }, [isAuthenticated, isAdmin, navigate, from]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setErrorMessage('Please enter both email and password');
      return;
    }

    // Validate staff email format
    if (email.endsWith('@uptowngym.rw') && email !== 'admin@uptowngym.rw') {
      const [prefix] = email.split('@');
      const parts = prefix.split('.');
      
      if (parts.length < 2) {
        setErrorMessage('Invalid staff email format. Expected: role.name@uptowngym.rw');
        return;
      }

      const [role] = parts;
      const validRoles = [
        'general.manager', 'operations.manager', 'fitness.manager',
        'head.trainer', 'senior.trainer', 'trainer', 'trainee',
        'supervisor', 'receptionist', 'membership', 'nutritionist', 'physio',
        'maintenance.supervisor', 'maintenance', 'cleaner'
      ];

      if (!validRoles.some(validRole => role.startsWith(validRole))) {
        setErrorMessage('Invalid role prefix in email');
        return;
      }
    }
    
    try {
      setErrorMessage('');
      await signIn(email, password);
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Login failed');
      toast.error('Login failed. Please check your credentials.');
    }
  };
  
  const handleAdminLogin = async () => {
    try {
      setErrorMessage('');
      // Use the admin password from .env
      const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin@123';
      await signIn('admin@uptowngym.rw', adminPassword);
    } catch (error) {
      console.error('Admin login error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Admin login failed');
      toast.error('Admin login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gym-dark pt-20">
      <Card className="w-full max-w-md p-6 bg-gym-darkblue text-white border border-white/10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
          <CardDescription className="text-center text-white/70">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <Alert variant="destructive" className="mb-4 bg-red-900/20 text-red-400 border-red-900">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                <Input
                  id="email"
                  type="email"
                  placeholder="role.name@uptowngym.rw"
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-gym-orange hover:text-gym-orange/80"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-white/5 border-white/10 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gym-orange hover:bg-gym-orange/90" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="my-4 flex items-center">
            <div className="flex-grow h-0.5 bg-white/10"></div>
            <span className="px-4 text-sm text-white/40">OR</span>
            <div className="flex-grow h-0.5 bg-white/10"></div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full border-white/10 text-white hover:bg-white/5" 
            onClick={handleAdminLogin}
            disabled={isLoading}
          >
            Admin Login
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-white/70">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-gym-orange hover:text-gym-orange/80 font-medium"
            >
              Sign up
            </Link>
          </div>
          <div className="text-center text-xs text-white/40">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="underline hover:text-white/60">Terms of Service</Link>{' '}
            and{' '}
            <Link to="/privacy" className="underline hover:text-white/60">Privacy Policy</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
