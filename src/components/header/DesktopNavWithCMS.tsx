
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DynamicNavigation from './DynamicNavigation';
import { LucideIcon } from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon?: LucideIcon;
  action?: () => void;
  isExternalLink?: boolean;
}

interface DesktopNavWithCMSProps {
  dashboardItem: NavItem;
  authItems: NavItem[];
  isLoggedIn?: boolean;
}

const DesktopNavWithCMS: React.FC<DesktopNavWithCMSProps> = ({ 
  dashboardItem,
  authItems,
  isLoggedIn = false
}) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  
  return (
    <>
      <nav className="hidden md:flex items-center space-x-8">
        {/* Dynamic navigation items from CMS */}
        <DynamicNavigation />
        
        {/* Dashboard link - always appears after navigation items */}
        {dashboardItem.action ? (
          <button
            onClick={dashboardItem.action}
            className={`nav-link text-white/90 hover:text-white flex items-center gap-1 ${
              isActive(dashboardItem.path) ? 'active' : ''
            }`}
          >
            {dashboardItem.icon && <dashboardItem.icon size={18} />}
            {dashboardItem.label}
          </button>
        ) : (
          <a
            href={dashboardItem.path}
            className={`nav-link text-white/90 hover:text-white flex items-center gap-1 ${
              isActive(dashboardItem.path) ? 'active' : ''
            }`}
          >
            {dashboardItem.icon && <dashboardItem.icon size={18} />}
            {dashboardItem.label}
          </a>
        )}
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
              asChild
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
            >
              <a href={item.path}>
                {item.icon && <item.icon size={16} />}
                {item.label}
              </a>
            </Button>
          )
        ))}
      </div>
    </>
  );
};

export default DesktopNavWithCMS;
