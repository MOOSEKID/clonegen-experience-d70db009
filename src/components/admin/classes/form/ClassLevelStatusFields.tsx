
import { ClassType } from '@/types/classTypes';
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

interface ClassLevelStatusFieldsProps {
  classData: Omit<ClassType, 'id'>;
  errors?: Record<string, string>;
  handleSelectChange: (name: string, value: string) => void;
}

const ClassLevelStatusFields = ({
  classData,
  errors = {},
  handleSelectChange
}: ClassLevelStatusFieldsProps) => {
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
        <Label htmlFor="classLevel" className={cn(errors.classLevel && "text-red-500")}>
          Class Level*
        </Label>
        <Select 
          value={classData.classLevel} 
          onValueChange={(value) => handleSelectChange('classLevel', value)}
        >
          <SelectTrigger className={cn(errors.classLevel && "border-red-500")}>
            <SelectValue placeholder="Select class level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
        <ErrorMessage name="classLevel" />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="status" className={cn(errors.status && "text-red-500")}>
          Class Status*
        </Label>
        <Select 
          value={classData.status} 
          onValueChange={(value) => handleSelectChange('status', value)}
        >
          <SelectTrigger className={cn(errors.status && "border-red-500")}>
            <SelectValue placeholder="Select class status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="full">Full</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="canceled">Canceled</SelectItem>
          </SelectContent>
        </Select>
        <ErrorMessage name="status" />
      </div>
    </div>
  );
};

export default ClassLevelStatusFields;
