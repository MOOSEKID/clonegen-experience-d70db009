
import React from 'react';
import { Store } from 'lucide-react';
import SettingsCard from '../SettingsCard';
import { useSettings, SaveState } from '@/hooks/admin/useSettings';

interface PlatformSettingsData {
  id: string;
  enable_shop: boolean;
  enable_trainers: boolean;
  enable_support: boolean;
  enable_reports: boolean;
  enable_test_mode: boolean;
}

const PlatformSettings = () => {
  const { 
    data: settings, 
    loading, 
    error, 
    updateSettings, 
    saveState 
  } = useSettings<PlatformSettingsData>({ 
    tableName: 'settings_platform' 
  });

  // This is a placeholder for now
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-sm min-h-[200px] flex flex-col justify-center items-center text-center">
      <Store className="h-12 w-12 text-gray-400 mb-3" />
      <h3 className="text-lg font-medium">Platform Settings</h3>
      <p className="text-sm text-gray-500">Coming soon - Enable/disable features, test mode</p>
    </div>
  );
};

export default PlatformSettings;
