
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Label } from '@/components/ui/label';
import { AlertCircle, RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { weekDays, isEveryDay, toggleEveryDay, toggleDay } from '@/utils/classFormUtils';

interface DaySelectorProps {
  selectedDays: string[];
  onChange: (days: string[]) => void;
  error?: string;
}

const DaySelector = ({ selectedDays, onChange, error }: DaySelectorProps) => {
  const toggleDayHandler = (day: string) => {
    const newDays = toggleDay(selectedDays, day);
    onChange(newDays);
  };

  const toggleEveryDayHandler = () => {
    const newDays = toggleEveryDay(selectedDays);
    onChange(newDays);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <Label className={cn(error && "text-red-500")}>
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
          {isEveryDay(selectedDays) ? 'Clear All' : 'Every Day'}
        </Button>
      </div>
      
      <ToggleGroup 
        type="multiple" 
        className="flex flex-wrap gap-1"
        value={selectedDays}
      >
        {weekDays.map((day) => (
          <ToggleGroupItem
            key={day.value}
            value={day.value}
            onClick={() => toggleDayHandler(day.value)}
            className="flex-1 min-w-16"
            data-state={selectedDays.includes(day.value) ? "on" : "off"}
          >
            {day.label.slice(0, 3)}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      
      {error && (
        <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default DaySelector;
