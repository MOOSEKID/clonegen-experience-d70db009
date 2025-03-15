
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, ShoppingBag, User, LayoutDashboard } from 'lucide-react';
import { toast } from 'sonner';
import DesktopNav from './header/DesktopNav';
import MobileMenu from './header/MobileMenu';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleDashboardClick = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/dashboard' } });
      return;
    }
    navigate(isAdmin ? '/admin' : '/dashboard');
  };

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate('/login');
    }
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Membership', path: '/membership' },
    { label: 'Classes', path: '/classes' },
    { label: 'Blogs', path: '/blogs' },
    { label: 'Shop', path: '/shop', icon: ShoppingBag },
  ];

  const serviceItems = [
    { label: 'All Services', path: '/services' },
    { label: 'Fitness Facilities', path: '/services/fitness-facilities' },
    { label: 'Youth Programs', path: '/services/youth-programs' },
    { label: 'Spa & Wellness', path: '/services/spa-wellness' },
  ];

  const companyItems = [
    { label: 'About Us', path: '/about-us' },
    { label: 'Contact Us', path: '/contact-us' },
    { label: 'Timetable', path: '/timetable' },
    { label: 'Opening Times', path: '/opening-times' },
  ];
  
  const dashboardItem = { 
    label: 'Dashboard', 
    path: isAdmin ? '/admin' : '/dashboard', 
    icon: LayoutDashboard,
    action: handleDashboardClick
  };
  
  const authItems = isAuthenticated 
    ? [
        {
          label: 'Logout',
          path: '#',
          icon: User,
          action: handleLogout
        }
      ]
    : [
        {
          label: 'Login',
          path: '/login',
          icon: User
        }
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
          <div className="h-12 w-auto">
            <img 
              src="/lovable-uploads/50d3d473-1f3f-40d6-b895-c64a2e29ca1d.png" 
              alt="Uptown Gym Logo" 
              className="h-full w-auto object-contain"
            />
          </div>
        </Link>

        <DesktopNav 
          navItems={navItems}
          serviceItems={serviceItems}
          companyItems={companyItems}
          dashboardItem={dashboardItem}
          authItems={authItems}
          isServicesDropdownOpen={isServicesDropdownOpen}
          setIsServicesDropdownOpen={setIsServicesDropdownOpen}
          isCompanyDropdownOpen={isCompanyDropdownOpen}
          setIsCompanyDropdownOpen={setIsCompanyDropdownOpen}
          isLoggedIn={isAuthenticated}
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
          dashboardItem={dashboardItem}
          authItems={authItems}
          isLoggedIn={isAuthenticated}
        />
      </div>
    </header>
  );
};

export default Header;
