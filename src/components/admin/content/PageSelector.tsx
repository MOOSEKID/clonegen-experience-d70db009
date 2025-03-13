
import { memo } from 'react';
import { 
  Home, 
  Users, 
  Dumbbell, 
  Tag, 
  Info, 
  Contact, 
  ShoppingCart
} from 'lucide-react';

interface PageSelectorProps {
  selectedPage: string;
  onSelectPage: (page: string) => void;
}

const pages = [
  { id: 'home', name: 'Home', icon: <Home size={16} /> },
  { id: 'about-us', name: 'About Us', icon: <Info size={16} /> },
  { id: 'services', name: 'Services', icon: <Dumbbell size={16} /> },
  { id: 'classes', name: 'Classes', icon: <Users size={16} /> },
  { id: 'membership', name: 'Membership', icon: <Tag size={16} /> },
  { id: 'contact-us', name: 'Contact', icon: <Contact size={16} /> },
  { id: 'shop', name: 'Shop', icon: <ShoppingCart size={16} /> },
];

const PageSelector = ({ selectedPage, onSelectPage }: PageSelectorProps) => {
  return (
    <div className="w-52 border-r border-gray-200 overflow-auto">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">Select Page</h3>
      </div>
      <ul>
        {pages.map(page => (
          <li key={page.id}>
            <button
              className={`w-full text-left px-4 py-3 flex items-center space-x-3 text-sm hover:bg-gray-50 transition-colors
                ${selectedPage === page.id ? 'bg-gray-100 border-l-2 border-gym-orange font-medium' : ''}`}
              onClick={() => onSelectPage(page.id)}
            >
              <span className={`${selectedPage === page.id ? 'text-gym-orange' : 'text-gray-500'}`}>
                {page.icon}
              </span>
              <span>{page.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(PageSelector);
