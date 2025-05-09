
import SettingsCard from '../SettingsCard';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { SaveState } from '@/hooks/admin/useSettings';

interface BusinessHoursErrorProps {
  error: Error | null;
  onRetry: () => void;
}

const BusinessHoursError = ({ error, onRetry }: BusinessHoursErrorProps) => {
  return (
    <SettingsCard 
      title="Business Hours" 
      description="Error loading business hours"
      saveState={SaveState.Error}
    >
      <div className="p-4 bg-red-50 text-red-800 rounded-md flex items-start gap-3">
        <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-medium">Failed to load business hours</p>
          <p className="text-sm mt-1">{error?.message || 'Unknown error'}</p>
          <Button 
            onClick={onRetry} 
            variant="outline"
            size="sm"
            className="mt-3"
          >
            Retry
          </Button>
        </div>
      </div>
    </SettingsCard>
  );
};

export default BusinessHoursError;
