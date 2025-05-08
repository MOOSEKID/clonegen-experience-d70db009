
import React from 'react';
import { Shield } from 'lucide-react';

const UserPermissionsSettings = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-sm min-h-[200px] flex flex-col justify-center items-center text-center">
      <Shield className="h-12 w-12 text-gray-400 mb-3" />
      <h3 className="text-lg font-medium">User Permissions</h3>
      <p className="text-sm text-gray-500">Coming soon - Create and manage user roles</p>
    </div>
  );
};

export default UserPermissionsSettings;
