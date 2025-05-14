import { useState, useEffect } from 'react';
import { useSettings, SaveState } from '@/hooks/admin/useSettings';
import SettingsCard from '../SettingsCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import FileUpload from '../FileUpload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Loader2, Save, RotateCcw, AlertCircle, Sun, Moon } from 'lucide-react';
import { toast } from 'sonner';
import { PhoneInput } from './PhoneInput';
import { LogoPreview } from './LogoPreview';
import { languages, currencies, timezones, isValidEmail } from './optionsData';
import { useIsMobile } from '@/hooks/use-mobile';

interface GeneralSettingsData {
  id: string;
  gym_name: string;
  contact_email: string;
  contact_phone: string;
  currency: string;
  default_language: string;
  timezone: string;
  dark_mode_enabled: boolean;
  logo_light_url: string;
  logo_dark_url: string;
  updatedAt?: string; // Add this field to match what we're sending to the API
}

const GeneralSettings = () => {
  // Get mobile screen size
  const isMobile = useIsMobile();
  
  const { 
    data: settings, 
    loading, 
    error, 
    updateSettings, 
    saveState,
    refresh
  } = useSettings<GeneralSettingsData>({ 
    tableName: 'settings_general' 
  });
  
  // Form state
  const [formData, setFormData] = useState<Partial<GeneralSettingsData>>({});
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [previewDarkMode, setPreviewDarkMode] = useState<boolean>(false);
  const [isTestingDarkMode, setIsTestingDarkMode] = useState<boolean>(false);
  
  // Initialize form data from settings
  useEffect(() => {
    if (settings) {
      setFormData(settings);
      setPreviewDarkMode(settings.dark_mode_enabled || false);
    }
  }, [settings]);
  
  // Check for changes between form data and original settings
  useEffect(() => {
    if (settings && formData) {
      const changes = Object.keys(formData).some(key => {
        // Skip comparing logo URLs if they're empty in form data
        if ((key === 'logo_light_url' || key === 'logo_dark_url') && !formData[key as keyof typeof formData]) {
          return false;
        }
        return formData[key as keyof typeof formData] !== settings[key as keyof typeof settings];
      });
      
      setHasChanges(changes);
    }
  }, [formData, settings]);
  
  // Handle input changes
  const handleInputChange = (field: keyof GeneralSettingsData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validate fields
    validateField(field, value);
  };
  
  // Validate a specific field
  const validateField = (field: keyof GeneralSettingsData, value: any) => {
    const errors: Record<string, string> = { ...validationErrors };
    
    switch (field) {
      case 'gym_name':
        if (!value) {
          errors.gym_name = 'Gym name is required';
        } else {
          delete errors.gym_name;
        }
        break;
        
      case 'contact_email':
        if (value && !isValidEmail(value)) {
          errors.contact_email = 'Please enter a valid email address';
        } else {
          delete errors.contact_email;
        }
        break;
    }
    
    setValidationErrors(errors);
    setIsValid(Object.keys(errors).length === 0);
  };
  
  // Handle phone input change with validation
  const handlePhoneChange = (value: string, isPhoneValid: boolean) => {
    handleInputChange('contact_phone', value);
    setValidationErrors(prev => ({
      ...prev,
      contact_phone: isPhoneValid ? '' : 'Please enter a valid Rwandan phone number'
    }));
  };
  
  // Validate entire form
  const validateForm = () => {
    const errors: Record<string, string> = {};
    let formIsValid = true;
    
    // Required fields
    if (!formData.gym_name) {
      errors.gym_name = 'Gym name is required';
      formIsValid = false;
    }
    
    // Email validation
    if (formData.contact_email && !isValidEmail(formData.contact_email)) {
      errors.contact_email = 'Please enter a valid email address';
      formIsValid = false;
    }
    
    setValidationErrors(errors);
    setIsValid(formIsValid);
    return formIsValid;
  };
  
  // Save changes
  const saveChanges = async () => {
    if (!validateForm()) {
      toast.error('Please fix the validation errors before saving');
      return;
    }
    
    try {
      await updateSettings(formData);
      toast.success('Settings saved successfully');
    } catch (err) {
      toast.error('Failed to save settings');
      console.error('Error saving settings:', err);
    }
  };
  
  // Reset changes
  const resetChanges = () => {
    if (settings) {
      setFormData(settings);
      setValidationErrors({});
      setPreviewDarkMode(settings.dark_mode_enabled || false);
      toast.info('Changes have been reset');
    }
  };
  
  // Toggle dark mode preview
  const toggleDarkModePreview = () => {
    setPreviewDarkMode(prev => !prev);
  };
  
  // Test dark mode (doesn't affect form data)
  const handleTestDarkMode = () => {
    setIsTestingDarkMode(prev => !prev);
    document.documentElement.classList.toggle('dark', !isTestingDarkMode);
    toast.info(isTestingDarkMode ? 'Light mode preview' : 'Dark mode preview', {
      description: 'This is just a preview. Save changes to apply permanently.'
    });
  };
  
  useEffect(() => {
    // Cleanup dark mode test when component unmounts
    return () => {
      if (isTestingDarkMode) {
        document.documentElement.classList.remove('dark');
      }
    };
  }, [isTestingDarkMode]);
  
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
        <div className="p-4 bg-red-50 text-red-800 rounded-md flex items-start gap-3">
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Failed to load settings</p>
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
  
  const renderFormContent = () => (
    <>
      <div className="space-y-6">
        {/* Basic Information */}
        {isMobile ? (
          <Accordion type="single" collapsible defaultValue="basic-info">
            <AccordionItem value="basic-info">
              <AccordionTrigger className="text-base font-medium">Basic Information</AccordionTrigger>
              <AccordionContent>
                {renderBasicInfoFields()}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="appearance">
              <AccordionTrigger className="text-base font-medium">Appearance</AccordionTrigger>
              <AccordionContent>
                {renderAppearanceFields()}
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="preferences">
              <AccordionTrigger className="text-base font-medium">System Preferences</AccordionTrigger>
              <AccordionContent>
                {renderPreferenceFields()}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          <>
            <div className="space-y-6">
              <h3 className="text-base font-medium">Basic Information</h3>
              {renderBasicInfoFields()}
            </div>
            
            <div className="space-y-6">
              <h3 className="text-base font-medium">Appearance</h3>
              {renderAppearanceFields()}
            </div>
            
            <div className="space-y-6">
              <h3 className="text-base font-medium">System Preferences</h3>
              {renderPreferenceFields()}
            </div>
          </>
        )}
      </div>

      {/* Save & Reset Buttons */}
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
          disabled={!hasChanges || saveState === SaveState.Saving || !isValid}
          onClick={saveChanges}
        >
          {saveState === SaveState.Saving ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Changes
        </Button>
        
        <Button 
          type="button" 
          variant="secondary"
          onClick={handleTestDarkMode}
        >
          {isTestingDarkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
          Test {isTestingDarkMode ? 'Light' : 'Dark'} Mode
        </Button>
      </div>
    </>
  );
  
  const renderBasicInfoFields = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="gym_name" className={validationErrors.gym_name ? "text-red-500" : ""}>
          Gym Name *
        </Label>
        <Input
          id="gym_name"
          value={formData.gym_name || ''}
          onChange={(e) => handleInputChange('gym_name', e.target.value)}
          className={validationErrors.gym_name ? "border-red-500" : ""}
        />
        {validationErrors.gym_name && (
          <p className="text-xs text-red-500">{validationErrors.gym_name}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contact_email" className={validationErrors.contact_email ? "text-red-500" : ""}>
            Contact Email
          </Label>
          <Input
            id="contact_email"
            type="email"
            value={formData.contact_email || ''}
            onChange={(e) => handleInputChange('contact_email', e.target.value)}
            className={validationErrors.contact_email ? "border-red-500" : ""}
            placeholder="contact@example.com"
          />
          {validationErrors.contact_email && (
            <p className="text-xs text-red-500">{validationErrors.contact_email}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contact_phone" className={validationErrors.contact_phone ? "text-red-500" : ""}>
            Contact Phone
          </Label>
          <PhoneInput
            value={formData.contact_phone || ''}
            onChange={handlePhoneChange}
            placeholder="+250781234567"
          />
          {validationErrors.contact_phone && (
            <p className="text-xs text-red-500">{validationErrors.contact_phone}</p>
          )}
        </div>
      </div>
    </div>
  );
  
  const renderAppearanceFields = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
        <div className="space-y-3">
          <Label>Logo (Light Theme)</Label>
          <FileUpload 
            bucket="settings"
            path="logos"
            maxSizeMB={2}
            currentFilePath={formData.logo_light_url || ''}
            onUploadComplete={(filePath) => handleInputChange('logo_light_url', filePath)}
            onReset={() => handleInputChange('logo_light_url', '')}
            label="Upload Light Logo"
            accept="image/*"
          />
          <p className="text-xs text-gray-500">Recommended size: 200 x 80px. JPG, PNG, or SVG. Max 2MB.</p>
        </div>
        
        <div className="space-y-3">
          <Label>Logo (Dark Theme)</Label>
          <FileUpload 
            bucket="settings"
            path="logos"
            maxSizeMB={2}
            currentFilePath={formData.logo_dark_url || ''}
            onUploadComplete={(filePath) => handleInputChange('logo_dark_url', filePath)}
            onReset={() => handleInputChange('logo_dark_url', '')}
            label="Upload Dark Logo"
            accept="image/*"
          />
          <p className="text-xs text-gray-500">Recommended size: 200 x 80px. JPG, PNG, or SVG. Max 2MB.</p>
        </div>
      </div>
      
      <div className="pt-2">
        <LogoPreview 
          lightLogo={formData.logo_light_url}
          darkLogo={formData.logo_dark_url}
          isDarkMode={previewDarkMode}
          onToggleMode={toggleDarkModePreview}
        />
      </div>
      
      <div className="flex items-center space-x-2 pt-2">
        <Switch
          id="dark_mode_enabled"
          checked={formData.dark_mode_enabled || false}
          onCheckedChange={(checked) => {
            handleInputChange('dark_mode_enabled', checked);
          }}
        />
        <Label htmlFor="dark_mode_enabled">Enable Dark Mode by Default</Label>
      </div>
    </div>
  );
  
  const renderPreferenceFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label htmlFor="currency">Currency</Label>
        <Select 
          value={formData.currency || 'RWF'} 
          onValueChange={(value) => handleInputChange('currency', value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            {currencies.map(currency => (
              <SelectItem key={currency.code} value={currency.code}>
                {currency.code} - {currency.name} ({currency.symbol})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="default_language">Default Language</Label>
        <Select 
          value={formData.default_language || 'en'} 
          onValueChange={(value) => handleInputChange('default_language', value)}
        >
          <SelectTrigger className="w-full">
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
          value={formData.timezone || 'Africa/Kigali'} 
          onValueChange={(value) => handleInputChange('timezone', value)}
        >
          <SelectTrigger className="w-full">
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
  );
  
  return (
    <SettingsCard 
      title="General Settings" 
      description="Configure your gym's basic information and appearance"
      saveState={saveState}
    >
      {renderFormContent()}
    </SettingsCard>
  );
};

export default GeneralSettings;
