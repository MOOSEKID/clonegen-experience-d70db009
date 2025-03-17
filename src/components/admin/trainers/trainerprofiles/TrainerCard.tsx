import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
// Import smaller components
import TrainerStatusBadge from './card/TrainerStatusBadge';
import TrainerBasicInfo from './card/TrainerBasicInfo';
import SpecializationsSection from './card/SpecializationsSection';

interface TrainerCardProps {
  trainer: {
    id: string;
    name: string;
    email: string;
    imageUrl?: string;
    status: 'active' | 'inactive' | 'on leave';
    specializations: string[];
  };
  onEdit: () => void;
  onDelete: () => void;
  onAddCertification: () => void;
  onDeleteCertification: (certIndex: number) => void;
  onAddAvailability: () => void;
  onDeleteAvailability: (availIndex: number) => void;
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
            imageUrl={trainer.imageUrl}
          />
          <TrainerStatusBadge status={trainer.status} />
        </div>
        <Separator className="my-4" />
        <SpecializationsSection specializations={trainer.specializations} />
      </CardContent>
    </Card>
  );
};

export default TrainerCard;
