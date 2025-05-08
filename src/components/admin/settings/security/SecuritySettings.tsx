
import { useSettings, SaveState } from '@/hooks/admin/useSettings';
import SettingsCard from '../SettingsCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

interface SecuritySettingsData {
  id: string;
  enable_2fa: boolean;
  min_password_length: number;
  require_special_chars: boolean;
  require_numbers: boolean;
  require_uppercase: boolean;
  session_timeout_minutes: number;
}

const SecuritySettings = () => {
  const { 
    data: settings, 
    loading, 
    error, 
    updateSettings, 
    saveState
  } = useSettings<SecuritySettingsData>({ 
    tableName: 'settings_security' 
  });
  
  // Handle security setting changes
  const handleSecurityChange = (field: keyof SecuritySettingsData, value: any) => {
    updateSettings({ [field]: value });
  };

  if (loading) {
    return (
      <SettingsCard title="Security Settings" description="Loading settings...">
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
            checked={settings.enable_2fa}
            onCheckedChange={(checked) => handleSecurityChange('enable_2fa', checked)}
          />
        </div>
        
        <div className="space-y-4 border-t border-b py-4">
          <h3 className="font-medium">Password Requirements</h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Minimum Password Length: {settings.min_password_length} characters</Label>
                <span className="text-sm">{settings.min_password_length}</span>
              </div>
              <Slider
                value={[settings.min_password_length]}
                min={6}
                max={16}
                step={1}
                onValueChange={([value]) => handleSecurityChange('min_password_length', value)}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div>
                <Label htmlFor="require_special_chars" className="font-medium">Require Special Characters</Label>
                <p className="text-sm text-muted-foreground">Passwords must contain symbols like @, #, $, etc.</p>
              </div>
              <Switch
                id="require_special_chars"
                checked={settings.require_special_chars}
                onCheckedChange={(checked) => handleSecurityChange('require_special_chars', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div>
                <Label htmlFor="require_numbers" className="font-medium">Require Numbers</Label>
                <p className="text-sm text-muted-foreground">Passwords must contain at least one number</p>
              </div>
              <Switch
                id="require_numbers"
                checked={settings.require_numbers}
                onCheckedChange={(checked) => handleSecurityChange('require_numbers', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <div>
                <Label htmlFor="require_uppercase" className="font-medium">Require Uppercase</Label>
                <p className="text-sm text-muted-foreground">Passwords must contain at least one uppercase letter</p>
              </div>
              <Switch
                id="require_uppercase"
                checked={settings.require_uppercase}
                onCheckedChange={(checked) => handleSecurityChange('require_uppercase', checked)}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4 pt-2">
          <h3 className="font-medium">Session Settings</h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Session Timeout: {settings.session_timeout_minutes} minutes</Label>
              <span className="text-sm">{settings.session_timeout_minutes} min</span>
            </div>
            <Slider
              value={[settings.session_timeout_minutes]}
              min={15}
              max={240}
              step={15}
              onValueChange={([value]) => handleSecurityChange('session_timeout_minutes', value)}
            />
            <p className="text-sm text-muted-foreground pt-1">
              Users will be automatically logged out after this period of inactivity
            </p>
          </div>
        </div>
      </div>
    </SettingsCard>
  );
};

export default SecuritySettings;
