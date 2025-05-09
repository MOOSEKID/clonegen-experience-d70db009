
import { Button } from '@/components/ui/button';
import { Loader2, Save, RotateCcw } from 'lucide-react';
import { SaveState } from '@/hooks/admin/useSettings';

interface BusinessHoursActionsProps {
  isMobile: boolean;
  hasChanges: boolean;
  saveState: SaveState;
  onReset: () => void;
  onSave: () => void;
}

const BusinessHoursActions = ({
  isMobile,
  hasChanges,
  saveState,
  onReset,
  onSave
}: BusinessHoursActionsProps) => {
  return (
    <div className={`flex gap-2 justify-end mt-6 ${isMobile ? 'sticky bottom-4 bg-white dark:bg-gray-800 p-4 shadow-md rounded-md z-10' : ''}`}>
      <Button
        type="button"
        variant="outline"
        onClick={onReset}
        disabled={!hasChanges || saveState === SaveState.Saving}
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        Reset
      </Button>
      
      <Button
        type="button"
        disabled={!hasChanges || saveState === SaveState.Saving}
        onClick={onSave}
      >
        {saveState === SaveState.Saving ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Save className="h-4 w-4 mr-2" />
        )}
        Save Changes
      </Button>
    </div>
  );
};

export default BusinessHoursActions;
