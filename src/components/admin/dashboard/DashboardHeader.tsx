
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardHeaderProps {
  timeFilter: string;
  setTimeFilter: (filter: string) => void;
}

const DashboardHeader = ({ timeFilter, setTimeFilter }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Overview of your gym's performance and metrics</p>
      </div>
      
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              {timeFilter === 'daily' && 'Daily'}
              {timeFilter === 'weekly' && 'Weekly'}
              {timeFilter === 'monthly' && 'Monthly'}
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setTimeFilter('daily')}>
              Daily
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeFilter('weekly')}>
              Weekly
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeFilter('monthly')}>
              Monthly
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button>Download Report</Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
