
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileDropdownSectionProps {
  title: string;
  Icon: LucideIcon;
  items: { label: string; path: string }[];
}

const MobileDropdownSection = ({ title, Icon, items }: MobileDropdownSectionProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="py-2 border-t border-white/10">
      <button 
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full text-white/90 hover:text-white transition-colors"
      >
        <div className="flex items-center">
          <Icon size={16} className="mr-2" />
          <span className="font-medium">{title}</span>
        </div>
        {isOpen ? (
          <ChevronDown size={18} className="text-white/70" />
        ) : (
          <ChevronRight size={18} className="text-white/70" />
        )}
      </button>
      
      {isOpen && (
        <div className="space-y-3 pl-6 mt-2 animate-fade-in">
          {items.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'block text-white/80 hover:text-white transition-colors',
                isActive(item.path) ? 'text-white font-medium' : ''
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

export default MobileDropdownSection;
