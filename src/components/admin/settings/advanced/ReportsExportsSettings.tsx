
import React from 'react';
import { Download } from 'lucide-react';

const ReportsExportsSettings = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-sm min-h-[200px] flex flex-col justify-center items-center text-center">
      <Download className="h-12 w-12 text-gray-400 mb-3" />
      <h3 className="text-lg font-medium">Reports & Exports</h3>
      <p className="text-sm text-gray-500">Coming soon - Configure automated export settings</p>
    </div>
  );
};

export default ReportsExportsSettings;
