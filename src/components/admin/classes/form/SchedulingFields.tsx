
import { ClassType } from '@/types/classTypes';
import DaySelectorField from './DaySelectorField';
import TimeAndDurationFields from './TimeAndDurationFields';
import LocationSelector from './LocationSelector';
import RecurrenceToggle from './RecurrenceToggle';
import DaySelector from './DaySelector';
import { useGymLocations } from '@/hooks/classes/useGymLocations';

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
        <DaySelectorField
          value={classData.day}
          onChange={(value) => handleSelectChange('day', value)}
          error={errors.day}
        />
        
        <TimeAndDurationFields
          time={classData.time}
          duration={classData.duration}
          errors={errors}
          handleChange={handleChange}
          handleNumberChange={handleNumberChange}
        />
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
