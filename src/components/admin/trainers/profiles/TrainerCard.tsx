
import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, EditIcon, Trash2Icon } from 'lucide-react';
import { StaffProfile } from '@/hooks/trainers/types';
import { Separator } from '@/components/ui/separator';

// Import smaller components
import TrainerStatusBadge from './card/TrainerStatusBadge';
import TrainerBasicInfo from './card/TrainerBasicInfo';
import SpecializationsSection from './card/SpecializationsSection';
import CertificationsSection from './card/CertificationsSection';
import AvailabilitySection from './card/AvailabilitySection';

interface TrainerCardProps {
  trainer: StaffProfile;
  onEdit: () => void;
  onDelete: () => void;
  onAddCertification: () => void;
  onDeleteCertification: (id: string) => Promise<void>;
  onAddAvailability: () => void;
  onDeleteAvailability: (id: string) => Promise<void>;
}

const TrainerCard: React.FC<TrainerCardProps> = ({
  trainer,
  onEdit,
  onDelete,
  onAddCertification,
  onDeleteCertification,
  onAddAvailability,
  onDeleteAvailability
}) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <TrainerStatusBadge status={trainer.status || ''} />
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={onEdit} title="Edit trainer">
              <EditIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete} title="Delete trainer">
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <TrainerBasicInfo 
          name={trainer.full_name}
          email={trainer.email}
          phone={trainer.phone}
          profilePicture={trainer.photo_url}
        />
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Specialization */}
        <SpecializationsSection specializations={trainer.specialties} />
        
        {/* Hire Date */}
        <div className="flex items-center text-sm">
          <CalendarIcon className="h-4 w-4 mr-2" />
          <span className="text-muted-foreground">Hire Date:</span>
          <span className="ml-1 font-medium">
            {trainer.hire_date ? format(new Date(trainer.hire_date), 'MMM d, yyyy') : 'Not specified'}
          </span>
        </div>

        {/* Certifications */}
        <CertificationsSection 
          certifications={trainer.certifications}
          onAddCertification={onAddCertification}
          onDeleteCertification={onDeleteCertification}
        />

        {/* Availability */}
        <AvailabilitySection
          availability={trainer.availability}
          onAddAvailability={onAddAvailability}
          onDeleteAvailability={onDeleteAvailability}
        />
      </CardContent>

      {trainer.bio && (
        <>
          <Separator />
          <CardFooter className="pt-4">
            <div>
              <h4 className="text-sm font-semibold mb-1">Bio</h4>
              <p className="text-sm">{trainer.bio}</p>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default TrainerCard;
