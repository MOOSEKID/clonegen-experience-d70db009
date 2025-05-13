
import { useState, useEffect } from 'react';
import { useTrainersData, Trainer } from '@/hooks/useTrainersData';

export const useTrainerProfiles = () => {
  const { trainers, isLoading, error } = useTrainersData();
  const [filteredTrainers, setFilteredTrainers] = useState<Trainer[]>([]);
  
  useEffect(() => {
    if (trainers) {
      setFilteredTrainers(trainers);
    }
  }, [trainers]);
  
  return {
    trainers: filteredTrainers,
    isLoading,
    error
  };
};
