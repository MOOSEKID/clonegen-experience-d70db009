
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const InvoiceTemplatesSettings = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileText className="h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">Invoice Templates</h3>
          <p className="text-gray-500 max-w-md">
            This feature is coming soon. It will allow you to customize invoice appearance, add logos, and set default payment terms.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceTemplatesSettings;
