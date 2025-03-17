
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Clock } from 'lucide-react';
import { TrainerAvailability } from '@/hooks/trainers/useTrainerProfiles';

interface AvailabilityItemProps {
  availability: TrainerAvailability;
  onDelete: () => void;
}

const AvailabilityItem: React.FC<AvailabilityItemProps> = ({ availability, onDelete }) => {
  // Format time for display (09:00 -> 9:00 AM)
  const formatTime = (time: string): string => {
    try {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours, 10);
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${period}`;
    } catch (e) {
      return time;
    }
  };

  return (
    <div className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
      <div className="flex items-center">
        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
        <span className="font-medium">{availability.day_of_week}: </span>
        <span className="ml-1">
          {formatTime(availability.start_time)} - {formatTime(availability.end_time)}
        </span>
      </div>
      <Button variant="ghost" size="sm" onClick={onDelete} className="h-6 w-6 p-0">
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default AvailabilityItem;
