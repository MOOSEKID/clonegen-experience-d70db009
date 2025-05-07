
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, ShoppingBag, User, LayoutDashboard } from 'lucide-react';
import { toast } from 'sonner';
import DesktopNav from './header/DesktopNav';
import MobileMenu from './header/MobileMenu';
import { useAuth } from '@/hooks/useAuth';
import { ErrorBoundary } from './ui/error-boundary';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Safely access auth context with default values
  const auth = (() => {
    try {
      return useAuth();
    } catch (error) {
      console.error("Auth context not available yet:", error);
      return {
        isAuthenticated: false,
        isAdmin: false,
        logout: async () => false
      };
    }
  })();
  
  const { isAuthenticated, isAdmin, logout } = auth;

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
    if (isLoggingOut) return; // Prevent multiple clicks
    
    try {
      setIsLoggingOut(true);
      console.log("Header: Initiating logout process");
      
      const success = await logout();
      
      if (success) {
        console.log("Header: Logout successful, redirecting to login");
        // Add a small delay before navigation to ensure state is updated
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 150);
      } else {
        console.error("Header: Logout was unsuccessful");
        toast.error("There was an issue during logout. Please try again.");
      }
    } catch (error) {
      console.error("Header: Error during logout:", error);
      toast.error("Failed to log out. Please try again.");
    } finally {
      setIsLoggingOut(false);
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
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};

export default Header;
