
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BusinessHoursData } from '@/hooks/admin/useBusinessHours';

// Generate time options for the select dropdown
const timeOptions = Array.from({ length: 24 * 4 }).map((_, index) => {
  const hour = Math.floor(index / 4);
  const minute = (index % 4) * 15;
  const hourFormatted = hour.toString().padStart(2, '0');
  const minuteFormatted = minute.toString().padStart(2, '0');
  return `${hourFormatted}:${minuteFormatted}`;
});

interface DayScheduleCardProps {
  day: string;
  dayData: BusinessHoursData;
  onToggleDay: (day: string, closed: boolean) => void;
  onTimeChange: (day: string, type: 'open_time' | 'close_time', value: string) => void;
}

const DayScheduleCard = ({ day, dayData, onToggleDay, onTimeChange }: DayScheduleCardProps) => {
  return (
    <div className="border rounded-md p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-semibold capitalize">{day}</h3>
        <div className="flex items-center space-x-2">
          <Label htmlFor={`closed-${day}`}>Closed</Label>
          <Switch
            id={`closed-${day}`}
            checked={dayData.is_closed || false}
            onCheckedChange={(checked) => onToggleDay(day, checked)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`open-${day}`}>Opening Time</Label>
          <Select
            disabled={dayData.is_closed}
            value={dayData.open_time || ''}
            onValueChange={(value) => onTimeChange(day, 'open_time', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select opening time" />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((time) => (
                <SelectItem key={`${day}-open-${time}`} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`close-${day}`}>Closing Time</Label>
          <Select
            disabled={dayData.is_closed}
            value={dayData.close_time || ''}
            onValueChange={(value) => onTimeChange(day, 'close_time', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select closing time" />
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((time) => (
                <SelectItem key={`${day}-close-${time}`} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default DayScheduleCard;
