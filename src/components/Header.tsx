
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about-us' },
    { label: 'Services', path: '/services' },
    { label: 'Membership', path: '/membership' },
    { label: 'Classes', path: '/classes' },
    { label: 'Blogs', path: '/blogs' },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full',
        isScrolled ? 'bg-gym-dark shadow-lg py-2' : 'bg-transparent py-4'
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative h-12 w-32 flex items-center">
            <span className="text-white font-bold text-2xl">
              <span className="text-gym-orange">Uptown</span>Gym
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'nav-link text-white',
                isActive(item.path) ? 'active' : ''
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button isLink href="/login" variant="outline" size="sm">
            Login
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-gym-dark shadow-lg p-4 md:hidden animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'nav-link text-white',
                    isActive(item.path) ? 'active' : ''
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Button isLink href="/login" variant="primary" size="sm" className="w-full">
                Login
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
