
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

// Updated demo user data with clear admin credentials - in a real app, this would come from a database
const DEMO_USERS = [
  { email: 'admin@example.com', password: 'admin123', isAdmin: true, name: 'Admin User' },
  { email: 'user@example.com', password: 'user123', isAdmin: false, name: 'Regular User' },
  { email: 'john@example.com', password: 'john123', isAdmin: false, name: 'John Doe' },
  { email: 'jane@example.com', password: 'jane123', isAdmin: false, name: 'Jane Smith' },
  { email: 'test@example.com', password: 'test123', isAdmin: false, name: 'Test User' }
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/dashboard';

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || document.cookie.includes('session_active=true');
    if (isLoggedIn) {
      const isAdmin = localStorage.getItem('isAdmin') === 'true' || document.cookie.includes('user_role=admin');
      // Redirect based on user role
      navigate(isAdmin ? '/admin' : '/dashboard');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Find user in demo data
    const user = DEMO_USERS.find(user => user.email === email && user.password === password);
    
    if (user) {
      // Set login status in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('isAdmin', user.isAdmin ? 'true' : 'false');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', user.name);
      
      // Set cookies with expiry (30 days)
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);
      document.cookie = `session_active=true; path=/; expires=${expiryDate.toUTCString()}`;
      document.cookie = `user_role=${user.isAdmin ? 'admin' : 'user'}; path=/; expires=${expiryDate.toUTCString()}`;
      
      console.log('Login successful!', { 
        isAdmin: user.isAdmin, 
        cookies: document.cookie,
        localStorage: {
          isLoggedIn: localStorage.getItem('isLoggedIn'),
          isAdmin: localStorage.getItem('isAdmin'),
          userEmail: localStorage.getItem('userEmail'),
          userName: localStorage.getItem('userName')
        }
      });
      
      toast.success('Login successful! Redirecting...');
      
      // Navigate based on user role
      navigate(user.isAdmin ? '/admin' : from);
    } else {
      // Provide more helpful error message
      if (email === '' || password === '') {
        toast.error('Please enter both email and password');
      } else if (DEMO_USERS.some(user => user.email === email)) {
        toast.error('Incorrect password. Please try again.');
      } else {
        toast.error('Invalid credentials. For demo, try: admin@example.com / admin123');
      }
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
                required
                className="bg-gym-dark border-white/20 text-white placeholder:text-white/50 pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white focus:outline-none"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
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
