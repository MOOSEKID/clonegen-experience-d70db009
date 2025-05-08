
import { useEffect, useState } from 'react';
import ReportCard from '../ReportCard';

interface MemberProgressProps {
  fromDate?: Date;
  toDate?: Date;
}

const MemberProgress = ({ fromDate, toDate }: MemberProgressProps) => {
  return (
    <div className="space-y-6">
      <ReportCard 
        title="Member Progress" 
        description="Coming soon"
        allowDownload={false}
      >
        <div className="h-60 flex items-center justify-center">
          <p className="text-gray-500">Member progress feature is under development</p>
        </div>
      </ReportCard>
    </div>
  );
};

export default MemberProgress;
