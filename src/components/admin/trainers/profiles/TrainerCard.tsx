
import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, EditIcon, PlusIcon, ShieldIcon, Trash2Icon } from 'lucide-react';
import { TrainerProfile, TrainerCertification, TrainerAvailability } from '@/hooks/trainers/useTrainerProfiles';
import { Separator } from '@/components/ui/separator';

interface TrainerCardProps {
  trainer: TrainerProfile;
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
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'on leave':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getInitials = (name: string) => {
    const nameArray = name.split(' ');
    return nameArray.length > 1
      ? `${nameArray[0][0]}${nameArray[1][0]}`
      : nameArray[0].substring(0, 2);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <Badge variant="outline" className={getStatusColor(trainer.status || '')}>
            {trainer.status || 'Unknown'}
          </Badge>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={onEdit} title="Edit trainer">
              <EditIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete} title="Delete trainer">
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <Avatar className="h-16 w-16">
            {trainer.profile_picture ? (
              <AvatarImage src={trainer.profile_picture} alt={trainer.name} />
            ) : (
              <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                {getInitials(trainer.name)}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <CardTitle>{trainer.name}</CardTitle>
            <CardDescription>{trainer.email}</CardDescription>
            {trainer.phone && <CardDescription>{trainer.phone}</CardDescription>}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Specialization */}
        <div>
          <h4 className="text-sm font-semibold mb-1">Specialization</h4>
          <div className="flex flex-wrap gap-1">
            {trainer.specialization?.length ? (
              trainer.specialization.map((spec, index) => (
                <Badge key={index} variant="secondary" className="mr-1">
                  {spec}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">No specializations listed</span>
            )}
          </div>
        </div>
        
        {/* Hire Date */}
        <div className="flex items-center text-sm">
          <CalendarIcon className="h-4 w-4 mr-2" />
          <span className="text-muted-foreground">Hire Date:</span>
          <span className="ml-1 font-medium">
            {trainer.hire_date ? format(new Date(trainer.hire_date), 'MMM d, yyyy') : 'Not specified'}
          </span>
        </div>

        {/* Certifications */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <h4 className="text-sm font-semibold">Certifications</h4>
            <Button variant="ghost" size="sm" onClick={onAddCertification} className="h-6 px-2">
              <PlusIcon className="h-3 w-3 mr-1" />
              Add
            </Button>
          </div>
          
          {trainer.certifications?.length ? (
            <div className="space-y-2">
              {trainer.certifications.map(cert => (
                <CertificationItem 
                  key={cert.id} 
                  certification={cert} 
                  onDelete={() => onDeleteCertification(cert.id)} 
                />
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No certifications added</div>
          )}
        </div>

        {/* Availability */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <h4 className="text-sm font-semibold">Availability</h4>
            <Button variant="ghost" size="sm" onClick={onAddAvailability} className="h-6 px-2">
              <PlusIcon className="h-3 w-3 mr-1" />
              Add
            </Button>
          </div>
          
          {trainer.availability?.length ? (
            <div className="space-y-1">
              {trainer.availability.map(avail => (
                <AvailabilityItem 
                  key={avail.id} 
                  availability={avail} 
                  onDelete={() => onDeleteAvailability(avail.id)} 
                />
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No availability added</div>
          )}
        </div>
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

interface CertificationItemProps {
  certification: TrainerCertification;
  onDelete: () => void;
}

const CertificationItem: React.FC<CertificationItemProps> = ({ certification, onDelete }) => {
  return (
    <div className="bg-muted p-2 rounded-sm text-sm relative group">
      <div className="font-medium">{certification.certification_name}</div>
      <div className="text-muted-foreground">{certification.issuing_organization}</div>
      {(certification.issue_date || certification.expiry_date) && (
        <div className="text-xs text-muted-foreground mt-1">
          {certification.issue_date && (
            <span>Issued: {format(new Date(certification.issue_date), 'MMM yyyy')}</span>
          )}
          {certification.issue_date && certification.expiry_date && <span> • </span>}
          {certification.expiry_date && (
            <span>Expires: {format(new Date(certification.expiry_date), 'MMM yyyy')}</span>
          )}
        </div>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onDelete}
      >
        <Trash2Icon className="h-3 w-3" />
      </Button>
    </div>
  );
};

interface AvailabilityItemProps {
  availability: TrainerAvailability;
  onDelete: () => void;
}

const AvailabilityItem: React.FC<AvailabilityItemProps> = ({ availability, onDelete }) => {
  return (
    <div className="flex justify-between items-center bg-muted p-2 rounded-sm text-sm group">
      <div>
        <span className="font-medium">{availability.day_of_week}: </span>
        <span>
          {availability.start_time} - {availability.end_time}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onDelete}
      >
        <Trash2Icon className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default TrainerCard;
