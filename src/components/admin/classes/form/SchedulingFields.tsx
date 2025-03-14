
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
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface SchedulingFieldsProps {
  classData: Omit<ClassType, 'id'>;
  errors?: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleCheckboxChange: (name: string, checked: boolean) => void;
}

const SchedulingFields = ({
  classData,
  errors = {},
  handleChange,
  handleNumberChange,
  handleSelectChange,
  handleCheckboxChange
}: SchedulingFieldsProps) => {
  // Helper function to render error message
  const ErrorMessage = ({ name }: { name: string }) => (
    errors[name] ? (
      <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
        <AlertCircle className="h-4 w-4" />
        <span>{errors[name]}</span>
      </div>
    ) : null
  );

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
              <SelectItem value="Monday">Monday</SelectItem>
              <SelectItem value="Tuesday">Tuesday</SelectItem>
              <SelectItem value="Wednesday">Wednesday</SelectItem>
              <SelectItem value="Thursday">Thursday</SelectItem>
              <SelectItem value="Friday">Friday</SelectItem>
              <SelectItem value="Saturday">Saturday</SelectItem>
              <SelectItem value="Sunday">Sunday</SelectItem>
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
            Room*
          </Label>
          <Input 
            id="room" 
            name="room" 
            value={classData.room} 
            onChange={handleChange}
            placeholder="Enter room or location"
            className={cn(errors.room && "border-red-500 focus-visible:ring-red-500")}
            required
          />
          <ErrorMessage name="room" />
        </div>
        
        <div className="space-y-2 flex items-center">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="recurrence" 
              checked={classData.recurrence} 
              onCheckedChange={(checked) => 
                handleCheckboxChange('recurrence', checked === true)
              }
            />
            <Label 
              htmlFor="recurrence" 
              className="cursor-pointer"
            >
              Repeat Weekly
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulingFields;
