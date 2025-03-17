
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
import TermsAgreement from '@/components/auth/TermsAgreement';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get referrer from state or query parameter
  const from = location.state?.from || new URLSearchParams(location.search).get('redirect') || '/dashboard';
  
  // Check if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log('User already authenticated, redirecting to:', isAdmin ? '/admin' : '/dashboard');
      // Redirect based on user role
      navigate(isAdmin ? '/admin' : '/dashboard');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setErrorMessage('Please enter both email and password');
      return;
    }
    
    if (!termsAccepted) {
      setErrorMessage('Please accept the terms and conditions');
      return;
    }
    
    try {
      setIsLoading(true);
      setErrorMessage('');
      
      console.log('Attempting login with email:', email);
      const success = await login(email, password);
      
      if (success) {
        toast.success('Login successful');
        // Navigation will be handled by the useEffect
        console.log('Login successful, redirection will happen through useEffect');
      } else {
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAdminLogin = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      setTermsAccepted(true);
      
      console.log('Attempting admin login with default credentials');
      const success = await login('admin@example.com', 'admin123');
      
      if (success) {
        toast.success('Admin login successful');
        // Navigation is handled in login function
        console.log('Admin login successful');
      } else {
        setErrorMessage('Admin login failed. Please try again.');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Admin login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserLogin = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      setTermsAccepted(true);
      
      console.log('Attempting user login with default credentials');
      const success = await login('user@example.com', 'user123');
      
      if (success) {
        toast.success('User login successful');
        // Navigation is handled in login function
        console.log('User login successful');
      } else {
        setErrorMessage('User login failed. Please try again.');
      }
    } catch (error) {
      console.error('User login error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'User login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-gym-orange hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <TermsAgreement 
              accepted={termsAccepted}
              onChange={setTermsAccepted}
              disabled={isLoading}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-gym-orange hover:bg-gym-orange/90" 
              disabled={isLoading || !termsAccepted}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="my-4 flex items-center">
            <div className="flex-grow h-0.5 bg-gray-200"></div>
            <span className="px-4 text-sm text-gray-400">OR</span>
            <div className="flex-grow h-0.5 bg-gray-200"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleAdminLogin}
              disabled={isLoading}
            >
              Admin Login
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleUserLogin}
              disabled={isLoading}
            >
              User Login
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-gym-orange hover:underline font-medium"
            >
              Sign up
            </Link>
          </div>
          <div className="text-center text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="underline">Terms of Service</Link>{' '}
            and{' '}
            <Link to="/privacy" className="underline">Privacy Policy</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
