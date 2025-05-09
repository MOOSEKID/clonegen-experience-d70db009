
import { useState, useEffect } from 'react';
import { routeService, RouteInfo } from '@/services/cms/routeService';
import { cmsService, CmsPage } from '@/services/cms/cmsService';
import { useQuery } from '@tanstack/react-query';

export interface SyncedRoute {
  path: string;
  pageId: string;
}

export const useRoutes = () => {
  const [syncedRoutes, setSyncedRoutes] = useState<SyncedRoute[]>([]);

  // Get all available frontend routes
  const routes: RouteInfo[] = routeService.getRoutes();
  
  // Get all CMS pages to check which routes are already synced
  const { 
    data: pages,
    isLoading,
    error
  } = useQuery({
    queryKey: ['cms', 'pages'],
    queryFn: cmsService.getPages
  });

  // Update synced routes whenever pages data changes
  useEffect(() => {
    if (pages) {
      const synced = pages.map(page => ({
        path: page.slug === 'home' ? '/' : `/${page.slug}`,
        pageId: page.id
      }));
      setSyncedRoutes(synced);
    }
  }, [pages]);

  return {
    routes,
    isLoading,
    error,
    syncedRoutes
  };
};
