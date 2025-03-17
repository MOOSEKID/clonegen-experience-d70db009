
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import LoginInputForm from '@/components/auth/LoginInputForm';
import QuickLogin from '@/components/auth/QuickLogin';
import LoginFooter from '@/components/auth/LoginFooter';

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
          <LoginInputForm 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
            errorMessage={errorMessage}
            isLoading={isLoading}
            onSubmit={handleLogin}
          />
          
          <QuickLogin 
            onAdminLogin={handleAdminLogin}
            onUserLogin={handleUserLogin}
            isLoading={isLoading}
          />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <LoginFooter />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
