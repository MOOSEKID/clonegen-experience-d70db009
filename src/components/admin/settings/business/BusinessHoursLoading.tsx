
import React from 'react';
import SettingsCard from '../SettingsCard';
import { Skeleton } from '@/components/ui/skeleton';

const BusinessHoursLoading = () => {
  return (
    <SettingsCard title="Business Hours" description="Loading business hours...">
      <div className="space-y-6">
        {/* Skeleton loaders for each day of the week */}
        {Array(7).fill(0).map((_, index) => (
          <div key={index} className="border rounded-md p-4 space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-5 w-16" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SettingsCard>
  );
};

export default BusinessHoursLoading;
