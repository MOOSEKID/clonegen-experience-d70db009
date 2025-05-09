
import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, User, Zap } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { supabase } from '@/integrations/supabase/client';
import SystemTabContent from '@/components/admin/settings/SystemTabContent';
import PeopleTabContent from '@/components/admin/settings/PeopleTabContent';
import AdvancedTabContent from '@/components/admin/settings/AdvancedTabContent';

// Storage setup
const setupStorageBucket = async () => {
  try {
    const { data: existingBuckets } = await supabase.storage.listBuckets();
    if (!existingBuckets?.find(bucket => bucket.name === 'settings')) {
      await supabase.storage.createBucket('settings', {
        public: true,
        fileSizeLimit: 10485760, // 10MB
      });
    }
  } catch (error) {
    console.error('Error setting up storage bucket:', error);
    // We don't show a toast here as it might not be important for the user
  }
};

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('system');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Set up storage bucket for settings-related files
    setupStorageBucket();
    setIsLoading(false);
  }, []);
  
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin/settings">Settings</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <h1 className="text-2xl font-bold text-gray-800 mt-4">Settings</h1>
        <p className="text-gray-500">Configure your gym's system settings</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="system" className="flex items-center space-x-2">
            <SettingsIcon className="h-4 w-4" />
            <span>System</span>
          </TabsTrigger>
          <TabsTrigger value="people" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>People & Roles</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center space-x-2">
            <Zap className="h-4 w-4" />
            <span>Advanced</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="system">
          <SystemTabContent />
        </TabsContent>
        
        <TabsContent value="people">
          <PeopleTabContent />
        </TabsContent>
        
        <TabsContent value="advanced">
          <AdvancedTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
