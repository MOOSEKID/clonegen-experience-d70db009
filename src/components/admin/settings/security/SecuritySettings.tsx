
import { useState, useEffect } from 'react';
import { useSettings, SaveState } from '@/hooks/admin/useSettings';
import SettingsCard from '../SettingsCard';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Loader2, Save, RotateCcw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface SecuritySettingsData {
  id: string;
  enable_2fa: boolean;
  min_password_length: number;
  require_special_chars: boolean;
  require_numbers: boolean;
  require_uppercase: boolean;
  session_timeout_minutes: number;
  updatedAt?: string;
}

const SecuritySettings = () => {
  const isMobile = useIsMobile();
  
  const { 
    data: settings, 
    loading, 
    error, 
    updateSettings, 
    saveState,
    refresh
  } = useSettings<SecuritySettingsData>({ 
    tableName: 'settings_security' 
  });
  
  const [formData, setFormData] = useState<Partial<SecuritySettingsData>>({});
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
        return formData[key as keyof SecuritySettingsData] !== settings[key as keyof SecuritySettingsData];
      });
      
      setHasChanges(changes);
    }
  }, [formData, settings]);
  
  const handleInputChange = (field: keyof SecuritySettingsData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const saveChanges = async () => {
    try {
      await updateSettings(formData);
      toast.success('Security settings saved successfully');
    } catch (err) {
      toast.error('Failed to save security settings');
      console.error('Error saving security settings:', err);
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
      <SettingsCard title="Security Settings" description="Loading...">
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gym-orange"></div>
        </div>
      </SettingsCard>
    );
  }
  
  if (error || !settings) {
    return (
      <SettingsCard 
        title="Security Settings" 
        description="Error loading settings"
        saveState={SaveState.Error}
      >
        <div className="p-4 bg-red-50 text-red-800 rounded-md flex items-start gap-3">
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Failed to load security settings</p>
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
      title="Security Settings" 
      description="Configure password policies and security settings"
      saveState={saveState}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between space-x-2 py-2">
          <div>
            <Label htmlFor="enable_2fa" className="font-medium">Enable Two-Factor Authentication</Label>
            <p className="text-sm text-muted-foreground">Require staff to use 2FA when signing in</p>
          </div>
          <Switch
            id="enable_2fa"
            checked={formData.enable_2fa || false}
            onCheckedChange={(checked) => handleInputChange('enable_2fa', checked)}
          />
        </div>
        
        <div className="space-y-4 border-t border-b py-4">
          <h3 className="font-medium">Password Requirements</h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Minimum Password Length: {formData.min_password_length} characters</Label>
                <span className="text-sm">{formData.min_password_length}</span>
              </div>
              <Slider
                value={formData.min_password_length ? [formData.min_password_length] : [8]}
                min={6}
                max={16}
                step={1}
                onValueChange={([value]) => handleInputChange('min_password_length', value)}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div>
                <Label htmlFor="require_special_chars" className="font-medium">Require Special Characters</Label>
                <p className="text-sm text-muted-foreground">Passwords must contain symbols like @, #, $, etc.</p>
              </div>
              <Switch
                id="require_special_chars"
                checked={formData.require_special_chars || false}
                onCheckedChange={(checked) => handleInputChange('require_special_chars', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div>
                <Label htmlFor="require_numbers" className="font-medium">Require Numbers</Label>
                <p className="text-sm text-muted-foreground">Passwords must contain at least one number</p>
              </div>
              <Switch
                id="require_numbers"
                checked={formData.require_numbers || false}
                onCheckedChange={(checked) => handleInputChange('require_numbers', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div>
                <Label htmlFor="require_uppercase" className="font-medium">Require Uppercase</Label>
                <p className="text-sm text-muted-foreground">Passwords must contain at least one uppercase letter</p>
              </div>
              <Switch
                id="require_uppercase"
                checked={formData.require_uppercase || false}
                onCheckedChange={(checked) => handleInputChange('require_uppercase', checked)}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4 pt-2">
          <h3 className="font-medium">Session Settings</h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Session Timeout: {formData.session_timeout_minutes} minutes</Label>
              <span className="text-sm">{formData.session_timeout_minutes} min</span>
            </div>
            <Slider
              value={formData.session_timeout_minutes ? [formData.session_timeout_minutes] : [60]}
              min={15}
              max={240}
              step={15}
              onValueChange={([value]) => handleInputChange('session_timeout_minutes', value)}
            />
            <p className="text-sm text-muted-foreground pt-1">
              Users will be automatically logged out after this period of inactivity
            </p>
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

export default SecuritySettings;
