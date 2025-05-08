
import React from 'react';
import { Bell } from 'lucide-react';

const NotificationSettings = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-sm min-h-[200px] flex flex-col justify-center items-center text-center">
      <Bell className="h-12 w-12 text-gray-400 mb-3" />
      <h3 className="text-lg font-medium">Notification Settings</h3>
      <p className="text-sm text-gray-500">Coming soon - Configure email templates and SMS notifications</p>
    </div>
  );
};

export default NotificationSettings;
