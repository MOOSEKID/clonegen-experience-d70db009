
import React from 'react';
import { Download, Zap, TestTube, MessageSquare } from 'lucide-react';
import ReportsExportsSettings from './advanced/ReportsExportsSettings';
import AutomationRulesSettings from './advanced/AutomationRulesSettings';
import TestAccountSettings from './advanced/TestAccountSettings';
import CustomMessagesSettings from './advanced/CustomMessagesSettings';

const AdvancedTabContent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ReportsExportsSettings />
      <AutomationRulesSettings />
      <TestAccountSettings />
      <CustomMessagesSettings />
    </div>
  );
};

export default AdvancedTabContent;
