
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  path: string;
  icon?: React.ElementType;
  action?: () => void;
}

interface MobileDropdownSectionProps {
  title: string;
  items: NavItem[];
  onItemClick?: (item: NavItem, e: React.MouseEvent) => void;
}

const MobileDropdownSection = ({ title, items, onItemClick }: MobileDropdownSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleItemClick = (item: NavItem, e: React.MouseEvent) => {
    if (onItemClick) {
      onItemClick(item, e);
    }
  };

  return (
    <div className="py-1">
      <button
        className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-white/80 hover:bg-gym-dark hover:text-white rounded-md"
        onClick={toggleDropdown}
      >
        <span>{title}</span>
        <ChevronDown 
          size={20} 
          className={cn(
            "transition-transform duration-200",
            isOpen ? "transform rotate-180" : ""
          )} 
        />
      </button>
      
      {isOpen && (
        <div className="pl-4 space-y-1 mt-1">
          {items.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="block px-3 py-2 text-sm text-white/70 hover:bg-gym-dark hover:text-white rounded-md"
              onClick={(e) => handleItemClick(item, e)}
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
