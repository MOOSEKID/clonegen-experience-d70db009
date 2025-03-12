
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import HeaderDropdown from './HeaderDropdown';
import { Button } from '../Button';
import { LucideIcon } from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon?: LucideIcon;
}

interface DesktopNavProps {
  navItems: NavItem[];
  serviceItems: { label: string; path: string }[];
  companyItems: { label: string; path: string }[];
  isServicesDropdownOpen: boolean;
  setIsServicesDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isCompanyDropdownOpen: boolean;
  setIsCompanyDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn?: boolean;
}

const DesktopNav = ({ 
  navItems, 
  serviceItems, 
  companyItems,
  isServicesDropdownOpen,
  setIsServicesDropdownOpen,
  isCompanyDropdownOpen,
  setIsCompanyDropdownOpen,
  isLoggedIn = false
}: DesktopNavProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isServiceActive = () => {
    return serviceItems.some(item => isActive(item.path));
  };

  const isCompanyActive = () => {
    return companyItems.some(item => isActive(item.path));
  };

  return (
    <>
      <nav className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'nav-link text-white/90 hover:text-white flex items-center gap-1',
              isActive(item.path) ? 'active' : ''
            )}
          >
            {item.icon && <item.icon size={18} />}
            {item.label}
          </Link>
        ))}

        <HeaderDropdown
          title="Services"
          items={serviceItems}
          isActive={isServiceActive()}
          isOpenState={[isServicesDropdownOpen, setIsServicesDropdownOpen]}
          className="services-dropdown"
        />

        <HeaderDropdown
          title="Company"
          items={companyItems}
          isActive={isCompanyActive()}
          isOpenState={[isCompanyDropdownOpen, setIsCompanyDropdownOpen]}
          className="company-dropdown"
        />
      </nav>

      <div className="hidden md:flex items-center space-x-4">
        {!isLoggedIn ? (
          <Button isLink href="/login" variant="outline" size="sm">
            Login
          </Button>
        ) : (
          <Button isLink href="/logout" variant="outline" size="sm" onClick={(e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('isAdmin');
            localStorage.removeItem('userEmail');
            document.cookie = "session_active=; path=/; max-age=0";
            document.cookie = "user_role=; path=/; max-age=0";
            window.location.href = '/login';
          }}>
            Logout
          </Button>
        )}
      </div>
    </>
  );
};

export default DesktopNav;
