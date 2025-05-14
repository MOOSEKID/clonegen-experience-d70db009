
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrainerProfile } from '@/hooks/trainers/useTrainerProfiles';
import TrainerCard from '@/components/admin/trainers/profiles/TrainerCard';
import { Skeleton } from '@/components/ui/skeleton';

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-8 w-16" />
              </div>
              <div className="flex flex-col items-center space-y-3 mb-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
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
