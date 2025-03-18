
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import MobileNavItem from './MobileNavItem';
import MobileDropdownSection from './MobileDropdownSection';

interface NavItem {
  label: string;
  path: string;
  icon?: React.ElementType;
  action?: () => void;
}

interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItem[];
  serviceItems: NavItem[];
  companyItems: NavItem[];
  dashboardItem: NavItem;
  authItems: NavItem[];
  isLoggedIn: boolean;
  onNavigation?: (path: string) => void;
}

const MobileMenu = ({
  isOpen,
  navItems,
  serviceItems,
  companyItems,
  dashboardItem,
  authItems,
  isLoggedIn,
  onNavigation
}: MobileMenuProps) => {
  const location = useLocation();
  
  if (!isOpen) return null;
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleNavClick = (item: NavItem, e: React.MouseEvent) => {
    if (item.action) {
      e.preventDefault();
      item.action();
    } else if (onNavigation && item.path !== '#') {
      e.preventDefault();
      onNavigation(item.path);
    }
  };

  return (
    <div className="absolute top-full left-0 right-0 bg-gym-darkblue shadow-lg md:hidden z-50">
      <div className="px-4 pt-2 pb-4 space-y-1">
        {/* Primary Nav Items */}
        {navItems.map((item) => (
          <MobileNavItem 
            key={item.label} 
            label={item.label} 
            path={item.path} 
            icon={item.icon}
            isActive={isActive(item.path)}
            onClick={(e) => handleNavClick(item, e)}
          />
        ))}
        
        {/* Services Dropdown */}
        <MobileDropdownSection title="Services" items={serviceItems} onItemClick={handleNavClick} />
        
        {/* Company Dropdown */}
        <MobileDropdownSection title="Company" items={companyItems} onItemClick={handleNavClick} />
        
        {/* Dashboard Link (if logged in) */}
        {isLoggedIn && (
          <MobileNavItem 
            label={dashboardItem.label} 
            path={dashboardItem.path} 
            icon={dashboardItem.icon}
            isActive={isActive(dashboardItem.path)}
            onClick={(e) => handleNavClick(dashboardItem, e)}
          />
        )}
        
        {/* Auth Items */}
        {authItems.map((item) => (
          <MobileNavItem 
            key={item.label} 
            label={item.label} 
            path={item.path} 
            icon={item.icon}
            isActive={isActive(item.path)}
            onClick={(e) => handleNavClick(item, e)}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
