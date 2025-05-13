
import { useState } from 'react';

export interface PerformanceMetrics {
  attendance: {
    total: number;
    onTime: number;
    late: number;
    missed: number;
  };
  sessions: {
    total: number;
    completed: number;
    canceled: number;
    noShow: number;
  };
  ratings: {
    average: number;
    count: number;
  };
}

export const useTrainerPerformance = (staffId?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Mock performance data - to be replaced with real data when available
  const getPerformanceMetrics = (): PerformanceMetrics => {
    return {
      attendance: {
        total: 30,
        onTime: 27,
        late: 2,
        missed: 1
      },
      sessions: {
        total: 45,
        completed: 40,
        canceled: 3,
        noShow: 2
      },
      ratings: {
        average: 4.8,
        count: 35
      }
    };
  };

  return {
    isLoading,
    error,
    getPerformanceMetrics
  };
};
