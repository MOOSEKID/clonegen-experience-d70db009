
import { GymLocation } from '@/types/classTypes';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocationSelectorProps {
  value: string;
  onChange: (value: string) => void;
  locations: GymLocation[];
  isLoading: boolean;
  error?: string;
}

const LocationSelector = ({ 
  value, 
  onChange, 
  locations, 
  isLoading, 
  error 
}: LocationSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="room" className={cn(error && "text-red-500")}>
        Location*
      </Label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger className={cn(error && "border-red-500")}>
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
      {value === 'other' && (
        <Input
          className="mt-2"
          placeholder="Enter custom location"
          value={value === 'other' ? '' : value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {error && (
        <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
