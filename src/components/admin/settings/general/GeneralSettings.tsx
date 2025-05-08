
import { useState } from 'react';
import { useSettings, SaveState } from '@/hooks/admin/useSettings';
import SettingsCard from '../SettingsCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import FileUpload from '../FileUpload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { languages, currencies, timezones } from './data';

interface GeneralSettingsData {
  id: string;
  business_name: string;
  contact_email: string;
  contact_phone: string;
  currency: string;
  default_language: string;
  timezone: string;
  enable_dark_mode: boolean;
  logo_light: string;
  logo_dark: string;
}

const GeneralSettings = () => {
  const { 
    data: settings, 
    loading, 
    error, 
    updateSettings, 
    saveState
  } = useSettings<GeneralSettingsData>({ 
    tableName: 'settings_general' 
  });
  
  // Form state
  const [formData, setFormData] = useState<Partial<GeneralSettingsData>>({});
  
  // Handle input changes
  const handleInputChange = (field: keyof GeneralSettingsData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  // Save changes with debounce
  const saveChanges = (field: keyof GeneralSettingsData, value: any) => {
    handleInputChange(field, value);
    updateSettings({ [field]: value });
  };

  if (loading) {
    return (
      <SettingsCard title="General Settings" description="Loading settings...">
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gym-orange"></div>
        </div>
      </SettingsCard>
    );
  }
  
  if (error || !settings) {
    return (
      <SettingsCard 
        title="General Settings" 
        description="Error loading settings"
        saveState={SaveState.Error}
      >
        <div className="p-4 bg-red-50 text-red-800 rounded-md">
          {error?.message || 'Failed to load settings'}
        </div>
        <Button 
          onClick={() => window.location.reload()} 
          className="mt-4"
          variant="outline"
        >
          Retry
        </Button>
      </SettingsCard>
    );
  }
  
  return (
    <SettingsCard 
      title="General Settings" 
      description="Configure your gym's basic information"
      saveState={saveState}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label htmlFor="business_name">Business Name</Label>
              <Input
                id="business_name"
                defaultValue={settings.business_name}
                onChange={(e) => saveChanges('business_name', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact_email">Contact Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  defaultValue={settings.contact_email || ''}
                  onChange={(e) => saveChanges('contact_email', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact_phone">Contact Phone</Label>
                <Input
                  id="contact_phone"
                  defaultValue={settings.contact_phone || ''}
                  onChange={(e) => saveChanges('contact_phone', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select 
                  defaultValue={settings.currency} 
                  onValueChange={(value) => saveChanges('currency', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map(currency => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="default_language">Default Language</Label>
                <Select 
                  defaultValue={settings.default_language} 
                  onValueChange={(value) => saveChanges('default_language', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(language => (
                      <SelectItem key={language.code} value={language.code}>
                        {language.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select 
                  defaultValue={settings.timezone} 
                  onValueChange={(value) => saveChanges('timezone', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map(timezone => (
                      <SelectItem key={timezone.value} value={timezone.value}>
                        {timezone.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Label htmlFor="enable_dark_mode">Enable Dark Mode</Label>
              <Switch
                id="enable_dark_mode"
                checked={settings.enable_dark_mode}
                onCheckedChange={(checked) => {
                  saveChanges('enable_dark_mode', checked);
                }}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-3">
                <Label>Logo (Light Theme)</Label>
                <FileUpload 
                  bucket="settings"
                  path="logos"
                  currentFilePath={settings.logo_light || ''}
                  onUploadComplete={(filePath) => saveChanges('logo_light', filePath)}
                  label="Upload Light Logo"
                  accept="image/*"
                />
              </div>
              
              <div className="space-y-3">
                <Label>Logo (Dark Theme)</Label>
                <FileUpload 
                  bucket="settings"
                  path="logos"
                  currentFilePath={settings.logo_dark || ''}
                  onUploadComplete={(filePath) => saveChanges('logo_dark', filePath)}
                  label="Upload Dark Logo"
                  accept="image/*"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SettingsCard>
  );
};

export default GeneralSettings;
