
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface HeaderDropdownProps {
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <button
        className={cn(
          'nav-link text-white/90 hover:text-white flex items-center gap-1',
          isActive || isOpen ? 'active' : ''
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <ChevronDown 
          size={16} 
          className={cn(
            "transition-transform duration-200", 
            isOpen ? "rotate-180" : ""
          )} 
        />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-40">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
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
