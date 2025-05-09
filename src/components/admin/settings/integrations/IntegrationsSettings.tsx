
import { useState, useEffect } from 'react';
import { useSettings, SaveState } from '@/hooks/admin/useSettings';
import SettingsCard from '../SettingsCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save, RotateCcw, AlertCircle, EyeIcon, EyeOffIcon, CreditCard, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface IntegrationsSettingsData {
  id: string;
  stripe_public_key: string;
  stripe_secret_key: string;
  mtn_api_key: string;
  airtel_api_key: string;
  smtp_host: string;
  smtp_port: number;
  smtp_user: string;
  smtp_password: string;
  twilio_sid: string;
  twilio_token: string;
  test_mode: boolean;
  updated_at?: string;
}

const IntegrationsSettings = () => {
  const isMobile = useIsMobile();
  
  const { 
    data: settings, 
    loading, 
    error, 
    updateSettings, 
    saveState,
    refresh
  } = useSettings<IntegrationsSettingsData>({ 
    tableName: 'settings_integrations' 
  });
  
  const [formData, setFormData] = useState<Partial<IntegrationsSettingsData>>({});
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [showSecrets, setShowSecrets] = useState<{[key: string]: boolean}>({});
  const [activeTab, setActiveTab] = useState('payments');

  // Initialize form data from settings
  useEffect(() => {
    if (settings) {
      setFormData(settings);
      
      // Initialize showSecrets with all secrets hidden
      const secrets: {[key: string]: boolean} = {};
      ['stripe_secret_key', 'mtn_api_key', 'airtel_api_key', 'smtp_password', 'twilio_token'].forEach(key => {
        secrets[key] = false;
      });
      setShowSecrets(secrets);
    }
  }, [settings]);
  
  // Check for changes between form data and original settings
  useEffect(() => {
    if (settings && formData) {
      const changes = Object.keys(formData).some(key => {
        return formData[key as keyof IntegrationsSettingsData] !== settings[key as keyof IntegrationsSettingsData];
      });
      
      setHasChanges(changes);
    }
  }, [formData, settings]);
  
  const handleInputChange = (field: keyof IntegrationsSettingsData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const toggleShowSecret = (field: string) => {
    setShowSecrets(prev => ({ ...prev, [field]: !prev[field] }));
  };
  
  const saveChanges = async () => {
    try {
      await updateSettings(formData);
      toast.success('Integration settings saved successfully');
    } catch (err) {
      toast.error('Failed to save integration settings');
      console.error('Error saving integration settings:', err);
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
      <SettingsCard title="Integrations" description="Loading...">
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gym-orange"></div>
        </div>
      </SettingsCard>
    );
  }
  
  if (error || !settings) {
    return (
      <SettingsCard 
        title="Integrations" 
        description="Error loading settings"
        saveState={SaveState.Error}
      >
        <div className="p-4 bg-red-50 text-red-800 rounded-md flex items-start gap-3">
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Failed to load integration settings</p>
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
      title="Integrations" 
      description="Configure external service integrations"
      saveState={saveState}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between space-x-2 py-2 mb-4">
          <div>
            <Label htmlFor="test_mode" className="font-medium">Test Mode</Label>
            <p className="text-sm text-muted-foreground">Use test credentials for all integrations</p>
          </div>
          <Switch
            id="test_mode"
            checked={formData.test_mode || false}
            onCheckedChange={(checked) => handleInputChange('test_mode', checked)}
          />
        </div>
        
        <Tabs
          defaultValue="payments"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="payments" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className={isMobile ? 'sr-only' : ''}>Payment Gateways</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span className={isMobile ? 'sr-only' : ''}>Email Server</span>
            </TabsTrigger>
            <TabsTrigger value="sms" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className={isMobile ? 'sr-only' : ''}>SMS Providers</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="payments" className="space-y-6 pt-2">
            <div className="space-y-4 border-b pb-6">
              <h3 className="font-medium">Stripe Integration</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stripe_public_key">Public Key</Label>
                  <Input
                    id="stripe_public_key"
                    placeholder="pk_..."
                    value={formData.stripe_public_key || ''}
                    onChange={(e) => handleInputChange('stripe_public_key', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stripe_secret_key">Secret Key</Label>
                  <div className="flex">
                    <Input
                      id="stripe_secret_key"
                      type={showSecrets.stripe_secret_key ? 'text' : 'password'}
                      placeholder="sk_..."
                      value={formData.stripe_secret_key || ''}
                      onChange={(e) => handleInputChange('stripe_secret_key', e.target.value)}
                      className="rounded-r-none"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => toggleShowSecret('stripe_secret_key')}
                      className="rounded-l-none"
                    >
                      {showSecrets.stripe_secret_key ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Find your API keys in the{' '}
                  <a 
                    href="https://dashboard.stripe.com/apikeys" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Stripe Dashboard
                  </a>
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="email" className="space-y-6 pt-2">
            <div className="space-y-4">
              <h3 className="font-medium">SMTP Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp_host">SMTP Host</Label>
                  <Input
                    id="smtp_host"
                    placeholder="smtp.example.com"
                    value={formData.smtp_host || ''}
                    onChange={(e) => handleInputChange('smtp_host', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtp_port">SMTP Port</Label>
                  <Input
                    id="smtp_port"
                    type="number"
                    placeholder="587"
                    value={formData.smtp_port || ''}
                    onChange={(e) => handleInputChange('smtp_port', parseInt(e.target.value) || 587)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtp_user">SMTP Username</Label>
                  <Input
                    id="smtp_user"
                    placeholder="username@example.com"
                    value={formData.smtp_user || ''}
                    onChange={(e) => handleInputChange('smtp_user', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtp_password">SMTP Password</Label>
                  <div className="flex">
                    <Input
                      id="smtp_password"
                      type={showSecrets.smtp_password ? 'text' : 'password'}
                      placeholder="••••••••••••"
                      value={formData.smtp_password || ''}
                      onChange={(e) => handleInputChange('smtp_password', e.target.value)}
                      className="rounded-r-none"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => toggleShowSecret('smtp_password')}
                      className="rounded-l-none"
                    >
                      {showSecrets.smtp_password ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sms" className="space-y-6 pt-2">
            <div className="space-y-6">
              <div className="space-y-4 border-b pb-6">
                <h3 className="font-medium">MTN Mobile Money API</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="mtn_api_key">API Key</Label>
                  <div className="flex">
                    <Input
                      id="mtn_api_key"
                      type={showSecrets.mtn_api_key ? 'text' : 'password'}
                      placeholder="Enter MTN API Key"
                      value={formData.mtn_api_key || ''}
                      onChange={(e) => handleInputChange('mtn_api_key', e.target.value)}
                      className="rounded-r-none"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => toggleShowSecret('mtn_api_key')}
                      className="rounded-l-none"
                    >
                      {showSecrets.mtn_api_key ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 border-b pb-6">
                <h3 className="font-medium">Airtel Money API</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="airtel_api_key">API Key</Label>
                  <div className="flex">
                    <Input
                      id="airtel_api_key"
                      type={showSecrets.airtel_api_key ? 'text' : 'password'}
                      placeholder="Enter Airtel API Key"
                      value={formData.airtel_api_key || ''}
                      onChange={(e) => handleInputChange('airtel_api_key', e.target.value)}
                      className="rounded-r-none"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => toggleShowSecret('airtel_api_key')}
                      className="rounded-l-none"
                    >
                      {showSecrets.airtel_api_key ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Twilio SMS</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="twilio_sid">Account SID</Label>
                    <Input
                      id="twilio_sid"
                      placeholder="Enter Twilio Account SID"
                      value={formData.twilio_sid || ''}
                      onChange={(e) => handleInputChange('twilio_sid', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="twilio_token">Auth Token</Label>
                    <div className="flex">
                      <Input
                        id="twilio_token"
                        type={showSecrets.twilio_token ? 'text' : 'password'}
                        placeholder="Enter Twilio Auth Token"
                        value={formData.twilio_token || ''}
                        onChange={(e) => handleInputChange('twilio_token', e.target.value)}
                        className="rounded-r-none"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => toggleShowSecret('twilio_token')}
                        className="rounded-l-none"
                      >
                        {showSecrets.twilio_token ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Find your Twilio credentials in the{' '}
                    <a 
                      href="https://www.twilio.com/console" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Twilio Console
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
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

export default IntegrationsSettings;
