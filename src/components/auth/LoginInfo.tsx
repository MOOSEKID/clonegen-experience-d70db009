
import { AlertCircle } from 'lucide-react';

interface LoginInfoProps {
  loginError: string | null;
}

const LoginInfo = ({ loginError }: LoginInfoProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
      <p className="text-white/70 text-center mb-4">Sign in to your account</p>
      
      {loginError && (
        <div className="bg-red-500/20 border border-red-600 text-white p-3 rounded-md flex items-start mb-4">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <span>{loginError}</span>
        </div>
      )}
    </div>
  );
};

export default LoginInfo;
