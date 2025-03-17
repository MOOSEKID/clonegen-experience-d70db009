
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface ResetAuthButtonProps {
  onReset?: () => void;
  fallbackMode?: boolean;
}

const ResetAuthButton = ({ onReset, fallbackMode }: ResetAuthButtonProps) => {
  const handleResetAuth = () => {
    console.log('Resetting authentication state');
    
    // Clear localStorage fallback auth
    localStorage.removeItem('fallbackAuth');
    
    // Sign out from Supabase
    supabase.auth.signOut().catch(error => {
      console.error('Error signing out from Supabase:', error);
    });
    
    // Clear all localStorage auth items
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    // Clear session cookies
    document.cookie = "session_active=; path=/; max-age=0";
    document.cookie = "user_role=; path=/; max-age=0";
    
    toast.success('Authentication reset successful');
    
    // Call the onReset callback if provided
    if (onReset) {
      onReset();
    } else {
      // Reload page to clear memory state
      setTimeout(() => window.location.reload(), 500);
    }
  };

  return (
    <div className="mt-4 text-center">
      <button
        type="button"
        onClick={handleResetAuth}
        className="text-xs text-gym-orange hover:underline"
      >
        Reset Authentication
      </button>
      
      {fallbackMode && (
        <div className="mt-2 text-xs text-amber-400">
          ⚠️ Using test authentication mode - Supabase is unreachable
        </div>
      )}
    </div>
  );
};

export default ResetAuthButton;
