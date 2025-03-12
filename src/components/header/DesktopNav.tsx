
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import HeaderDropdown from './HeaderDropdown';
import { Button } from '../Button';
import { LucideIcon } from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon?: LucideIcon;
  action?: () => void;
  isExternalLink?: boolean;
}

interface DesktopNavProps {
  navItems: NavItem[];
  serviceItems: { label: string; path: string }[];
  companyItems: { label: string; path: string }[];
  authItems: NavItem[];
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
  authItems,
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
          item.action ? (
            <button
              key={item.path}
              onClick={item.action}
              className={cn(
                'nav-link text-white/90 hover:text-white flex items-center gap-1',
                isActive(item.path) ? 'active' : ''
              )}
            >
              {item.icon && <item.icon size={18} />}
              {item.label}
            </button>
          ) : (
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
          )
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
        {authItems.map((item) => (
          item.action ? (
            <Button 
              key={item.path}
              variant="outline" 
              size="sm" 
              onClick={item.action}
              className="flex items-center gap-1"
            >
              {item.icon && <item.icon size={16} />}
              {item.label}
            </Button>
          ) : (
            <Button 
              key={item.path}
              isLink 
              href={item.path} 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
            >
              {item.icon && <item.icon size={16} />}
              {item.label}
            </Button>
          )
        ))}
      </div>
    </>
  );
};

export default DesktopNav;
