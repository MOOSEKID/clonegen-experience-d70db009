
import { ClassType } from '@/types/classTypes';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';
import { useGymLocations } from '@/hooks/classes/useGymLocations';
import { weekDays } from '@/utils/classFormUtils';
import DaySelector from './DaySelector';
import LocationSelector from './LocationSelector';
import RecurrenceToggle from './RecurrenceToggle';

interface SchedulingFieldsProps {
  classData: Omit<ClassType, 'id'>;
  errors?: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleCheckboxChange: (name: string, checked: boolean) => void;
  handleMultiSelectChange?: (name: string, values: string[]) => void;
}

const SchedulingFields = ({
  classData,
  errors = {},
  handleChange,
  handleNumberChange,
  handleSelectChange,
  handleCheckboxChange,
  handleMultiSelectChange = () => {}
}: SchedulingFieldsProps) => {
  const { locations, isLoading } = useGymLocations();
  
  // Helper function to render error message
  const ErrorMessage = ({ name }: { name: string }) => (
    errors[name] ? (
      <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
        <AlertCircle className="h-4 w-4" />
        <span>{errors[name]}</span>
      </div>
    ) : null
  );

  const handleRecurrenceChange = (checked: boolean) => {
    handleCheckboxChange('recurrence', checked);
    if (checked && classData.recurrenceDays.length === 0) {
      // Initialize with the current day when enabling recurrence
      handleMultiSelectChange('recurrenceDays', [classData.day]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="day" className={cn(errors.day && "text-red-500")}>
            Day*
          </Label>
          <Select 
            value={classData.day} 
            onValueChange={(value) => handleSelectChange('day', value)}
          >
            <SelectTrigger className={cn(errors.day && "border-red-500")}>
              <SelectValue placeholder="Select day" />
            </SelectTrigger>
            <SelectContent>
              {weekDays.map(day => (
                <SelectItem key={day.value} value={day.value}>{day.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ErrorMessage name="day" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="time" className={cn(errors.time && "text-red-500")}>
            Start Time*
          </Label>
          <Input 
            id="time" 
            name="time" 
            type="time"
            value={classData.time} 
            onChange={handleChange}
            className={cn(errors.time && "border-red-500 focus-visible:ring-red-500")}
            required
          />
          <ErrorMessage name="time" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="duration" className={cn(errors.duration && "text-red-500")}>
            Duration (mins)*
          </Label>
          <Input 
            id="duration" 
            name="duration" 
            type="number"
            min="15"
            step="5"
            value={classData.duration} 
            onChange={handleNumberChange}
            className={cn(errors.duration && "border-red-500 focus-visible:ring-red-500")}
            required
          />
          <ErrorMessage name="duration" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LocationSelector 
          value={classData.room}
          onChange={(value) => handleSelectChange('room', value)}
          locations={locations}
          isLoading={isLoading}
          error={errors.room}
        />
        
        <div className="space-y-2">
          <RecurrenceToggle 
            checked={classData.recurrence}
            onCheckedChange={handleRecurrenceChange}
          />
          
          {classData.recurrence && (
            <DaySelector 
              selectedDays={classData.recurrenceDays}
              onChange={(days) => handleMultiSelectChange('recurrenceDays', days)}
              error={errors.recurrenceDays}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulingFields;
