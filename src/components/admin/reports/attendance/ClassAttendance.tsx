
import { useEffect, useState } from 'react';
import ReportCard from '../ReportCard';

interface ClassAttendanceProps {
  fromDate?: Date;
  toDate?: Date;
}

const ClassAttendance = ({ fromDate, toDate }: ClassAttendanceProps) => {
  return (
    <div className="space-y-6">
      <ReportCard 
        title="Class Attendance" 
        description="Coming soon"
        allowDownload={false}
      >
        <div className="h-60 flex items-center justify-center">
          <p className="text-gray-500">Class attendance feature is under development</p>
        </div>
      </ReportCard>
    </div>
  );
};

export default ClassAttendance;
