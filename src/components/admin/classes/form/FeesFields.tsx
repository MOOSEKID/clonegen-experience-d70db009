
import { ClassType } from '@/types/classTypes';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface FeesFieldsProps {
  classData: Omit<ClassType, 'id'>;
  errors?: Record<string, string>;
  handleNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const FeesFields = ({
  classData,
  errors = {},
  handleNumberChange,
  handleSelectChange
}: FeesFieldsProps) => {
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
    <div className="border-t pt-4 mt-4">
      <div className="flex items-center space-x-2 mb-4">
        <Checkbox 
          id="hasFee" 
          checked={classData.classFees !== null} 
          onCheckedChange={(checked) => {
            if (checked === false) {
              handleSelectChange('feeType', null as any);
              handleNumberChange({
                target: { name: 'classFees', value: '' }
              } as React.ChangeEvent<HTMLInputElement>);
            } else if (classData.classFees === null) {
              handleNumberChange({
                target: { name: 'classFees', value: '0' }
              } as React.ChangeEvent<HTMLInputElement>);
              handleSelectChange('feeType', 'per_session');
            }
          }}
        />
        <Label htmlFor="hasFee" className="cursor-pointer">Class Has Additional Fees</Label>
      </div>
      
      {classData.classFees !== null && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="classFees" className={cn(errors.classFees && "text-red-500")}>
              Fee Amount
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">$</span>
              <Input 
                id="classFees" 
                name="classFees" 
                type="number"
                min="0"
                step="0.01"
                className={cn("pl-7", errors.classFees && "border-red-500 focus-visible:ring-red-500")}
                value={classData.classFees || ''} 
                onChange={handleNumberChange}
                placeholder="0.00"
              />
            </div>
            <ErrorMessage name="classFees" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="feeType" className={cn(errors.feeType && "text-red-500")}>
              Fee Type
            </Label>
            <Select 
              value={classData.feeType || ''}
              onValueChange={(value) => handleSelectChange('feeType', value)}
            >
              <SelectTrigger className={cn(errors.feeType && "border-red-500")}>
                <SelectValue placeholder="Select fee type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="per_session">Per Session</SelectItem>
                <SelectItem value="package">Package</SelectItem>
              </SelectContent>
            </Select>
            <ErrorMessage name="feeType" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeesFields;
