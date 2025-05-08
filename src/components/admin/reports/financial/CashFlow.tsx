
import { useEffect, useState } from 'react';
import ReportCard from '../ReportCard';

interface CashFlowProps {
  fromDate?: Date;
  toDate?: Date;
}

const CashFlow = ({ fromDate, toDate }: CashFlowProps) => {
  return (
    <div className="space-y-6">
      <ReportCard 
        title="Cash Flow" 
        description="Coming soon"
        allowDownload={false}
      >
        <div className="h-60 flex items-center justify-center">
          <p className="text-gray-500">Cash Flow reports feature is under development</p>
        </div>
      </ReportCard>
    </div>
  );
};

export default CashFlow;
