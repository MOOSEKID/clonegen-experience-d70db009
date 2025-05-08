
import { useEffect, useState } from 'react';
import ReportCard from '../ReportCard';

interface RetentionChartProps {
  fromDate?: Date;
  toDate?: Date;
}

const RetentionChart = ({ fromDate, toDate }: RetentionChartProps) => {
  return (
    <div className="space-y-6">
      <ReportCard 
        title="Retention Metrics" 
        description="Coming soon"
        allowDownload={false}
      >
        <div className="h-60 flex items-center justify-center">
          <p className="text-gray-500">Retention metrics feature is under development</p>
        </div>
      </ReportCard>
    </div>
  );
};

export default RetentionChart;
