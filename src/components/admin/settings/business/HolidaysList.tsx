
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface HolidayData {
  id: string;
  holiday_name: string;
  holiday_date: string;
  updatedAt?: string;
}

interface FormattedHoliday extends HolidayData {
  formattedDate: string;
}

interface HolidaysListProps {
  holidays: FormattedHoliday[];
  onRemoveHoliday: (id: string) => void;
}

const HolidaysList = ({ holidays, onRemoveHoliday }: HolidaysListProps) => {
  if (holidays.length === 0) {
    return (
      <div className="border rounded-md p-8 text-center">
        <p className="text-muted-foreground">No holidays have been added yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {holidays.map((holiday) => (
        <div 
          key={holiday.id} 
          className="flex justify-between items-center border rounded-md p-4"
        >
          <div>
            <h4 className="font-medium">{holiday.holiday_name}</h4>
            <p className="text-sm text-muted-foreground">{holiday.formattedDate}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onRemoveHoliday(holiday.id)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default HolidaysList;
