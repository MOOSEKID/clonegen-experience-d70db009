
import { useState } from 'react';
import { User, Mail, Lock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

// Simple validation function
const validateForm = (
  fullName: string, 
  email: string, 
  password: string, 
  confirmPassword: string, 
  acceptTerms: boolean
): string | null => {
  if (!fullName.trim()) return 'Full name is required';
  if (!email.trim()) return 'Email is required';
  if (!/^\S+@\S+\.\S+$/.test(email)) return 'Please enter a valid email address';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (password !== confirmPassword) return 'Passwords do not match';
  if (!acceptTerms) return 'You must accept the terms and conditions';
  return null;
};

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    const validationError = validateForm(fullName, email, password, confirmPassword, acceptTerms);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
    
    try {
      setIsLoading(true);
      setErrorMessage('');
      
      console.log('Attempting to register user:', email);
      const success = await signUp(email, password, fullName);
      
      if (success) {
        toast.success('Registration successful! Please check your email to confirm your account.');
        
        // Redirect to login page with success message
        navigate('/login', { 
          state: { 
            message: 'Registration successful! Please check your email to confirm your account.' 
          } 
        });
        
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setErrorMessage('Registration failed. Please try again.');
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Registration failed');
      toast.error(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      {errorMessage && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="fullName"
            placeholder="John Doe"
            className="pl-10"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="registerEmail">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="registerEmail"
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
        <Label htmlFor="registerPassword">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="registerPassword"
            type="password"
            placeholder="••••••••"
            className="pl-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <p className="text-xs text-gray-500">
          Password must be at least 8 characters long
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            className="pl-10"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="terms"
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.target.checked)}
          disabled={isLoading}
          className="h-4 w-4 rounded border-gray-300 text-gym-orange focus:ring-gym-orange"
        />
        <Label htmlFor="terms" className="text-sm text-gray-600">
          I agree to the Terms of Service and Privacy Policy
        </Label>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-gym-orange hover:bg-gym-orange/90" 
        disabled={isLoading}
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegisterForm;
