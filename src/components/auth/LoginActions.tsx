
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from './LoginForm';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface LoginActionsProps {
  loginError: string | null;
  isLoading: boolean;
  fallbackMode?: boolean;
  onLogin: (email: string, password: string) => Promise<void>;
  onAdminLogin?: () => void;
  onUserLogin?: () => void;
  onResetAuth?: () => void;
}

const LoginActions = ({
  loginError,
  isLoading,
  fallbackMode,
  onLogin,
  onAdminLogin,
  onUserLogin,
  onResetAuth
}: LoginActionsProps) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="bg-gym-dark text-white space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
        <CardDescription className="text-center text-gray-300">Sign in to your account</CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        {loginError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{loginError}</AlertDescription>
          </Alert>
        )}
        
        <LoginForm 
          onLogin={onLogin} 
          isLoading={isLoading} 
          fallbackMode={fallbackMode}
          onAdminLogin={onAdminLogin}
          onUserLogin={onUserLogin}
        />
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-4 bg-gray-50 p-6 border-t">
        <div className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-gym-orange font-semibold hover:underline">
            Sign up
          </Link>
        </div>
        
        <div className="text-center text-sm text-gray-600">
          <Link to="/forgot-password" className="text-gym-orange font-semibold hover:underline">
            Forgot password?
          </Link>
        </div>
        
        {onResetAuth && (
          <div className="flex justify-center">
            <Button
              onClick={onResetAuth}
              variant="outline"
              size="sm"
              className="text-xs text-gray-500"
            >
              Reset Authentication
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default LoginActions;
