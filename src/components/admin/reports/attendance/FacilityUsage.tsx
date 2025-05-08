
import { useEffect, useState } from 'react';
import ReportCard from '../ReportCard';

interface FacilityUsageProps {
  fromDate?: Date;
  toDate?: Date;
}

const FacilityUsage = ({ fromDate, toDate }: FacilityUsageProps) => {
  return (
    <div className="space-y-6">
      <ReportCard 
        title="Facility Usage" 
        description="Coming soon"
        allowDownload={false}
      >
        <div className="h-60 flex items-center justify-center">
          <p className="text-gray-500">Facility usage feature is under development</p>
        </div>
      </ReportCard>
    </div>
  );
};

export default FacilityUsage;
