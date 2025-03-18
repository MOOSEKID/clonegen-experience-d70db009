
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import { TrainerAvailability } from '@/hooks/trainers/useTrainerProfiles';

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

export default AvailabilityItem;
