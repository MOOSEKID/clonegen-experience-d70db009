
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Mock login - would connect to auth service in real app
    toast.success('Login successful!');
    console.log('Login attempt with:', { email });
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
          
          <Button type="submit" className="w-full">
            Sign In
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
