
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { getNavItems } from '@/data/headerNavData';

interface FallbackNavigationProps {
  className?: string;
}

/**
 * Provides a hardcoded navigation when the CMS navigation system fails
 */
const FallbackNavigation: React.FC<FallbackNavigationProps> = ({ className = "" }) => {
  const navItems = getNavItems();
  
  return (
    <div className={`${className}`}>
      <div className="bg-amber-50 border-amber-200 border-b px-4 py-1 text-amber-800 text-xs flex items-center justify-center">
        <AlertTriangle className="h-3 w-3 mr-1" />
        Using fallback navigation - CMS navigation unavailable
      </div>
      
      <nav className="px-4 py-2 flex flex-wrap gap-x-6 gap-y-2 justify-center">
        {navItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className="text-gray-700 hover:text-gym-orange transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default FallbackNavigation;
