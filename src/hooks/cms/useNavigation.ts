
import { useQuery } from '@tanstack/react-query';
import { cmsService, NavItem, CmsPage } from '@/services/cms/cmsService';

export interface NavItemWithPage extends NavItem {
  linked_page?: CmsPage;
}

export interface NavigationData {
  mainItems: NavItemWithPage[];
  dropdowns: Record<string, NavItemWithPage[]>;
  isLoading: boolean;
  error: unknown;
}

export const useNavigation = (): NavigationData => {
  // Get all navigation items
  const { 
    data: navItems,
    isLoading,
    error 
  } = useQuery({
    queryKey: ['cms', 'navigation'],
    queryFn: async () => {
      // First, get all nav items
      const items = await cmsService.getNavItems();
      
      // Then get all pages to link with nav items
      const pages = await cmsService.getPages();
      
      // Associate pages with nav items
      return items.map(item => {
        if (item.linked_page_id) {
          const linkedPage = pages.find(page => page.id === item.linked_page_id);
          return { ...item, linked_page: linkedPage };
        }
        return item;
      }) as NavItemWithPage[];
    }
  });

  // Separate main navigation from dropdown items
  const mainItems = (navItems || [])
    .filter(item => 
      (!item.nav_group || item.nav_group === 'Main Navigation') && 
      item.visible
    )
    .sort((a, b) => a.order_index - b.order_index);

  // Group dropdown items
  const dropdowns: Record<string, NavItemWithPage[]> = {};
  (navItems || [])
    .filter(item => 
      item.nav_group && 
      item.nav_group !== 'Main Navigation' && 
      item.visible
    )
    .forEach(item => {
      if (!dropdowns[item.nav_group!]) {
        dropdowns[item.nav_group!] = [];
      }
      dropdowns[item.nav_group!].push(item);
    });

  // Sort dropdown items by order_index
  Object.keys(dropdowns).forEach(key => {
    dropdowns[key].sort((a, b) => a.order_index - b.order_index);
  });

  return {
    mainItems,
    dropdowns,
    isLoading,
    error
  };
};
