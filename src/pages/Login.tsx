
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/Button';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      // If admin
      if (localStorage.getItem('isAdmin') === 'true') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [navigate]);

  // Admin credentials
  const adminCredentials = {
    email: 'mangana.mustafa@gmail.com',
    password: 'Uptown@250'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple validation
    if (!email || !password) {
      toast.error('Please fill in all fields');
      setIsLoading(false);
      return;
    }
    
    try {
      // Check if admin login
      if (email === adminCredentials.email && password === adminCredentials.password) {
        // Set admin authentication in localStorage
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', 'Admin');
        
        // Set persistent cookie
        document.cookie = "session_active=true; path=/; max-age=604800"; // 7 days
        document.cookie = "user_role=admin; path=/; max-age=604800";
        
        toast.success('Admin login successful!');
        
        // Navigate after a small delay to ensure toast appears
        setTimeout(() => {
          setIsLoading(false);
          navigate('/admin');
        }, 1000);
      } 
      // Regular user login
      else {
        // Set user authentication in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', email.split('@')[0]); // Set a default username
        
        // Set persistent cookie
        document.cookie = "session_active=true; path=/; max-age=604800"; // 7 days
        document.cookie = "user_role=user; path=/; max-age=604800";
        
        toast.success('Login successful!');
        
        // Navigate after a small delay to ensure toast appears and localStorage is set
        setTimeout(() => {
          setIsLoading(false);
          navigate('/dashboard');
        }, 1000);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="bg-gym-dark px-6 py-8 text-center">
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-300 mt-2">Sign in to access your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gym-orange focus:border-transparent"
              placeholder="Your email"
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <a href="#" className="text-sm text-gym-orange hover:underline">
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gym-orange focus:border-transparent"
              placeholder="Your password"
            />
          </div>
          
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-gym-orange border-gray-300 rounded focus:ring-gym-orange"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
          
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-gym-orange hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
