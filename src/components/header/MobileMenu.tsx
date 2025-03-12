
import { Building, Dumbbell } from 'lucide-react';
import { Button } from '../Button';
import MobileNavItem from './MobileNavItem';
import MobileDropdownSection from './MobileDropdownSection';

interface MobileMenuProps {
  isOpen: boolean;
  navItems: { label: string; path: string }[];
  serviceItems: { label: string; path: string }[];
  companyItems: { label: string; path: string }[];
}

const MobileMenu = ({ isOpen, navItems, serviceItems, companyItems }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-gym-darkblue shadow-lg p-4 md:hidden animate-fade-in">
      <nav className="flex flex-col space-y-4">
        {navItems.map((item) => (
          <MobileNavItem key={item.path} path={item.path}>
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
        
        <Button isLink href="/login" variant="primary" size="sm" className="w-full">
          Login
        </Button>
      </nav>
    </div>
  );
};

export default MobileMenu;
