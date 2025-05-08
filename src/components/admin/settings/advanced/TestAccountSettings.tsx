
import React from 'react';
import { TestTube } from 'lucide-react';

const TestAccountSettings = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-sm min-h-[200px] flex flex-col justify-center items-center text-center">
      <TestTube className="h-12 w-12 text-gray-400 mb-3" />
      <h3 className="text-lg font-medium">Test Account Settings</h3>
      <p className="text-sm text-gray-500">Coming soon - Manage test accounts and mode</p>
    </div>
  );
};

export default TestAccountSettings;
