
import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ExerciseLibrarySkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <Skeleton className="h-[200px] w-full" />
          <div className="p-6">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <div className="flex flex-wrap mt-2 gap-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="flex justify-between mt-4">
              <Skeleton className="h-8 w-[70px]" />
              <Skeleton className="h-8 w-[100px]" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ExerciseLibrarySkeleton;
