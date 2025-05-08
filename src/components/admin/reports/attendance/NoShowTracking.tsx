
import { useEffect, useState } from 'react';
import ReportCard from '../ReportCard';

interface NoShowTrackingProps {
  fromDate?: Date;
  toDate?: Date;
}

const NoShowTracking = ({ fromDate, toDate }: NoShowTrackingProps) => {
  return (
    <div className="space-y-6">
      <ReportCard 
        title="No-Show Tracking" 
        description="Coming soon"
        allowDownload={false}
      >
        <div className="h-60 flex items-center justify-center">
          <p className="text-gray-500">No-show tracking feature is under development</p>
        </div>
      </ReportCard>
    </div>
  );
};

export default NoShowTracking;
