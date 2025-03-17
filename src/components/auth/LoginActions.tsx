
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from './LoginForm';
import { Button } from '@/components/ui/button';

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
          <div className="mb-4 p-3 text-sm bg-red-100 border border-red-300 text-red-700 rounded-md">
            {loginError}
          </div>
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
