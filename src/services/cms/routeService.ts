
import { cmsService, CmsPage } from './cmsService';
import { toast } from 'sonner';

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
            type: route.isDynamic ? 'dynamic' as const : 'system' as const,
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
      toast.error("Failed to sync routes with database");
      throw error; // Re-throw for proper error handling
    }
  },

  // Bootstrap CMS pages if empty - runs on application startup
  async bootstrapCmsPages(): Promise<boolean> {
    try {
      const existingPages = await cmsService.getPages();
      
      // Only bootstrap if no pages exist
      if (existingPages.length === 0) {
        await this.syncRoutes();
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Error bootstrapping CMS pages:", error);
      return false;
    }
  },

  // Force bootstrap even if pages exist - for emergency recovery
  async forceBootstrapCmsPages(): Promise<boolean> {
    try {
      console.log("Starting force bootstrap of CMS pages");
      // Skip checking for existing pages and force create all routes
      const routes = this.getRoutes();
      
      // Create all routes as new pages
      await Promise.all(
        routes.map(async (route) => {
          try {
            // Create or update page
            const slug = route.path === '/' ? 'home' : route.path.slice(1);
            const page = {
              slug,
              title: route.pageName,
              type: route.isDynamic ? 'dynamic' as const : 'system' as const,
              source_path: route.sourceFilePath,
              visible: true
            };
            
            // Check if page exists
            const existingPage = await cmsService.getPageBySlug(slug);
            
            if (existingPage) {
              console.log(`Updating existing page: ${page.title}`);
              await cmsService.updatePage(existingPage.id, page);
            } else {
              console.log(`Creating new page: ${page.title}`);
              await cmsService.createPage(page);
            }
          } catch (routeError) {
            console.error(`Error processing route ${route.path}:`, routeError);
          }
        })
      );
      
      console.log("Force bootstrap completed successfully");
      return true;
    } catch (error) {
      console.error("Error in force bootstrap CMS pages:", error);
      toast.error("Failed to restore routes");
      throw error; // Re-throw for proper error handling
    }
  }
};
