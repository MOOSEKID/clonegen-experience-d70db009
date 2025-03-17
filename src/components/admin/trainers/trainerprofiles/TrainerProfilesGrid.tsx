
import { TrainerCard } from './TrainerCard';
import { Skeleton } from '@/components/ui/skeleton';
import { TrainerProfile } from '../profiles/TrainerProfileType';

export interface TrainerProfilesGridProps {
  trainers: TrainerProfile[];
  isLoading: boolean;
  onEdit: (trainerId: string) => void;
  onDelete: (trainerId: string) => void;
  onAddCertification: (trainerId: string) => void;
  onDeleteCertification: (certificationId: string) => void;
  onAddAvailability: (trainerId: string) => void;
  onDeleteAvailability: (availabilityId: string) => void;
}

export const TrainerProfilesGrid = ({
  trainers,
  isLoading,
  onEdit,
  onDelete,
  onAddCertification,
  onDeleteCertification,
  onAddAvailability,
  onDeleteAvailability
}: TrainerProfilesGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              key={index}
              className="w-full h-[340px] rounded-lg"
            />
          ))}
      </div>
    );
  }

  if (trainers.length === 0) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-lg font-medium text-gray-600">No trainers found</h3>
        <p className="text-gray-500 mt-2">
          Try adjusting your filters or add a new trainer.
        </p>
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
          onDeleteCertification={onDeleteCertification}
          onAddAvailability={() => onAddAvailability(trainer.id)}
          onDeleteAvailability={onDeleteAvailability}
        />
      ))}
    </div>
  );
};
