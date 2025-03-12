
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || document.cookie.includes('session_active=true');
    if (isLoggedIn) {
      const isAdmin = localStorage.getItem('isAdmin') === 'true' || document.cookie.includes('user_role=admin');
      navigate(isAdmin ? '/admin' : '/dashboard');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo login, would be replaced with real authentication
    let isAdmin = false;
    let username = "";
    
    if (email === 'admin@example.com' && password === 'admin123') {
      isAdmin = true;
      username = "Admin User";
    } else if (email === 'user@example.com' && password === 'user123') {
      isAdmin = false;
      username = "Regular User";
    } else {
      toast.error('Invalid credentials. Please try again.');
      return;
    }
    
    // Set login status in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('isAdmin', isAdmin ? 'true' : 'false');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', username);
    
    // Set cookies with expiry (30 days)
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);
    document.cookie = `session_active=true; path=/; expires=${expiryDate.toUTCString()}`;
    document.cookie = `user_role=${isAdmin ? 'admin' : 'user'}; path=/; expires=${expiryDate.toUTCString()}`;
    
    toast.success('Login successful! Redirecting...');
    
    // Navigate based on user role
    navigate(isAdmin ? '/admin' : from);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gym-dark">
      <Card className="w-full max-w-md p-6 bg-gym-darkblue text-white border border-white/10">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-white/70">Log in to access your account</p>
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
              required
              className="bg-gym-dark border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-white/90">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="bg-gym-dark border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-white/20 bg-gym-dark text-gym-orange focus:ring-gym-orange"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
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
          
          <Button type="submit" className="w-full bg-gym-orange hover:bg-gym-orange/90 text-white">
            Log in
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
