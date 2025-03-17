
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AuthUser } from '@/contexts/auth/types';

export interface DesktopNavProps {
  user: AuthUser | null;
  onLogout: () => Promise<void>;
}

const DesktopNav = ({ user, onLogout }: DesktopNavProps) => {
  const isLoggedIn = !!user;

  return (
    <nav className="hidden lg:flex items-center space-x-8">
      <div className="space-x-6">
        <Link
          to="/"
          className="text-gray-700 hover:text-gray-900 transition-colors"
        >
          Home
        </Link>
        <Link
          to="/classes"
          className="text-gray-700 hover:text-gray-900 transition-colors"
        >
          Classes
        </Link>
        <Link
          to="/trainers"
          className="text-gray-700 hover:text-gray-900 transition-colors"
        >
          Trainers
        </Link>
        <Link
          to="/about"
          className="text-gray-700 hover:text-gray-900 transition-colors"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="text-gray-700 hover:text-gray-900 transition-colors"
        >
          Contact
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link to={user.is_admin ? '/admin' : '/dashboard'}>
              <Button variant="outline">
                {user.is_admin ? 'Admin Dashboard' : 'Dashboard'}
              </Button>
            </Link>
            <Button variant="ghost" onClick={onLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default DesktopNav;
