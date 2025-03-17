
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import TermsAgreement from '@/components/auth/TermsAgreement';

interface LoginInputFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  termsAccepted: boolean;
  setTermsAccepted: (accepted: boolean) => void;
  errorMessage: string;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

const LoginInputForm = ({
  email,
  setEmail,
  password,
  setPassword,
  termsAccepted,
  setTermsAccepted,
  errorMessage,
  isLoading,
  onSubmit
}: LoginInputFormProps) => {
  return (
    <>
      {errorMessage && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="email"
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link 
              to="/forgot-password" 
              className="text-sm text-gym-orange hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
        
        <TermsAgreement 
          accepted={termsAccepted}
          onChange={setTermsAccepted}
          disabled={isLoading}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-gym-orange hover:bg-gym-orange/90" 
          disabled={isLoading || !termsAccepted}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </>
  );
};

export default LoginInputForm;
