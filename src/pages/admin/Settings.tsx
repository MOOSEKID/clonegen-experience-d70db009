
import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Clock, Shield, User, Bell, FileText, Download, Zap, TestTube, MessageSquare, Store, DollarSign, BarChart } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import GeneralSettings from '@/components/admin/settings/general/GeneralSettings';
import BusinessHoursSettings from '@/components/admin/settings/business/BusinessHoursSettings';
import SecuritySettings from '@/components/admin/settings/security/SecuritySettings';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <GeneralSettings />
              <SecuritySettings />
              <div className="grid grid-cols-1 gap-6">
                {/* Platform Settings - This is a placeholder for now */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-sm min-h-[200px] flex flex-col justify-center items-center text-center">
                  <Store className="h-12 w-12 text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium">Platform Settings</h3>
                  <p className="text-sm text-gray-500">Coming soon - Enable/disable features, test mode</p>
                </div>
                
                {/* Integrations - This is a placeholder for now */}
                <div className="bg-gray-100 p-6 rounded-lg shadow-sm min-h-[200px] flex flex-col justify-center items-center text-center">
                  <DollarSign className="h-12 w-12 text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium">Integrations</h3>
                  <p className="text-sm text-gray-500">Coming soon - API keys for Stripe, MTN, Airtel, etc.</p>
                </div>
              </div>
            </div>
            
            <BusinessHoursSettings />
          </div>
        </TabsContent>
        
        <TabsContent value="people">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Permissions - This is a placeholder for now */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm min-h-[200px] flex flex-col justify-center items-center text-center">
              <Shield className="h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium">User Permissions</h3>
              <p className="text-sm text-gray-500">Coming soon - Create and manage user roles</p>
            </div>
            
            {/* Default Member Settings - This is a placeholder for now */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm min-h-[200px] flex flex-col justify-center items-center text-center">
              <User className="h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium">Default Member Settings</h3>
              <p className="text-sm text-gray-500">Coming soon - Configure default plans and renewal options</p>
            </div>
            
            {/* Company Automation - This is a placeholder for now */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm min-h-[200px] flex flex-col justify-center items-center text-center">
              <BarChart className="h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium">Company Automation</h3>
              <p className="text-sm text-gray-500">Coming soon - Set attendance reports and invoicing rules</p>
            </div>
            
            {/* Notification Settings - This is a placeholder for now */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm min-h-[200px] flex flex-col justify-center items-center text-center">
              <Bell className="h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium">Notification Settings</h3>
              <p className="text-sm text-gray-500">Coming soon - Configure email templates and SMS notifications</p>
            </div>
            
            {/* Invoice Templates - This is a placeholder for now */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm min-h-[200px] flex flex-col justify-center items-center text-center">
              <FileText className="h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium">Invoice Templates</h3>
              <p className="text-sm text-gray-500">Coming soon - Customize invoice appearance and content</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="advanced">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Reports & Exports - This is a placeholder for now */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm min-h-[200px] flex flex-col justify-center items-center text-center">
              <Download className="h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium">Reports & Exports</h3>
              <p className="text-sm text-gray-500">Coming soon - Configure automated export settings</p>
            </div>
            
            {/* Automation Rules - This is a placeholder for now */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm min-h-[200px] flex flex-col justify-center items-center text-center">
              <Zap className="h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium">Automation Rules</h3>
              <p className="text-sm text-gray-500">Coming soon - Create trigger-based workflows</p>
            </div>
            
            {/* Test Account Settings - This is a placeholder for now */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm min-h-[200px] flex flex-col justify-center items-center text-center">
              <TestTube className="h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium">Test Account Settings</h3>
              <p className="text-sm text-gray-500">Coming soon - Manage test accounts and mode</p>
            </div>
            
            {/* Custom Messages - This is a placeholder for now */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm min-h-[200px] flex flex-col justify-center items-center text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium">Custom Messages</h3>
              <p className="text-sm text-gray-500">Coming soon - Create popups and motivational alerts</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
