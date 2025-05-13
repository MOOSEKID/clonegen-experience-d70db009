
import React from 'react';
import { Clock, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StaffProfile } from '@/hooks/trainers/types';

interface AvailabilityTabProps {
  trainer: StaffProfile;
  onAddAvailability: () => void;
}

const AvailabilityTab: React.FC<AvailabilityTabProps> = ({ trainer, onAddAvailability }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Weekly Availability</CardTitle>
        <Button variant="outline" size="sm" onClick={onAddAvailability}>Add Time Slot</Button>
      </CardHeader>
      <CardContent>
        {trainer.availability && trainer.availability.length > 0 ? (
          <div className="divide-y">
            {trainer.availability.map((slot, idx) => (
              <div key={idx} className="py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="font-medium capitalize">{slot.day_of_week}</span>
                </div>
                <div>
                  {slot.start_time} - {slot.end_time}
                </div>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">No availability slots defined</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={onAddAvailability}>
              Set Availability
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AvailabilityTab;
