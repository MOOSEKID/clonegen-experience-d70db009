
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface TimeAndDurationFieldsProps {
  time: string;
  durationMinutes: number;
  errors?: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TimeAndDurationFields = ({
  time,
  durationMinutes,
  errors = {},
  handleChange,
  handleNumberChange
}: TimeAndDurationFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="time" className={cn(errors.time && "text-red-500")}>
          Start Time*
        </Label>
        <Input 
          id="time" 
          name="time" 
          type="time"
          value={time} 
          onChange={handleChange}
          className={cn(errors.time && "border-red-500 focus-visible:ring-red-500")}
          required
        />
        {errors.time && (
          <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            <span>{errors.time}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="durationMinutes" className={cn(errors.durationMinutes && "text-red-500")}>
          Duration (mins)*
        </Label>
        <Input 
          id="durationMinutes" 
          name="durationMinutes" 
          type="number"
          min="15"
          step="5"
          value={durationMinutes} 
          onChange={handleNumberChange}
          className={cn(errors.durationMinutes && "border-red-500 focus-visible:ring-red-500")}
          required
        />
        {errors.durationMinutes && (
          <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            <span>{errors.durationMinutes}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeAndDurationFields;
