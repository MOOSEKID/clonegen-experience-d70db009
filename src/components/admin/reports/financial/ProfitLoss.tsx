
import { useEffect, useState } from 'react';
import ReportCard from '../ReportCard';

interface ProfitLossProps {
  fromDate?: Date;
  toDate?: Date;
}

const ProfitLoss = ({ fromDate, toDate }: ProfitLossProps) => {
  return (
    <div className="space-y-6">
      <ReportCard 
        title="Profit & Loss" 
        description="Coming soon"
        allowDownload={false}
      >
        <div className="h-60 flex items-center justify-center">
          <p className="text-gray-500">Profit & Loss reports feature is under development</p>
        </div>
      </ReportCard>
    </div>
  );
};

export default ProfitLoss;
