
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import DesktopNav from './header/DesktopNav';
import MobileMenu from './header/MobileMenu';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      // No need to check the result since logout() should throw an error if it fails
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/01fa474e-e83a-48f4-9ffc-2047ca448aa7.png"
                alt="Uptown Gym Logo"
                className="h-10 w-auto"
              />
              <span className="ml-3 font-bold text-xl text-primary">
                Uptown Gym
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <DesktopNav user={user} onLogout={handleLogout} />

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">
                {isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              </span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={user}
        onLogout={handleLogout}
      />
    </header>
  );
};

export default Header;
