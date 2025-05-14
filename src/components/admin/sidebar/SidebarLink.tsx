
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { NavLinkProps } from './types';

interface SidebarLinkProps {
  link: NavLinkProps;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ link }) => {
  const location = useLocation();

  return (
    <Link
      to={link.href}
      className={cn(
        'flex items-center py-2 px-4 rounded hover:bg-gym-dark transition-colors durationMinutes-200',
        location.pathname === link.href || location.pathname.startsWith(`${link.href}/`) 
          ? 'text-gym-orange bg-gym-dark/30' 
          : 'text-white/80'
      )}
    >
      <link.icon className="mr-2 h-4 w-4" />
      <span>{link.text}</span>
    </Link>
  );
};

export default SidebarLink;
