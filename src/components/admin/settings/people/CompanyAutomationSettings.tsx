
import React from 'react';
import { BarChart } from 'lucide-react';

const CompanyAutomationSettings = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-sm min-h-[200px] flex flex-col justify-center items-center text-center">
      <BarChart className="h-12 w-12 text-gray-400 mb-3" />
      <h3 className="text-lg font-medium">Company Automation</h3>
      <p className="text-sm text-gray-500">Coming soon - Set attendance reports and invoicing rules</p>
    </div>
  );
};

export default CompanyAutomationSettings;
