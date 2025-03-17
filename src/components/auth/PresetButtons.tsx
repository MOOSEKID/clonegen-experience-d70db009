
import { Button } from '@/components/ui/button';
import { User, UserCog } from 'lucide-react';

interface PresetButtonsProps {
  onAdminLogin: () => void;
  onUserLogin: () => void;
  isLoading: boolean;
}

const PresetButtons = ({ onAdminLogin, onUserLogin, isLoading }: PresetButtonsProps) => {
  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Admin login button clicked');
    onAdminLogin();
  };

  const handleUserClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('User login button clicked');
    onUserLogin();
  };

  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      <Button 
        type="button" 
        variant="outline" 
        className="w-full border-white/20 hover:bg-gym-dark/50 flex items-center justify-center gap-2"
        onClick={handleAdminClick}
        disabled={isLoading}
      >
        <UserCog size={16} />
        Admin Login
      </Button>
      
      <Button 
        type="button" 
        variant="outline" 
        className="w-full border-white/20 hover:bg-gym-dark/50 flex items-center justify-center gap-2"
        onClick={handleUserClick}
        disabled={isLoading}
      >
        <User size={16} />
        User Login
      </Button>
    </div>
  );
};

export default PresetButtons;
