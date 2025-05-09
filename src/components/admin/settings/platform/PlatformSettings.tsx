
import { useState, useEffect } from 'react';
import { useSettings, SaveState } from '@/hooks/admin/useSettings';
import SettingsCard from '../SettingsCard';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save, RotateCcw, AlertCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface PlatformSettingsData {
  id: string;
  enable_shop: boolean;
  enable_trainers: boolean;
  enable_support: boolean;
  enable_reports: boolean;
  enable_test_mode: boolean;
  maintenance_mode: boolean;
  updated_at?: string;
}

const PlatformSettings = () => {
  const isMobile = useIsMobile();
  
  const { 
    data: settings, 
    loading, 
    error, 
    updateSettings, 
    saveState,
    refresh
  } = useSettings<PlatformSettingsData>({ 
    tableName: 'settings_platform' 
  });
  
  const [formData, setFormData] = useState<Partial<PlatformSettingsData>>({});
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  // Initialize form data from settings
  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);
  
  // Check for changes between form data and original settings
  useEffect(() => {
    if (settings && formData) {
      const changes = Object.keys(formData).some(key => {
        return formData[key as keyof PlatformSettingsData] !== settings[key as keyof PlatformSettingsData];
      });
      
      setHasChanges(changes);
    }
  }, [formData, settings]);
  
  const handleToggle = (field: keyof PlatformSettingsData, value: boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const saveChanges = async () => {
    try {
      await updateSettings(formData);
      toast.success('Platform settings saved successfully');
    } catch (err) {
      toast.error('Failed to save platform settings');
      console.error('Error saving platform settings:', err);
    }
  };
  
  const resetChanges = () => {
    if (settings) {
      setFormData(settings);
      toast.info('Changes have been reset');
    }
  };
  
  if (loading) {
    return (
      <SettingsCard title="Platform Settings" description="Loading...">
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gym-orange"></div>
        </div>
      </SettingsCard>
    );
  }
  
  if (error || !settings) {
    return (
      <SettingsCard 
        title="Platform Settings" 
        description="Error loading settings"
        saveState={SaveState.Error}
      >
        <div className="p-4 bg-red-50 text-red-800 rounded-md flex items-start gap-3">
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Failed to load platform settings</p>
            <p className="text-sm mt-1">{error?.message || 'Unknown error'}</p>
            <Button 
              onClick={() => refresh()} 
              variant="outline"
              size="sm"
              className="mt-3"
            >
              Retry
            </Button>
          </div>
        </div>
      </SettingsCard>
    );
  }
  
  return (
    <SettingsCard 
      title="Platform Settings" 
      description="Configure platform-wide features and modules"
      saveState={saveState}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Features & Modules</h3>
          
          <div className="grid gap-4">
            <div className="flex items-center justify-between space-x-2 py-2 border-b">
              <div>
                <Label htmlFor="enable_trainers" className="font-medium">Enable Trainers Module</Label>
                <p className="text-sm text-muted-foreground">Allow management of trainers and trainer profiles</p>
              </div>
              <Switch
                id="enable_trainers"
                checked={formData.enable_trainers || false}
                onCheckedChange={(checked) => handleToggle('enable_trainers', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2 py-2 border-b">
              <div>
                <Label htmlFor="enable_shop" className="font-medium">Enable Shop Module</Label>
                <p className="text-sm text-muted-foreground">Enable e-commerce functionality for selling merchandise</p>
              </div>
              <Switch
                id="enable_shop"
                checked={formData.enable_shop || false}
                onCheckedChange={(checked) => handleToggle('enable_shop', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2 py-2 border-b">
              <div>
                <Label htmlFor="enable_support" className="font-medium">Enable Support Module</Label>
                <p className="text-sm text-muted-foreground">Enable support ticket system for member inquiries</p>
              </div>
              <Switch
                id="enable_support"
                checked={formData.enable_support || false}
                onCheckedChange={(checked) => handleToggle('enable_support', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2 py-2 border-b">
              <div>
                <Label htmlFor="enable_reports" className="font-medium">Enable Reports Module</Label>
                <p className="text-sm text-muted-foreground">Allow generation of reports and analytics</p>
              </div>
              <Switch
                id="enable_reports"
                checked={formData.enable_reports || false}
                onCheckedChange={(checked) => handleToggle('enable_reports', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2 py-2 border-b">
              <div>
                <Label htmlFor="enable_test_mode" className="font-medium">Enable Test Mode</Label>
                <p className="text-sm text-muted-foreground">Run the platform in test mode to safely try new features</p>
              </div>
              <Switch
                id="enable_test_mode"
                checked={formData.enable_test_mode || false}
                onCheckedChange={(checked) => handleToggle('enable_test_mode', checked)}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4 pt-4">
          <h3 className="font-medium">System Status</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between space-x-2 py-2 border p-3 rounded-md">
              <div>
                <Label htmlFor="maintenance_mode" className="font-medium text-red-600">Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  When enabled, the site will show a maintenance page to all users except administrators
                </p>
              </div>
              <Switch
                id="maintenance_mode"
                checked={formData.maintenance_mode || false}
                onCheckedChange={(checked) => {
                  handleToggle('maintenance_mode', checked);
                  if (checked) {
                    toast.warning('Maintenance mode will be activated after saving', {
                      description: 'Only administrators will be able to access the site'
                    });
                  }
                }}
              />
            </div>
            
            {formData.maintenance_mode && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning: Maintenance Mode</AlertTitle>
                <AlertDescription>
                  Enabling maintenance mode will prevent all non-admin users from accessing the site.
                  Be sure to communicate with your members before activating this feature.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
        
        <div className={`flex gap-2 justify-end mt-6 ${isMobile ? 'sticky bottom-4 bg-white dark:bg-gray-800 p-4 shadow-md rounded-md z-10' : ''}`}>
          <Button
            type="button"
            variant="outline"
            onClick={resetChanges}
            disabled={!hasChanges || saveState === SaveState.Saving}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          
          <Button
            type="button"
            disabled={!hasChanges || saveState === SaveState.Saving}
            onClick={saveChanges}
          >
            {saveState === SaveState.Saving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>
    </SettingsCard>
  );
};

export default PlatformSettings;
