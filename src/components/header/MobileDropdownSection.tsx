
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileDropdownSectionProps {
  title: string;
  Icon: LucideIcon;
  items: { label: string; path: string }[];
}

const MobileDropdownSection = ({ title, Icon, items }: MobileDropdownSectionProps) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="py-2 border-t border-white/10">
      <div className="flex items-center mb-2 text-white/90">
        <Icon size={16} className="mr-2" />
        <span className="font-medium">{title}</span>
      </div>
      <div className="space-y-3 pl-6">
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
    </div>
  );
};

export default MobileDropdownSection;
