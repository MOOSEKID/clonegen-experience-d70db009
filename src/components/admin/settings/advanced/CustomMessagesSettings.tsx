
import React from 'react';
import { MessageSquare } from 'lucide-react';

const CustomMessagesSettings = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-sm min-h-[200px] flex flex-col justify-center items-center text-center">
      <MessageSquare className="h-12 w-12 text-gray-400 mb-3" />
      <h3 className="text-lg font-medium">Custom Messages</h3>
      <p className="text-sm text-gray-500">Coming soon - Create popups and motivational alerts</p>
    </div>
  );
};

export default CustomMessagesSettings;
