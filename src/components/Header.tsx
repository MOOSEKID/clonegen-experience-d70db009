
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import DesktopNav from './header/DesktopNav';
import MobileMenu from './header/MobileMenu';

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
    { label: 'Opening Times', path: '/opening-times' },
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

        <DesktopNav 
          navItems={navItems}
          serviceItems={serviceItems}
          companyItems={companyItems}
          isServicesDropdownOpen={isServicesDropdownOpen}
          setIsServicesDropdownOpen={setIsServicesDropdownOpen}
          isCompanyDropdownOpen={isCompanyDropdownOpen}
          setIsCompanyDropdownOpen={setIsCompanyDropdownOpen}
        />

        <button
          className="md:hidden text-white/90 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <MobileMenu 
          isOpen={isMenuOpen}
          navItems={navItems}
          serviceItems={serviceItems}
          companyItems={companyItems}
        />
      </div>
    </header>
  );
};

export default Header;
