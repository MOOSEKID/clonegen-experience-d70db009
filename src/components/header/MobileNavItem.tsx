
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface MobileNavItemProps {
  path: string;
  children: ReactNode;
}

const MobileNavItem = ({ path, children }: MobileNavItemProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <Link
      to={path}
      className={cn(
        'nav-link text-white',
        isActive(path) ? 'active' : ''
      )}
    >
      {children}
    </Link>
  );
};

export default MobileNavItem;
