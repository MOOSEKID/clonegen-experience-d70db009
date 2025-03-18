
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface MobileNavItemProps {
  label: string;
  path: string;
  isActive?: boolean;
  icon?: React.ElementType;
  onClick?: (e: React.MouseEvent) => void;
}

const MobileNavItem = ({ label, path, isActive, icon: Icon, onClick }: MobileNavItemProps) => {
  return (
    <Link
      to={path}
      className={cn(
        "block px-3 py-2 rounded-md text-base font-medium",
        isActive
          ? "bg-gym-dark text-white"
          : "text-white/80 hover:bg-gym-dark hover:text-white"
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        {Icon && <Icon className="mr-2" size={20} />}
        {label}
      </div>
    </Link>
  );
};

export default MobileNavItem;
