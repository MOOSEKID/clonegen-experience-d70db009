
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    if (!termsAccepted) {
      toast.error('Please accept the terms and conditions');
      return;
    }
    
    try {
      setIsLoading(true);
      const success = await login(email, password);
      
      if (success) {
        toast.success('Login successful');
        navigate('/dashboard');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAdminLogin = async () => {
    try {
      setIsLoading(true);
      setTermsAccepted(true);
      
      const success = await login('admin@example.com', 'admin123');
      
      if (success) {
        toast.success('Admin login successful');
        navigate('/admin');
      } else {
        toast.error('Admin login failed. Please try again.');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      toast.error(error instanceof Error ? error.message : 'Admin login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserLogin = async () => {
    try {
      setIsLoading(true);
      setTermsAccepted(true);
      
      const success = await login('user@example.com', 'user123');
      
      if (success) {
        toast.success('User login successful');
        navigate('/dashboard');
      } else {
        toast.error('User login failed. Please try again.');
      }
    } catch (error) {
      console.error('User login error:', error);
      toast.error(error instanceof Error ? error.message : 'User login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gym-dark p-4">
      <Card className="w-full max-w-md bg-gym-darkblue text-white border border-white/10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
          <CardDescription className="text-center text-white/70">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90">Email</Label>
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
              <Label htmlFor="password" className="text-white/90">Password</Label>
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
                  onClick={() => setShowPassword(!showPassword)}
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
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={termsAccepted} 
                onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                disabled={isLoading} 
                className="bg-gym-dark border-white/20 data-[state=checked]:bg-gym-orange" 
              />
              <Label htmlFor="terms" className="text-sm text-white/70">
                I agree to the terms of service and privacy policy
              </Label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  className="bg-gym-dark border-white/20 data-[state=checked]:bg-gym-orange" 
                />
                <Label htmlFor="remember" className="text-sm text-white/70">
                  Remember me
                </Label>
              </div>
              
              <a href="#" className="text-sm text-gym-orange hover:underline">
                Forgot password?
              </a>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gym-orange hover:bg-gym-orange/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gym-darkblue px-2 text-white/50">Or continue with</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleAdminLogin}
              disabled={isLoading}
              className="border-white/20 text-white hover:bg-gym-dark/50"
            >
              Admin Demo
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleUserLogin}
              disabled={isLoading}
              className="border-white/20 text-white hover:bg-gym-dark/50"
            >
              User Demo
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-white/70">
            Don't have an account?{' '}
            <a href="/register" className="text-gym-orange hover:underline">
              Sign up
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
