
import { useState, useEffect } from 'react';
import { ClassType } from '@/types/classTypes';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';
import { equipmentOptions } from '@/utils/classFormUtils';

interface EquipmentFieldsProps {
  classData: Omit<ClassType, 'id'>;
  errors?: Record<string, string>;
  handleMultiSelectChange: (name: string, values: string[]) => void;
}

const EquipmentFields = ({
  classData,
  errors = {},
  handleMultiSelectChange
}: EquipmentFieldsProps) => {
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>(classData.equipmentRequired || []);
  
  // Update equipment selection
  const toggleEquipment = (value: string) => {
    let newSelection: string[];
    
    // If "none" is selected, clear other selections
    if (value === 'none') {
      newSelection = selectedEquipment.includes('none') ? [] : ['none'];
    } else {
      // If selecting other equipment, remove "none" option
      newSelection = selectedEquipment.filter(item => item !== 'none');
      
      // Toggle the selected value
      if (selectedEquipment.includes(value)) {
        newSelection = newSelection.filter(item => item !== value);
      } else {
        newSelection = [...newSelection, value];
      }
    }
    
    setSelectedEquipment(newSelection);
    handleMultiSelectChange('equipmentRequired', newSelection);
  };

  useEffect(() => {
    // Initialize selectedEquipment when classData changes
    if (classData.equipmentRequired) {
      setSelectedEquipment(classData.equipmentRequired);
    }
  }, [classData.equipmentRequired]);

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
      <div>
        <Label 
          className={cn("mb-2 block", errors.equipmentRequired && "text-red-500")}
        >
          Equipment Required*
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 border p-3 rounded-md bg-background">
          {equipmentOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox 
                id={`equipment-${option.value}`} 
                checked={selectedEquipment.includes(option.value)}
                onCheckedChange={() => toggleEquipment(option.value)}
              />
              <Label 
                htmlFor={`equipment-${option.value}`}
                className="cursor-pointer text-sm"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
        <ErrorMessage name="equipmentRequired" />
      </div>
    </div>
  );
};

export default EquipmentFields;
