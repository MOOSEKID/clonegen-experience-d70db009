
import { useState } from 'react';
import { TrainerProfile } from '@/hooks/trainers/profiles/types';
import { TrainerProfilesState, TrainerProfilesActions } from './types';

export const useTrainerFiltering = (trainers: TrainerProfile[]): [
  Pick<TrainerProfilesState, 'activeTab'>,
  Pick<TrainerProfilesActions, 'setActiveTab' | 'getSelectedTrainer'>,
  TrainerProfile[]
] => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredTrainers = trainers.filter((trainer) => {
    if (activeTab === 'all') return true;
    return trainer.status?.toLowerCase() === activeTab;
  });

  const getSelectedTrainer = (selectedTrainerId: string | null) => {
    return selectedTrainerId 
      ? trainers.find((trainer) => trainer.id === selectedTrainerId) || null
      : null;
  };

  return [
    { activeTab },
    { 
      setActiveTab,
      getSelectedTrainer: (selectedTrainerId: string | null = null) => getSelectedTrainer(selectedTrainerId)
    },
    filteredTrainers
  ];
};
