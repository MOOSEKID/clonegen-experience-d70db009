import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown, Building, Dumbbell } from 'lucide-react';
import { Button } from './Button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
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
    setIsMenuOpen(false);
    setIsCompanyDropdownOpen(false);
    setIsServicesDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.company-dropdown') && isCompanyDropdownOpen) {
        setIsCompanyDropdownOpen(false);
      }
      if (!target.closest('.services-dropdown') && isServicesDropdownOpen) {
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCompanyDropdownOpen, isServicesDropdownOpen]);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about-us' },
    { label: 'Membership', path: '/membership' },
    { label: 'Classes', path: '/classes' },
    { label: 'Blogs', path: '/blogs' },
  ];

  const serviceItems = [
    { label: 'All Services', path: '/services' },
    { label: 'Fitness Facilities', path: '/services/fitness-facilities' },
    { label: 'Youth Programs', path: '/services/youth-programs' },
    { label: 'Spa & Wellness', path: '/services/spa-wellness' },
  ];

  const companyItems = [
    { label: 'Contact Us', path: '/contact-us' },
    { label: 'Timetable', path: '/timetable' },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full',
        isScrolled ? 'bg-gym-darkblue shadow-lg py-2' : 'bg-gym-dark/90 backdrop-blur-md py-4'
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

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'nav-link text-white/90 hover:text-white',
                isActive(item.path) ? 'active' : ''
              )}
            >
              {item.label}
            </Link>
          ))}

          <div className="services-dropdown relative">
            <button
              onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
              className={cn(
                'nav-link text-white/90 hover:text-white flex items-center',
                (isActive('/services')) ? 'active' : ''
              )}
            >
              <span>Services</span>
              <ChevronDown size={16} className="ml-1" />
            </button>

            {isServicesDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-gym-darkblue rounded-md shadow-lg overflow-hidden z-50 animate-fade-in border border-gym-dark/20">
                {serviceItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'block px-4 py-3 text-white/80 hover:text-white hover:bg-gym-dark/50 transition-colors',
                      isActive(item.path) ? 'bg-gym-dark/50 text-white' : ''
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="company-dropdown relative">
            <button
              onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
              className={cn(
                'nav-link text-white/90 hover:text-white flex items-center',
                (isActive('/contact-us') || isActive('/timetable')) ? 'active' : ''
              )}
            >
              <span>Company</span>
              <ChevronDown size={16} className="ml-1" />
            </button>

            {isCompanyDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-gym-darkblue rounded-md shadow-lg overflow-hidden z-50 animate-fade-in border border-gym-dark/20">
                {companyItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      'block px-4 py-3 text-white/80 hover:text-white hover:bg-gym-dark/50 transition-colors',
                      isActive(item.path) ? 'bg-gym-dark/50 text-white' : ''
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button isLink href="/login" variant="outline" size="sm">
            Login
          </Button>
        </div>

        <button
          className="md:hidden text-white/90 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-gym-darkblue shadow-lg p-4 md:hidden animate-fade-in">
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
              
              <div className="py-2 border-t border-white/10">
                <div className="flex items-center mb-2 text-white/90">
                  <Dumbbell size={16} className="mr-2" />
                  <span className="font-medium">Services</span>
                </div>
                <div className="space-y-3 pl-6">
                  {serviceItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        'block text-white/80 hover:text-white transition-colors',
                        isActive(item.path) ? 'text-white font-medium' : ''
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="py-2 border-t border-white/10">
                <div className="flex items-center mb-2 text-white/90">
                  <Building size={16} className="mr-2" />
                  <span className="font-medium">Company</span>
                </div>
                <div className="space-y-3 pl-6">
                  {companyItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        'block text-white/80 hover:text-white transition-colors',
                        isActive(item.path) ? 'text-white font-medium' : ''
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              
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
