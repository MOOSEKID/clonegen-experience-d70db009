
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import TermsAgreement from '@/components/auth/TermsAgreement';

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
}

const LoginForm = ({ onLogin, isLoading }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Email validation
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    if (!termsAccepted) {
      toast.error('Please accept the terms and conditions');
      return;
    }
    
    try {
      console.log('Form submitted, calling onLogin with:', email);
      await onLogin(email, password);
    } catch (error) {
      console.error('Error in form submission:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
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
      
      <TermsAgreement 
        accepted={termsAccepted}
        onChange={setTermsAccepted}
        disabled={isLoading}
      />
      
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
          <a href="/forgot-password" className="text-gym-orange hover:underline">
            Forgot password?
          </a>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gym-orange hover:bg-gym-orange/90 text-white"
        disabled={isLoading || !termsAccepted}
      >
        {isLoading ? 'Signing in...' : 'Log in'}
      </Button>
    </form>
  );
};

export default LoginForm;
