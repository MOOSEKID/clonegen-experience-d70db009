
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MobileNavItemProps {
  path: string;
  children: ReactNode;
  icon?: LucideIcon;
  isExternalLink?: boolean;
  action?: () => void;
}

const MobileNavItem = ({ path, children, icon: Icon, isExternalLink = false, action }: MobileNavItemProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  if (action) {
    return (
      <button
        onClick={action}
        className={cn(
          'nav-link text-white flex items-center gap-2 w-full text-left',
          isActive(path) ? 'active' : ''
        )}
      >
        {Icon && <Icon size={18} />}
        {children}
      </button>
    );
  }

  if (isExternalLink) {
    return (
      <a
        href={path}
        className={cn(
          'nav-link text-white flex items-center gap-2',
          isActive(path) ? 'active' : ''
        )}
      >
        {Icon && <Icon size={18} />}
        {children}
      </a>
    );
  }

  return (
    <Link
      to={path}
      className={cn(
        'nav-link text-white flex items-center gap-2',
        isActive(path) ? 'active' : ''
      )}
    >
      {Icon && <Icon size={18} />}
      {children}
    </Link>
  );
};

export default MobileNavItem;
