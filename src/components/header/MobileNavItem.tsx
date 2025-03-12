
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface MobileNavItemProps {
  path: string;
  children: ReactNode;
  icon?: LucideIcon;
  isExternalLink?: boolean;
}

const MobileNavItem = ({ path, children, icon: Icon, isExternalLink = false }: MobileNavItemProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

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
