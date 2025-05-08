
import React from 'react';
import { User } from 'lucide-react';

const DefaultMemberSettings = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-sm min-h-[200px] flex flex-col justify-center items-center text-center">
      <User className="h-12 w-12 text-gray-400 mb-3" />
      <h3 className="text-lg font-medium">Default Member Settings</h3>
      <p className="text-sm text-gray-500">Coming soon - Configure default plans and renewal options</p>
    </div>
  );
};

export default DefaultMemberSettings;
