
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
}

const DesktopNav = ({ 
  navItems, 
  serviceItems, 
  companyItems,
  isServicesDropdownOpen,
  setIsServicesDropdownOpen,
  isCompanyDropdownOpen,
  setIsCompanyDropdownOpen
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
        <Button isLink href="/login" variant="outline" size="sm">
          Login
        </Button>
      </div>
    </>
  );
};

export default DesktopNav;
