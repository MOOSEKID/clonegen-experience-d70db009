
import { ClassType } from '@/types/classTypes';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import { AlertCircle, RotateCw } from 'lucide-react';
import { useGymLocations } from '@/hooks/classes/useGymLocations';
import { weekDays, isEveryDay, toggleEveryDay } from '@/utils/classFormUtils';
import { Button } from '@/components/ui/button';

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

  const toggleDayHandler = (day: string) => {
    const currentDays = [...classData.recurrenceDays];
    const newDays = currentDays.includes(day) 
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day];
    
    handleMultiSelectChange('recurrenceDays', newDays);
  };

  const toggleEveryDayHandler = () => {
    const newDays = isEveryDay(classData.recurrenceDays) ? [] : weekDays.map(day => day.value);
    handleMultiSelectChange('recurrenceDays', newDays);
  };

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
        <div className="space-y-2">
          <Label htmlFor="room" className={cn(errors.room && "text-red-500")}>
            Location*
          </Label>
          <Select 
            value={classData.room} 
            onValueChange={(value) => handleSelectChange('room', value)}
          >
            <SelectTrigger className={cn(errors.room && "border-red-500")}>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {isLoading ? (
                <SelectItem value="loading" disabled>Loading locations...</SelectItem>
              ) : (
                <>
                  <SelectItem value="other">Other/Custom Location</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location.id} value={location.name}>
                      {location.name} ({location.type})
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>
          {classData.room === 'other' && (
            <Input
              className="mt-2"
              placeholder="Enter custom location"
              value={classData.room === 'other' ? '' : classData.room}
              onChange={(e) => handleSelectChange('room', e.target.value)}
            />
          )}
          <ErrorMessage name="room" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="recurrence" 
              checked={classData.recurrence} 
              onCheckedChange={(checked) => 
                handleRecurrenceChange(checked === true)
              }
            />
            <Label 
              htmlFor="recurrence" 
              className="cursor-pointer"
            >
              Repeat Weekly
            </Label>
          </div>
          
          {classData.recurrence && (
            <div className="mt-3 space-y-3">
              <div className="flex justify-between">
                <Label className={cn(errors.recurrenceDays && "text-red-500")}>
                  Select Days:
                </Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={toggleEveryDayHandler}
                  className="flex items-center gap-1 h-7 text-xs"
                >
                  <RotateCw className="h-3 w-3" />
                  {isEveryDay(classData.recurrenceDays) ? 'Clear All' : 'Every Day'}
                </Button>
              </div>
              
              <ToggleGroup 
                type="multiple" 
                className="flex flex-wrap gap-1"
                value={classData.recurrenceDays}
              >
                {weekDays.map((day) => (
                  <ToggleGroupItem
                    key={day.value}
                    value={day.value}
                    onClick={() => toggleDayHandler(day.value)}
                    className="flex-1 min-w-16"
                    data-state={classData.recurrenceDays.includes(day.value) ? "on" : "off"}
                  >
                    {day.label.slice(0, 3)}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              
              {errors.recurrenceDays && (
                <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.recurrenceDays}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulingFields;
