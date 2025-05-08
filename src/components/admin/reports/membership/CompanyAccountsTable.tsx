
import { useEffect, useState } from 'react';
import ReportCard from '../ReportCard';

interface CompanyAccountsTableProps {
  fromDate?: Date;
  toDate?: Date;
}

const CompanyAccountsTable = ({ fromDate, toDate }: CompanyAccountsTableProps) => {
  return (
    <div className="space-y-6">
      <ReportCard 
        title="Company Accounts" 
        description="Coming soon"
        allowDownload={false}
      >
        <div className="h-60 flex items-center justify-center">
          <p className="text-gray-500">Company accounts feature is under development</p>
        </div>
      </ReportCard>
    </div>
  );
};

export default CompanyAccountsTable;
