
import React, { useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PageManager from "./cms/PageManager";
import NavigationBuilder from "./cms/NavigationBuilder";
import RouteSyncManager from "./cms/RouteSyncManager";
import { useAuth } from '@/hooks/useAuth';
import { routeService } from '@/services/cms/routeService';
import { useNavItems } from '@/hooks/cms/useNavItems';
import { useCmsPages } from '@/hooks/cms/useCmsPages';
import { toast } from 'sonner';

const CMSTabContent: React.FC = () => {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = React.useState("routes");
  const { navItems } = useNavItems();
  const { pages } = useCmsPages();

  // Bootstrap CMS data when component loads
  useEffect(() => {
    const bootstrapCMS = async () => {
      try {
        // Check if we need to bootstrap pages
        if (pages.length === 0) {
          const result = await routeService.bootstrapCmsPages();
          if (result) {
            toast.success("CMS pages bootstrapped successfully");
          }
        }
      } catch (err) {
        console.error("Error bootstrapping CMS:", err);
        toast.error("Failed to bootstrap CMS pages");
      }
    };
    
    bootstrapCMS();
  }, [pages.length]);

  if (!isAdmin) {
    return (
      <Alert>
        <AlertDescription>
          You need administrator permissions to access the CMS dashboard.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="routes">Route Sync</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="routes" className="space-y-6">
          <RouteSyncManager />
        </TabsContent>
        
        <TabsContent value="navigation" className="space-y-6">
          <NavigationBuilder />
        </TabsContent>
        
        <TabsContent value="pages" className="space-y-6">
          <PageManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CMSTabContent;
