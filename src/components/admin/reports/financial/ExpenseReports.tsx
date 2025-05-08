
import { useEffect, useState } from 'react';
import ReportCard from '../ReportCard';

interface ExpenseReportsProps {
  fromDate?: Date;
  toDate?: Date;
}

const ExpenseReports = ({ fromDate, toDate }: ExpenseReportsProps) => {
  return (
    <div className="space-y-6">
      <ReportCard 
        title="Expense Reports" 
        description="Coming soon"
        allowDownload={false}
      >
        <div className="h-60 flex items-center justify-center">
          <p className="text-gray-500">Expense reports feature is under development</p>
        </div>
      </ReportCard>
    </div>
  );
};

export default ExpenseReports;
