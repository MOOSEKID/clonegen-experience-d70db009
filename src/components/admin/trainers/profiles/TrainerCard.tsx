
import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, EditIcon, Trash2Icon, Eye, User } from 'lucide-react';
import { StaffProfile } from '@/hooks/trainers/types';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  const navigate = useNavigate();
  
  const handleViewProfile = () => {
    navigate(`/admin/staff/trainers/${trainer.id}`);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md border-gray-200 hover:border-primary/20">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <TrainerStatusBadge status={trainer.status || ''} />
          <div className="flex gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={onEdit} className="hover:bg-blue-50 hover:text-blue-600" aria-label="Edit trainer">
                    <EditIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit trainer profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={onDelete} className="hover:bg-red-50 hover:text-red-600" aria-label="Delete trainer">
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete trainer profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
          <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
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
              <p className="text-sm text-gray-600">{trainer.bio}</p>
            </div>
          </CardFooter>
        </>
      )}
      
      <CardFooter className="bg-muted/30 mt-2">
        <Button variant="outline" className="w-full" onClick={handleViewProfile}>
          <Eye className="h-4 w-4 mr-2" />
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TrainerCard;
