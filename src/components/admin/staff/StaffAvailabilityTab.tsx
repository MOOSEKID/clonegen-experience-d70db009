
import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Clock, Calendar, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useStaffOperations } from '@/hooks/staff/useStaffOperations';
import { StaffProfile, StaffAvailability } from '@/hooks/trainers/types';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import StaffAvailabilityForm from './forms/StaffAvailabilityForm';

// Helper function to format time
const formatTime = (timeString: string): string => {
  try {
    // Handle different time formats
    let time: Date;
    
    if (timeString.includes('T')) {
      // If timeString is ISO format
      time = new Date(timeString);
    } else {
      // If timeString is just time (HH:MM:SS)
      const [hours, minutes] = timeString.split(':');
      time = new Date();
      time.setHours(Number(hours));
      time.setMinutes(Number(minutes));
    }
    
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch (e) {
    return timeString;
  }
};

// Day mapping for sorting
const dayOfWeekOrder = {
  'Monday': 1,
  'Tuesday': 2,
  'Wednesday': 3,
  'Thursday': 4,
  'Friday': 5,
  'Saturday': 6,
  'Sunday': 7
};

interface StaffAvailabilityTabProps {
  staffMember: StaffProfile;
}

const StaffAvailabilityTab: React.FC<StaffAvailabilityTabProps> = ({ staffMember }) => {
  const { addAvailability, deleteAvailability } = useStaffOperations();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDeleteAvailability = async (availId: string) => {
    setIsDeleting(availId);
    try {
      await deleteAvailability(availId);
    } catch (error) {
      console.error("Failed to delete availability:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleAddAvailability = async (availability: Omit<StaffAvailability, 'id'>) => {
    try {
      await addAvailability(availability);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Failed to add availability:", error);
    }
  };

  // Sort availability by day of week
  const sortedAvailability = [...(staffMember.availability || [])].sort((a, b) => {
    return (dayOfWeekOrder[a.day_of_week] || 0) - (dayOfWeekOrder[b.day_of_week] || 0);
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Availability Schedule
        </CardTitle>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          variant="outline"
          size="sm"
          className="flex items-center"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Availability
        </Button>
      </CardHeader>
      <CardContent>
        {sortedAvailability.length ? (
          <div className="space-y-3">
            {sortedAvailability.map((avail) => (
              <div 
                key={avail.id} 
                className="border rounded-md p-3 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <Badge variant="outline" className="h-7">
                    {avail.day_of_week}
                  </Badge>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>
                      {avail.startTime && formatTime(avail.startTime)} - {avail.endTime && formatTime(avail.endTime)}
                    </span>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleDeleteAvailability(avail.id)}
                  disabled={isDeleting === avail.id}
                >
                  {isDeleting === avail.id ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    <Trash2 className="h-4 w-4 text-red-500" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center gap-2">
            <Clock className="h-10 w-10 text-muted-foreground/50" />
            <h3 className="font-medium text-muted-foreground">No Availability Set</h3>
            <p className="text-sm text-muted-foreground/70">
              No availability schedule has been defined for this staff member.
            </p>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              variant="outline"
              className="mt-2"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Availability
            </Button>
          </div>
        )}
      </CardContent>

      {/* Add Availability Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Availability</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <StaffAvailabilityForm 
              staffId={staffMember.id}
              onSubmit={handleAddAvailability}
            />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default StaffAvailabilityTab;
