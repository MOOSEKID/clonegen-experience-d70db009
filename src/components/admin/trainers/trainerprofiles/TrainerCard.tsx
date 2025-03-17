
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import TrainerStatusBadge from './card/TrainerStatusBadge';
import TrainerBasicInfo from './card/TrainerBasicInfo';
import SpecializationsSection from './card/SpecializationsSection';
import { TrainerProfile } from '../profiles/TrainerProfileType';

interface TrainerCardProps {
  trainer: TrainerProfile;
  onEdit: () => void;
  onDelete: () => void;
  onAddCertification: () => void;
  onDeleteCertification: (certificationId: string) => void;
  onAddAvailability: () => void;
  onDeleteAvailability: (availabilityId: string) => void;
}

const TrainerCard: React.FC<TrainerCardProps> = ({
  trainer,
  onEdit,
  onDelete,
  onAddCertification,
  onDeleteCertification,
  onAddAvailability,
  onDeleteAvailability,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <TrainerBasicInfo
            name={trainer.name}
            email={trainer.email}
            imageUrl={trainer.profile_picture}
          />
          <TrainerStatusBadge status={trainer.status.toLowerCase() as 'active' | 'inactive' | 'on leave'} />
        </div>
        <Separator className="my-4" />
        <SpecializationsSection specializations={trainer.specializations || []} />
      </CardContent>
    </Card>
  );
};

export default TrainerCard;
