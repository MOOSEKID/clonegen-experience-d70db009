
import { Card } from '@/components/ui/card';
import LoginInfo from '@/components/auth/LoginInfo';
import LoginForm from '@/components/auth/LoginForm';
import PresetButtons from '@/components/auth/PresetButtons';
import ResetAuthButton from '@/components/auth/ResetAuthButton';

interface LoginActionsProps {
  loginError: string | null;
  isLoading: boolean;
  fallbackMode: boolean;
  onLogin: (email: string, password: string) => Promise<void>;
  onAdminLogin: () => void;
  onUserLogin: () => void;
  onResetAuth: () => void;
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
    <Card className="w-full max-w-md p-6 bg-gym-darkblue text-white border border-white/10">
      <LoginInfo loginError={loginError} />
      
      <LoginForm 
        onLogin={onLogin}
        isLoading={isLoading}
        fallbackMode={fallbackMode}
      />
      
      <PresetButtons 
        onAdminLogin={onAdminLogin}
        onUserLogin={onUserLogin}
        isLoading={isLoading}
      />
      
      <div className="mt-6 text-center text-sm text-white/70">
        Don't have an account?{' '}
        <a href="/signup" className="text-gym-orange hover:underline">
          Sign up
        </a>
      </div>
      
      <ResetAuthButton onReset={onResetAuth} fallbackMode={fallbackMode} />
    </Card>
  );
};

export default LoginActions;
