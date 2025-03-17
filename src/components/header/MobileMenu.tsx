
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AuthUser } from '@/contexts/auth/types';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: AuthUser | null;
  onLogout: () => Promise<void>;
}

const MobileMenu = ({ isOpen, onClose, user, onLogout }: MobileMenuProps) => {
  const isLoggedIn = !!user;

  if (!isOpen) return null;

  return (
    <div className="lg:hidden">
      <div className="fixed inset-0 z-40 bg-black bg-opacity-25" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white shadow-xl">
        <div className="flex flex-col h-full py-6 overflow-y-auto">
          <div className="px-4 mb-8">
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center"
            >
              <img
                src="/lovable-uploads/01fa474e-e83a-48f4-9ffc-2047ca448aa7.png"
                alt="Uptown Gym Logo"
                className="h-8 w-auto"
              />
              <span className="ml-3 font-bold text-xl text-primary">
                Uptown Gym
              </span>
            </Link>
          </div>
          
          <div className="flex-1 px-4 space-y-1">
            <Link
              to="/"
              onClick={onClose}
              className="block py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900 rounded-md px-3"
            >
              Home
            </Link>
            <Link
              to="/classes"
              onClick={onClose}
              className="block py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900 rounded-md px-3"
            >
              Classes
            </Link>
            <Link
              to="/trainers"
              onClick={onClose}
              className="block py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900 rounded-md px-3"
            >
              Trainers
            </Link>
            <Link
              to="/about"
              onClick={onClose}
              className="block py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900 rounded-md px-3"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={onClose}
              className="block py-2 text-base font-medium text-gray-900 hover:bg-gray-100 hover:text-gray-900 rounded-md px-3"
            >
              Contact
            </Link>
          </div>
          
          <div className="px-4 pt-4 border-t border-gray-200">
            {user ? (
              <div className="space-y-4">
                <Link
                  to={user.is_admin ? '/admin' : '/dashboard'}
                  onClick={onClose}
                  className="w-full"
                >
                  <Button className="w-full" variant="outline">
                    {user.is_admin ? 'Admin Dashboard' : 'Dashboard'}
                  </Button>
                </Link>
                <Button onClick={() => { onLogout(); onClose(); }} className="w-full" variant="ghost">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Link
                  to="/login"
                  onClick={onClose}
                  className="w-full"
                >
                  <Button className="w-full" variant="outline">
                    Login
                  </Button>
                </Link>
                <Link
                  to="/signup"
                  onClick={onClose}
                  className="w-full"
                >
                  <Button className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
