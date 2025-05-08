
import React from 'react';
import { FileText } from 'lucide-react';

const InvoiceTemplatesSettings = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-sm min-h-[200px] flex flex-col justify-center items-center text-center">
      <FileText className="h-12 w-12 text-gray-400 mb-3" />
      <h3 className="text-lg font-medium">Invoice Templates</h3>
      <p className="text-sm text-gray-500">Coming soon - Customize invoice appearance and content</p>
    </div>
  );
};

export default InvoiceTemplatesSettings;
