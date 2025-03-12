
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderDropdownProps {
  title: string;
  items: { label: string; path: string }[];
  isActive: boolean;
  isOpenState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  className?: string;
}

const HeaderDropdown = ({ 
  title, 
  items, 
  isActive, 
  isOpenState, 
  className 
}: HeaderDropdownProps) => {
  const [isOpen, setIsOpen] = isOpenState;
  const location = useLocation();

  const isItemActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className={`${className} relative`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'nav-link text-white/90 hover:text-white flex items-center',
          isActive ? 'active' : ''
        )}
      >
        <span>{title}</span>
        <ChevronDown size={16} className="ml-1" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-gym-darkblue rounded-md shadow-lg overflow-hidden z-50 animate-fade-in border border-gym-dark/20">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'block px-4 py-3 text-white/80 hover:text-white hover:bg-gym-dark/50 transition-colors',
                isItemActive(item.path) ? 'bg-gym-dark/50 text-white' : ''
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderDropdown;
