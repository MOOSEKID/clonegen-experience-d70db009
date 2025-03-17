import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, EditIcon, Trash2Icon } from 'lucide-react';
import { TrainerProfile } from '@/components/admin/trainers/profiles/useTrainerProfilesState';
import { Separator } from '@/components/ui/separator';

interface TrainerCardProps {
  trainer: TrainerProfile;
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
  onDeleteAvailability
}) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="px-2 py-1 rounded-md text-xs font-medium bg-muted">
            {trainer.status || 'Active'}
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={onEdit} title="Edit trainer">
              <EditIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete} title="Delete trainer">
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{trainer.full_name}</h3>
          <p className="text-sm text-muted-foreground">{trainer.email}</p>
          {trainer.contact_phone && (
            <p className="text-sm text-muted-foreground">{trainer.contact_phone}</p>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Specializations */}
        {trainer.specializations && trainer.specializations.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2">Specializations</h4>
            <div className="flex flex-wrap gap-1">
              {trainer.specializations.map((spec, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        )}
        
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
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-semibold">Certifications</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={onAddCertification}
              className="h-8 px-2"
            >
              Add
            </Button>
          </div>
          {trainer.certifications && trainer.certifications.length > 0 ? (
            <div className="space-y-1">
              {trainer.certifications.map((cert, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{cert}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteCertification(index)}
                    className="h-6 w-6"
                  >
                    <Trash2Icon className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No certifications added</p>
          )}
        </div>

        {/* Availability */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-semibold">Availability</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={onAddAvailability}
              className="h-8 px-2"
            >
              Add
            </Button>
          </div>
          {trainer.availability && trainer.availability.length > 0 ? (
            <div className="space-y-1">
              {trainer.availability.map((avail, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">
                    {avail.dayOfWeek}: {avail.startTime} - {avail.endTime}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteAvailability(index)}
                    className="h-6 w-6"
                  >
                    <Trash2Icon className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No availability set</p>
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

export default TrainerCard;
