
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import AvailabilityItem from './AvailabilityItem';
import { TrainerAvailability } from '@/hooks/trainers/useTrainerProfiles';

interface AvailabilitySectionProps {
  availability: TrainerAvailability[];
  onAddAvailability: () => void;
  onDeleteAvailability: (id: string) => Promise<void>;
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({
  availability,
  onAddAvailability,
  onDeleteAvailability
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <h4 className="text-sm font-semibold">Availability</h4>
        <Button variant="ghost" size="sm" onClick={onAddAvailability} className="h-6 px-2">
          <PlusIcon className="h-3 w-3 mr-1" />
          Add
        </Button>
      </div>
      
      {availability?.length ? (
        <div className="space-y-1">
          {availability.map(avail => (
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
  );
};

export default AvailabilitySection;
