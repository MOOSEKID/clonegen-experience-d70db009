
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PageManager from "./PageManager";
import NavigationBuilder from "./NavigationBuilder";
import RouteSyncManager from "./RouteSyncManager";
import { useAuth } from '@/hooks/useAuth';

const CMSDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("pages");
  const { isAdmin } = useAuth();

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
      <div>
        <h1 className="text-2xl font-bold">CMS Dashboard</h1>
        <p className="text-gray-500">Manage your website content, pages, and navigation</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="routes">Route Sync</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pages" className="space-y-6">
          <PageManager />
        </TabsContent>
        
        <TabsContent value="navigation" className="space-y-6">
          <NavigationBuilder />
        </TabsContent>
        
        <TabsContent value="routes" className="space-y-6">
          <RouteSyncManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CMSDashboard;
