
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import RegisterForm from '@/components/auth/RegisterForm';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (email: string, password: string, fullName: string) => {
    try {
      setIsLoading(true);
      await signUp(email, password, fullName);
      toast.success('Account created successfully! Please check your email to verify your account.');
      navigate('/login');
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create account');
      throw error; // Re-throw to be handled by RegisterForm
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gym-dark pt-20">
      <Card className="w-full max-w-md p-6 bg-gym-darkblue text-white border border-white/10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
          <CardDescription className="text-center text-white/70">
            Enter your details to create a new account
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <RegisterForm onSignUp={handleSignUp} isLoading={isLoading} />
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-white/70">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-gym-orange hover:text-gym-orange/80 font-medium"
            >
              Sign in
            </Link>
          </div>
          <div className="text-center text-xs text-white/40">
            By signing up, you agree to our{' '}
            <Link to="/terms" className="underline hover:text-white/60">Terms of Service</Link>{' '}
            and{' '}
            <Link to="/privacy" className="underline hover:text-white/60">Privacy Policy</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
