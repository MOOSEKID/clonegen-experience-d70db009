
import React from 'react';
import { DollarSign } from 'lucide-react';
import SettingsCard from '../SettingsCard';
import { useSettings, SaveState } from '@/hooks/admin/useSettings';

interface IntegrationsSettingsData {
  id: string;
  stripe_public_key: string;
  stripe_secret_key: string;
  mtn_api_key: string;
  airtel_api_key: string;
  twilio_sid: string;
  twilio_token: string;
  smtp_host: string;
  smtp_port: number;
  smtp_user: string;
  smtp_password: string;
}

const IntegrationsSettings = () => {
  const { 
    data: settings, 
    loading, 
    error, 
    updateSettings, 
    saveState 
  } = useSettings<IntegrationsSettingsData>({ 
    tableName: 'settings_integrations' 
  });

  // This is a placeholder for now
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-sm min-h-[200px] flex flex-col justify-center items-center text-center">
      <DollarSign className="h-12 w-12 text-gray-400 mb-3" />
      <h3 className="text-lg font-medium">Integrations</h3>
      <p className="text-sm text-gray-500">Coming soon - API keys for Stripe, MTN, Airtel, etc.</p>
    </div>
  );
};

export default IntegrationsSettings;
