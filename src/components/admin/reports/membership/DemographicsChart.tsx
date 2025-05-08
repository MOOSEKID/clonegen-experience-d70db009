
import { useEffect, useState } from 'react';
import ReportCard from '../ReportCard';

interface DemographicsChartProps {
  fromDate?: Date;
  toDate?: Date;
}

const DemographicsChart = ({ fromDate, toDate }: DemographicsChartProps) => {
  return (
    <div className="space-y-6">
      <ReportCard 
        title="Member Demographics" 
        description="Coming soon"
        allowDownload={false}
      >
        <div className="h-60 flex items-center justify-center">
          <p className="text-gray-500">Member demographics feature is under development</p>
        </div>
      </ReportCard>
    </div>
  );
};

export default DemographicsChart;
