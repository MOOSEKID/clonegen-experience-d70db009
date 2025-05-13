
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
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null);
  
  // Mock performance data
  const getPerformanceMetrics = (): PerformanceMetrics => {
    const metrics = {
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

    // Set the metrics in state as well
    setPerformanceMetrics(metrics);
    return metrics;
  };

  // Initialize performance metrics when the hook is called
  if (!performanceMetrics && !isLoading) {
    getPerformanceMetrics();
  }

  return {
    isLoading,
    error,
    performanceMetrics,
    getPerformanceMetrics
  };
};
