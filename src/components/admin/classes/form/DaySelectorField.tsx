
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';
import { weekDays } from '@/utils/classFormUtils';

interface DaySelectorFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const DaySelectorField = ({ value, onChange, error }: DaySelectorFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="day" className={cn(error && "text-red-500")}>
        Day*
      </Label>
      <Select 
        value={value} 
        onValueChange={(value) => onChange(value)}
      >
        <SelectTrigger className={cn(error && "border-red-500")}>
          <SelectValue placeholder="Select day" />
        </SelectTrigger>
        <SelectContent>
          {weekDays.map(day => (
            <SelectItem key={day.value} value={day.value}>{day.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default DaySelectorField;
