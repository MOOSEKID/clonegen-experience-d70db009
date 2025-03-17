
import { Button } from '@/components/ui/button';

interface QuickLoginProps {
  onAdminLogin: () => void;
  onUserLogin: () => void;
  isLoading: boolean;
}

const QuickLogin = ({ onAdminLogin, onUserLogin, isLoading }: QuickLoginProps) => {
  return (
    <>
      <div className="my-4 flex items-center">
        <div className="flex-grow h-0.5 bg-gray-200"></div>
        <span className="px-4 text-sm text-gray-400">OR</span>
        <div className="flex-grow h-0.5 bg-gray-200"></div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button 
          type="button"
          variant="outline" 
          className="w-full" 
          onClick={onAdminLogin}
          disabled={isLoading}
        >
          Admin Login
        </Button>
        
        <Button 
          type="button"
          variant="outline" 
          className="w-full" 
          onClick={onUserLogin}
          disabled={isLoading}
        >
          User Login
        </Button>
      </div>
    </>
  );
};

export default QuickLogin;
