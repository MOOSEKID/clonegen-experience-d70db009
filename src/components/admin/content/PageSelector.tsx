
import { memo, useState } from 'react';
import { 
  Home, 
  Users, 
  Dumbbell, 
  Tag, 
  Info, 
  Contact, 
  ShoppingCart,
  Book,
  ChevronRight,
  ChevronDown,
  Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageSelectorProps {
  selectedPage: string;
  onSelectPage: (page: string) => void;
  className?: string;
  isMobileSidebarOpen?: boolean;
}

interface PageItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  children?: PageItem[];
}

const pages: PageItem[] = [
  { id: 'home', name: 'Home', icon: <Home size={16} /> },
  { 
    id: 'company', 
    name: 'Company', 
    icon: <Briefcase size={16} />,
    children: [
      { id: 'about-us', name: 'About Us', icon: <Info size={16} /> },
      { id: 'contact-us', name: 'Contact', icon: <Contact size={16} /> },
      { id: 'careers', name: 'Careers', icon: <Users size={16} /> }
    ]
  },
  { 
    id: 'services', 
    name: 'Services', 
    icon: <Dumbbell size={16} />,
    children: [
      { id: 'personal-training', name: 'Personal Training', icon: <Users size={16} /> },
      { id: 'nutrition', name: 'Nutrition', icon: <Tag size={16} /> }
    ]
  },
  { id: 'classes', name: 'Classes', icon: <Users size={16} /> },
  { id: 'membership', name: 'Membership', icon: <Tag size={16} /> },
  { id: 'blogs', name: 'Blogs', icon: <Book size={16} /> },
  { id: 'shop', name: 'Shop', icon: <ShoppingCart size={16} /> },
];

const PageSelector = ({ 
  selectedPage, 
  onSelectPage, 
  className = '',
  isMobileSidebarOpen = true 
}: PageSelectorProps) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (pageId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [pageId]: !prev[pageId]
    }));
  };

  const renderPageItem = (page: PageItem, depth: number = 0) => {
    const isSelected = selectedPage === page.id;
    const hasChildren = page.children && page.children.length > 0;
    const isExpanded = expandedItems[page.id];
    const isChildSelected = hasChildren && page.children?.some(child => selectedPage === child.id);

    const handleClick = () => {
      if (hasChildren) {
        toggleExpand(page.id);
      } else {
        onSelectPage(page.id);
      }
    };

    return (
      <li key={page.id}>
        <button
          className={cn(
            "w-full text-left px-4 py-2 flex items-center justify-between text-sm hover:bg-gray-50 transition-colors",
            isSelected || isChildSelected ? 'bg-gray-100 border-l-2 border-gym-orange font-medium' : '',
            depth > 0 ? 'pl-8' : ''
          )}
          onClick={handleClick}
        >
          <div className="flex items-center space-x-3">
            <span className={cn(
              isSelected || isChildSelected ? 'text-gym-orange' : 'text-gray-500'
            )}>
              {page.icon}
            </span>
            <span>{page.name}</span>
          </div>
          {hasChildren && (
            <span className="text-gray-400">
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          )}
        </button>
        
        {hasChildren && isExpanded && (
          <ul>
            {page.children?.map(child => renderPageItem(child, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  if (!isMobileSidebarOpen) {
    return null;
  }

  return (
    <div className={cn(
      "w-52 border-r border-gray-200 overflow-auto flex-shrink-0",
      "md:block", // Always visible on medium screens and up
      className
    )}>
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">Select Page</h3>
      </div>
      <ul className="py-2">
        {pages.map(page => renderPageItem(page))}
      </ul>
    </div>
  );
};

export default memo(PageSelector);
