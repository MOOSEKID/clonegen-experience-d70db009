
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface RecurrenceToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const RecurrenceToggle = ({ checked, onCheckedChange }: RecurrenceToggleProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id="recurrence" 
        checked={checked} 
        onCheckedChange={(checked) => 
          onCheckedChange(checked === true)
        }
      />
      <Label 
        htmlFor="recurrence" 
        className="cursor-pointer"
      >
        Repeat Weekly
      </Label>
    </div>
  );
};

export default RecurrenceToggle;
