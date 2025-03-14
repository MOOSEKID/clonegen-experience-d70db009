
import { ClassType } from '@/types/classTypes';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface BasicInfoFieldsProps {
  classData: Omit<ClassType, 'id'>;
  errors?: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const BasicInfoFields = ({
  classData,
  errors = {},
  handleChange,
  handleSelectChange
}: BasicInfoFieldsProps) => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className={cn(errors.name && "text-red-500")}>
            Class Name*
          </Label>
          <Input 
            id="name" 
            name="name" 
            value={classData.name} 
            onChange={handleChange} 
            placeholder="Enter class name"
            className={cn(errors.name && "border-red-500 focus-visible:ring-red-500")}
            required 
          />
          <ErrorMessage name="name" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="type" className={cn(errors.type && "text-red-500")}>
            Class Type*
          </Label>
          <Select 
            value={classData.type} 
            onValueChange={(value) => handleSelectChange('type', value)}
          >
            <SelectTrigger className={cn(errors.type && "border-red-500")}>
              <SelectValue placeholder="Select class type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yoga">Yoga</SelectItem>
              <SelectItem value="hiit">HIIT</SelectItem>
              <SelectItem value="strength">Strength Training</SelectItem>
              <SelectItem value="cardio">Cardio</SelectItem>
              <SelectItem value="pilates">Pilates</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <ErrorMessage name="type" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          name="description" 
          value={classData.description || ''} 
          onChange={handleChange} 
          placeholder="Brief description of the class"
          rows={3} 
        />
      </div>
    </div>
  );
};

export default BasicInfoFields;
