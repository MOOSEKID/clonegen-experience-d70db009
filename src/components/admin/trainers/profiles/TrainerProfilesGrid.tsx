
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrainerProfile } from '@/hooks/trainers/useTrainerProfiles';
import TrainerCard from '@/components/admin/trainers/profiles/TrainerCard';

interface TrainerProfilesGridProps {
  trainers: TrainerProfile[];
  isLoading: boolean;
  onEdit: (trainerId: string) => void;
  onDelete: (trainerId: string) => Promise<void>;
  onAddCertification: (trainerId: string) => void;
  onDeleteCertification: (id: string) => Promise<void>;
  onAddAvailability: (trainerId: string) => void;
  onDeleteAvailability: (id: string) => Promise<void>;
}

const TrainerProfilesGrid = ({
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
      <Card>
        <CardContent className="p-6">
          <p>Loading trainer data...</p>
        </CardContent>
      </Card>
    );
  }

  if (trainers.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No trainers found in this category.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {trainers.map((trainer) => (
        <TrainerCard
          key={trainer.id}
          trainer={trainer}
          onEdit={() => onEdit(trainer.id)}
          onDelete={() => onDelete(trainer.id)}
          onAddCertification={() => onAddCertification(trainer.id)}
          onDeleteCertification={onDeleteCertification}
          onAddAvailability={() => onAddAvailability(trainer.id)}
          onDeleteAvailability={onDeleteAvailability}
        />
      ))}
    </div>
  );
};

export default TrainerProfilesGrid;
