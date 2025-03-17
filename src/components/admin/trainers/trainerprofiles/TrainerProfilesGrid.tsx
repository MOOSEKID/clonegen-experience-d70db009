import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { TrainerProfile } from '../profiles/useTrainerProfilesState';
import TrainerCard from './TrainerCard';

interface TrainerProfilesGridProps {
  trainers: TrainerProfile[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAddCertification: (id: string) => void;
  onDeleteCertification: (trainerId: string, certIndex: number) => void;
  onAddAvailability: (id: string) => void;
  onDeleteAvailability: (trainerId: string, availIndex: number) => void;
}

export const TrainerProfilesGrid = ({
  trainers,
  isLoading,
  onEdit,
  onDelete,
  onAddCertification,
  onDeleteCertification,
  onAddAvailability,
  onDeleteAvailability,
}: TrainerProfilesGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[400px] rounded-lg" />
        ))}
      </div>
    );
  }

  if (trainers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No trainers found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trainers.map((trainer) => (
        <TrainerCard
          key={trainer.id}
          trainer={trainer}
          onEdit={() => onEdit(trainer.id)}
          onDelete={() => onDelete(trainer.id)}
          onAddCertification={() => onAddCertification(trainer.id)}
          onDeleteCertification={(certIndex) => onDeleteCertification(trainer.id, certIndex)}
          onAddAvailability={() => onAddAvailability(trainer.id)}
          onDeleteAvailability={(availIndex) => onDeleteAvailability(trainer.id, availIndex)}
        />
      ))}
    </div>
  );
};
