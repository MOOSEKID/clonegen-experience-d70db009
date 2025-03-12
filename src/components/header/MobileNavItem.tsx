
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MobileNavItemProps {
  path: string;
  children: ReactNode;
  icon?: LucideIcon;
}

const MobileNavItem = ({ path, children, icon: Icon }: MobileNavItemProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

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
