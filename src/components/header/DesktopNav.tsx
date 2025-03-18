
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  path: string;
  icon?: React.ElementType;
  action?: () => void;
}

interface DesktopNavProps {
  navItems: NavItem[];
  serviceItems: NavItem[];
  companyItems: NavItem[];
  dashboardItem: NavItem;
  authItems: NavItem[];
  isServicesDropdownOpen: boolean;
  setIsServicesDropdownOpen: (isOpen: boolean) => void;
  isCompanyDropdownOpen: boolean;
  setIsCompanyDropdownOpen: (isOpen: boolean) => void;
  isLoggedIn: boolean;
  onNavigation?: (path: string) => void;
}

const DesktopNav = ({
  navItems,
  serviceItems,
  companyItems,
  dashboardItem,
  authItems,
  isServicesDropdownOpen,
  setIsServicesDropdownOpen,
  isCompanyDropdownOpen,
  setIsCompanyDropdownOpen,
  isLoggedIn,
  onNavigation
}: DesktopNavProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleClick = (item: NavItem, e: React.MouseEvent) => {
    if (item.action) {
      e.preventDefault();
      item.action();
    } else if (onNavigation && item.path !== '#') {
      e.preventDefault();
      onNavigation(item.path);
    }
  };

  return (
    <nav className="hidden md:flex items-center space-x-1">
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium transition-colors",
            isActive(item.path)
              ? "text-white bg-gym-darkblue/50"
              : "text-white/80 hover:text-white hover:bg-gym-dark/50"
          )}
          onClick={(e) => handleClick(item, e)}
        >
          <div className="flex items-center space-x-1">
            {item.icon && <item.icon size={16} />}
            <span>{item.label}</span>
          </div>
        </Link>
      ))}
      
      {/* Services Dropdown */}
      <div className="relative services-dropdown">
        <button
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1",
            isActive('/services') || serviceItems.some(item => isActive(item.path))
              ? "text-white bg-gym-darkblue/50"
              : "text-white/80 hover:text-white hover:bg-gym-dark/50"
          )}
          onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
        >
          <span>Services</span>
          <ChevronDown size={16} className={cn(isServicesDropdownOpen ? "transform rotate-180" : "")} />
        </button>
        
        {isServicesDropdownOpen && (
          <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gym-darkblue ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1">
              {serviceItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={cn(
                    "block px-4 py-2 text-sm text-white/80 hover:bg-gym-dark/50 hover:text-white",
                    isActive(item.path) && "bg-gym-dark/30 text-white"
                  )}
                  onClick={(e) => handleClick(item, e)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Company Dropdown */}
      <div className="relative company-dropdown">
        <button
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1",
            isActive('/about-us') || companyItems.some(item => isActive(item.path))
              ? "text-white bg-gym-darkblue/50"
              : "text-white/80 hover:text-white hover:bg-gym-dark/50"
          )}
          onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
        >
          <span>Company</span>
          <ChevronDown size={16} className={cn(isCompanyDropdownOpen ? "transform rotate-180" : "")} />
        </button>
        
        {isCompanyDropdownOpen && (
          <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gym-darkblue ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1">
              {companyItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={cn(
                    "block px-4 py-2 text-sm text-white/80 hover:bg-gym-dark/50 hover:text-white",
                    isActive(item.path) && "bg-gym-dark/30 text-white"
                  )}
                  onClick={(e) => handleClick(item, e)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Dashboard link (if logged in) */}
      {isLoggedIn && (
        <Link
          to={dashboardItem.path}
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium transition-colors",
            isActive(dashboardItem.path)
              ? "text-white bg-gym-darkblue/50"
              : "text-white/80 hover:text-white hover:bg-gym-dark/50"
          )}
          onClick={(e) => handleClick(dashboardItem, e)}
        >
          <div className="flex items-center space-x-1">
            {dashboardItem.icon && <dashboardItem.icon size={16} />}
            <span>{dashboardItem.label}</span>
          </div>
        </Link>
      )}
      
      {/* Auth items (Login/Logout) */}
      {authItems.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium transition-colors",
            isActive(item.path)
              ? "text-white bg-gym-darkblue/50"
              : "text-white/80 hover:text-white hover:bg-gym-dark/50"
          )}
          onClick={(e) => handleClick(item, e)}
        >
          <div className="flex items-center space-x-1">
            {item.icon && <item.icon size={16} />}
            <span>{item.label}</span>
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNav;
