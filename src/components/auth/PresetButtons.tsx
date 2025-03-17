
import { Button } from '@/components/ui/button';

interface PresetButtonsProps {
  onAdminLogin: () => void;
  onUserLogin: () => void;
  isLoading: boolean;
}

const PresetButtons = ({ onAdminLogin, onUserLogin, isLoading }: PresetButtonsProps) => {
  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Admin button clicked in PresetButtons component');
    onAdminLogin();
  };

  const handleUserClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('User button clicked in PresetButtons component');
    onUserLogin();
  };

  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      <Button 
        type="button" 
        variant="outline" 
        className="w-full border-white/20 hover:bg-gym-dark/50"
        onClick={handleAdminClick}
        disabled={isLoading}
      >
        Admin Login
      </Button>
      
      <Button 
        type="button" 
        variant="outline" 
        className="w-full border-white/20 hover:bg-gym-dark/50"
        onClick={handleUserClick}
        disabled={isLoading}
      >
        User Login
      </Button>
    </div>
  );
};

export default PresetButtons;
