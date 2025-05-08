
import React from 'react';
import { Store, DollarSign } from 'lucide-react';
import GeneralSettings from './general/GeneralSettings';
import SecuritySettings from './security/SecuritySettings';
import PlatformSettings from './platform/PlatformSettings';
import IntegrationsSettings from './integrations/IntegrationsSettings';
import BusinessHoursSettings from './business/BusinessHoursSettings';

const SystemTabContent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <GeneralSettings />
        <SecuritySettings />
        <div className="grid grid-cols-1 gap-6">
          <PlatformSettings />
          <IntegrationsSettings />
        </div>
      </div>
      
      <BusinessHoursSettings />
    </div>
  );
};

export default SystemTabContent;
