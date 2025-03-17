
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
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Info, Loader2, AlertCircle } from 'lucide-react';
import { useTrainersData } from '@/hooks/useTrainersData';
import { cn } from '@/lib/utils';
import TrainerStatusBadge from '@/components/admin/trainers/profiles/card/TrainerStatusBadge';

interface TrainerCapacityFieldsProps {
  classData: Omit<ClassType, 'id'>;
  errors?: Record<string, string>;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const TrainerCapacityFields = ({
  classData,
  errors = {},
  handleNumberChange,
  handleSelectChange
}: TrainerCapacityFieldsProps) => {
  const { trainers, isLoading: loadingTrainers } = useTrainersData();

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="trainer" className={cn((errors.trainer || errors.trainerId) && "text-red-500")}>
          Trainer*
        </Label>
        {loadingTrainers ? (
          <div className="flex items-center space-x-2 h-10 px-3 py-2 border rounded-md">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading trainers...</span>
          </div>
        ) : (
          <Select 
            value={classData.trainerId || ''} 
            onValueChange={(value) => {
              handleSelectChange('trainerId', value);
              const selectedTrainer = trainers.find(t => t.id === value);
              if (selectedTrainer) {
                handleSelectChange('trainer', selectedTrainer.name);
              }
            }}
          >
            <SelectTrigger className={cn((errors.trainer || errors.trainerId) && "border-red-500")}>
              <SelectValue placeholder="Select a trainer" />
            </SelectTrigger>
            <SelectContent>
              {trainers.map((trainer) => (
                <SelectItem key={trainer.id} value={trainer.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{trainer.name}</span>
                    {trainer.status && (
                      <TrainerStatusBadge status={trainer.status} className="ml-2 text-xs" />
                    )}
                  </div>
                  {trainer.specialization && (
                    <div className="text-xs text-gray-500 mt-1">
                      {trainer.specialization.join(', ')}
                    </div>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {(errors.trainer || errors.trainerId) && <ErrorMessage name={errors.trainer ? 'trainer' : 'trainerId'} />}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Label htmlFor="capacity" className={cn(errors.capacity && "text-red-500")}>
            Maximum Capacity*
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Maximum number of participants allowed in this class</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Input 
          id="capacity" 
          name="capacity" 
          type="number"
          min="1"
          step="1"
          value={classData.capacity} 
          onChange={handleNumberChange}
          placeholder="Enter maximum capacity"
          className={cn(errors.capacity && "border-red-500 focus-visible:ring-red-500")}
          required
        />
        <ErrorMessage name="capacity" />
      </div>
    </div>
  );
};

export default TrainerCapacityFields;
