
import { cmsService, CmsPage } from './cmsService';

// Define route discovery interface
export interface RouteInfo {
  path: string;
  pageName: string;
  isDynamic: boolean;
  sourceFilePath?: string;
  isActive: boolean;
}

export const routeService = {
  // Known routes that should be mapped to CMS pages
  knownRoutes: [
    { path: '/', pageName: 'Home' },
    { path: '/about-us', pageName: 'About Us' },
    { path: '/classes', pageName: 'Classes', isDynamic: true },
    { path: '/membership', pageName: 'Membership', isDynamic: true },
    { path: '/blogs', pageName: 'Blogs' },
    { path: '/contact-us', pageName: 'Contact Us' },
    { path: '/services', pageName: 'Services' },
    { path: '/opening-times', pageName: 'Opening Times' },
    { path: '/shop', pageName: 'Shop', isDynamic: true },
    { path: '/fitness-facilities', pageName: 'Fitness Facilities', isDynamic: true },
    { path: '/spa-wellness', pageName: 'Spa & Wellness', isDynamic: true },
    { path: '/youth-programs', pageName: 'Youth Programs', isDynamic: true },
    { path: '/timetable', pageName: 'Timetable', isDynamic: true },
  ],

  // Get all frontend routes
  getRoutes(): RouteInfo[] {
    return this.knownRoutes.map(route => ({
      ...route,
      isDynamic: route.isDynamic || false,
      sourceFilePath: this.getSourcePathForRoute(route.path),
      isActive: true
    }));
  },

  getSourcePathForRoute(path: string): string {
    // Convert route to a likely source file path
    const routePath = path === '/' ? 'index' : path.slice(1);
    return `src/pages/${routePath.charAt(0).toUpperCase() + routePath.slice(1)}.tsx`;
  },

  // Sync routes with CMS database
  async syncRoutes(): Promise<CmsPage[]> {
    try {
      const routes = this.getRoutes();
      const existingPages = await cmsService.getPages();
      
      const pages = await Promise.all(
        routes.map(async (route) => {
          // Check if page already exists
          const existingPage = existingPages.find(p => p.slug === (route.path === '/' ? 'home' : route.path.slice(1)));
          
          if (existingPage) {
            return existingPage;
          }
          
          // Create new page
          const slug = route.path === '/' ? 'home' : route.path.slice(1);
          const newPage = {
            slug,
            title: route.pageName,
            type: route.isDynamic ? 'dynamic' : 'system',
            source_path: route.sourceFilePath,
            visible: true
          };
          
          const createdPage = await cmsService.createPage(newPage);
          return createdPage || null;
        })
      );
      
      // Filter out nulls
      return pages.filter(Boolean) as CmsPage[];
    } catch (error) {
      console.error("Error syncing routes:", error);
      return [];
    }
  }
};
