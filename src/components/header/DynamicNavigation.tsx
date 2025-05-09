
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigation } from '@/hooks/cms/useNavigation';
import { cn } from '@/lib/utils';
import HeaderDropdown from './HeaderDropdown';

const DynamicNavigation: React.FC = () => {
  const { mainItems, dropdowns, isLoading } = useNavigation();
  
  if (isLoading) {
    return null; // Don't render anything while loading
  }
  
  return (
    <>
      {/* Render main nav items */}
      {mainItems.map((item) => {
        const path = item.linked_page_id && item.linked_page?.slug
          ? (item.linked_page.slug === 'home' ? '/' : `/${item.linked_page.slug}`)
          : item.external_url || '#';
        
        const isExternalLink = item.external_url && !item.linked_page_id;
        
        if (isExternalLink) {
          return (
            <a
              key={item.id}
              href={path}
              className="nav-link text-white/90 hover:text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
            </a>
          );
        }
        
        return (
          <Link
            key={item.id}
            to={path}
            className="nav-link text-white/90 hover:text-white"
          >
            {item.label}
          </Link>
        );
      })}

      {/* Render dropdown menus */}
      {Object.keys(dropdowns).map((groupName) => {
        const items = dropdowns[groupName].map(item => ({
          label: item.label,
          path: item.linked_page_id && item.linked_page?.slug
            ? (item.linked_page.slug === 'home' ? '/' : `/${item.linked_page.slug}`)
            : item.external_url || '#'
        }));
        
        return (
          <HeaderDropdown
            key={groupName}
            title={groupName}
            items={items}
            isActive={false} // Set dynamically based on route
            isOpenState={[false, () => {}]} // Set dynamically based on state
            className={cn(groupName.toLowerCase().replace(/\s+/g, '-'))}
          />
        );
      })}
    </>
  );
};

export default DynamicNavigation;
