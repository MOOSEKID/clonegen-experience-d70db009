import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, ShoppingBag, User, LayoutDashboard, LogOut, Settings } from 'lucide-react';
import DesktopNav from './header/DesktopNav';
import MobileMenu from './header/MobileMenu';
import { useAuth } from '@/contexts/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const { user, isAdmin, signOut } = useAuth();
  const isLoggedIn = !!user;

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
    if (!isLoggedIn) {
      navigate('/login', { state: { from: '/dashboard' } });
      return;
    }
    navigate(isAdmin ? '/admin' : '/dashboard');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
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
  
  const authItems = isLoggedIn 
    ? [
        {
          label: 'Profile',
          path: '/profile',
          icon: User,
        },
        {
          label: 'Logout',
          path: '/logout',
          icon: LogOut,
          action: handleSignOut
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
          isLoggedIn={isLoggedIn}
        />

        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="h-8 w-8 ring-2 ring-white/20">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gym-orange text-white">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDashboardClick}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link 
              to="/login"
              className="bg-gym-orange hover:bg-gym-orange/90 text-white px-4 py-2 rounded-full font-medium transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>

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
          isLoggedIn={isLoggedIn}
        />
      </div>
    </header>
  );
};

export default Header;
