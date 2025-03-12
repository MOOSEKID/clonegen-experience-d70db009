
import { Building, Dumbbell, LucideIcon, Settings } from 'lucide-react';
import { Button } from '../Button';
import MobileNavItem from './MobileNavItem';
import MobileDropdownSection from './MobileDropdownSection';

interface NavItem {
  label: string;
  path: string;
  icon?: LucideIcon;
  isExternalLink?: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItem[];
  serviceItems: { label: string; path: string }[];
  companyItems: { label: string; path: string }[];
}

const MobileMenu = ({ isOpen, navItems, serviceItems, companyItems }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-gym-darkblue shadow-lg p-4 md:hidden animate-fade-in">
      <nav className="flex flex-col space-y-4">
        {navItems.map((item) => (
          <MobileNavItem 
            key={item.path} 
            path={item.path} 
            icon={item.icon}
            isExternalLink={item.isExternalLink}
          >
            {item.label}
          </MobileNavItem>
        ))}
        
        <MobileDropdownSection 
          title="Services" 
          Icon={Dumbbell} 
          items={serviceItems} 
        />
        
        <MobileDropdownSection 
          title="Company" 
          Icon={Building} 
          items={companyItems} 
        />
        
        <div className="flex gap-3 pt-3 border-t border-white/10">
          <Button isLink href="/login" variant="outline" size="sm" className="flex-1">
            Login
          </Button>
          <Button isLink href="/admin" variant="primary" size="sm" className="flex-1 gap-2">
            <Settings size={16} />
            Admin
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
