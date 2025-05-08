
import { useEffect, useState } from 'react';
import ReportCard from '../ReportCard';

interface OutstandingInvoicesProps {
  fromDate?: Date;
  toDate?: Date;
}

const OutstandingInvoices = ({ fromDate, toDate }: OutstandingInvoicesProps) => {
  return (
    <div className="space-y-6">
      <ReportCard 
        title="Outstanding Invoices" 
        description="Coming soon"
        allowDownload={false}
      >
        <div className="h-60 flex items-center justify-center">
          <p className="text-gray-500">Outstanding Invoices reports feature is under development</p>
        </div>
      </ReportCard>
    </div>
  );
};

export default OutstandingInvoices;
