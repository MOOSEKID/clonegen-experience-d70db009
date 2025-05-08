
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ErrorBoundary } from './ui/error-boundary';
import { useHeaderState } from '@/hooks/useHeaderState';
import { 
  getNavItems, 
  getServiceItems, 
  getCompanyItems, 
  getDashboardItem, 
  getAuthItems 
} from '@/data/headerNavData';

// Import components
import DesktopNav from './header/DesktopNav';
import MobileMenu from './header/MobileMenu';
import Logo from './header/Logo';

const Header = () => {
  const {
    isScrolled,
    isMenuOpen,
    setIsMenuOpen,
    isCompanyDropdownOpen,
    setIsCompanyDropdownOpen,
    isServicesDropdownOpen,
    setIsServicesDropdownOpen,
    isAuthenticated,
    handleDashboardClick,
    handleLogout
  } = useHeaderState();

  // Get navigation data
  const navItems = getNavItems();
  const serviceItems = getServiceItems();
  const companyItems = getCompanyItems();
  const dashboardItem = getDashboardItem(handleDashboardClick);
  const authItems = getAuthItems(isAuthenticated, handleLogout);

  return (
    <ErrorBoundary>
      <header 
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full',
          isScrolled ? 'bg-gym-darkblue shadow-lg py-2' : 'bg-gym-dark/90 backdrop-blur-md py-4'
        )}
      >
        <div className="container-custom flex items-center justify-between">
          <Logo />

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
