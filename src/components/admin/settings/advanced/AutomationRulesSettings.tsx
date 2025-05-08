
import React from 'react';
import { Zap } from 'lucide-react';

const AutomationRulesSettings = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-sm min-h-[200px] flex flex-col justify-center items-center text-center">
      <Zap className="h-12 w-12 text-gray-400 mb-3" />
      <h3 className="text-lg font-medium">Automation Rules</h3>
      <p className="text-sm text-gray-500">Coming soon - Create trigger-based workflows</p>
    </div>
  );
};

export default AutomationRulesSettings;
