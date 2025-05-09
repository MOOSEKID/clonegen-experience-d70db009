
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigation } from '@/hooks/cms/useNavigation';
import { cn } from '@/lib/utils';
import HeaderDropdown from './HeaderDropdown';
import { getNavItems, getServiceItems, getCompanyItems } from '@/data/headerNavData';
import { toast } from 'sonner';

const DynamicNavigation: React.FC = () => {
  const { mainItems, dropdowns, isLoading, error } = useNavigation();
  const [useFallback, setUseFallback] = useState(false);

  // Determine if we should use fallback navigation
  useEffect(() => {
    if ((mainItems.length === 0 && !isLoading) || error) {
      setUseFallback(true);
      if (process.env.NODE_ENV === 'development') {
        console.log('Using fallback navigation due to:', 
          mainItems.length === 0 ? 'No items' : 'Error', 
          error);
      }
    } else {
      setUseFallback(false);
    }
  }, [mainItems.length, isLoading, error]);

  // If we're still loading and don't know yet, show nothing
  if (isLoading) {
    return null;
  }

  // If using fallback navigation
  if (useFallback) {
    const staticNavItems = getNavItems();
    const serviceItems = getServiceItems();
    const companyItems = getCompanyItems();

    return (
      <>
        {staticNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="nav-link text-white/90 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
        
        <HeaderDropdown 
          title="Services" 
          items={serviceItems}
          isActive={false} 
          isOpenState={[false, () => {}]} 
        />
        
        <HeaderDropdown 
          title="Company" 
          items={companyItems} 
          isActive={false}
          isOpenState={[false, () => {}]} 
        />
      </>
    );
  }

  // Using CMS-driven navigation
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
