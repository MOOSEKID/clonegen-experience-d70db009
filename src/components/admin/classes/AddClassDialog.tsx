
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ClassType } from '@/hooks/useClassesData';
import ClassFormFields from './ClassFormFields';
import { getDefaultClassData } from '@/utils/classFormUtils';
import { toast } from 'sonner';

interface AddClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddClass: (newClass: Omit<ClassType, 'id'>) => void;
}

const AddClassDialog = ({ open, onOpenChange, onAddClass }: AddClassDialogProps) => {
  const [classData, setClassData] = useState<Omit<ClassType, 'id'>>(getDefaultClassData());
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClassData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (value === '') {
      // Allow empty string for optional numeric fields
      setClassData(prev => ({
        ...prev,
        [name]: name === 'classFees' ? null : 0
      }));
      return;
    }
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setClassData(prev => ({
        ...prev,
        [name]: numValue
      }));
      
      // Clear error when field is changed
      if (errors[name]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  const handleSelectChange = (name: string, value: string | null) => {
    setClassData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setClassData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleMultiSelectChange = (name: string, values: string[]) => {
    setClassData(prev => ({
      ...prev,
      [name]: values
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!classData.name.trim()) {
      newErrors.name = 'Class name is required';
    }
    
    if (!classData.trainer && !classData.trainerId) {
      newErrors.trainer = 'Trainer is required';
    }
    
    if (!classData.day) {
      newErrors.day = 'Day is required';
    }
    
    if (!classData.time) {
      newErrors.time = 'Start time is required';
    }
    
    if (!classData.room) {
      newErrors.room = 'Room is required';
    }
    
    // Numeric validations
    if (classData.capacity <= 0) {
      newErrors.capacity = 'Capacity must be at least 1';
    }
    
    if (classData.duration <= 0) {
      newErrors.duration = 'Duration must be at least 1 minute';
    }
    
    // Fee validations
    if (classData.classFees !== null) {
      if (classData.classFees < 0) {
        newErrors.classFees = 'Fee cannot be negative';
      }
      
      if (!classData.feeType) {
        newErrors.feeType = 'Fee type is required when fee is specified';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    onAddClass(classData);
    onOpenChange(false);
    // Reset form
    setClassData(getDefaultClassData());
    setErrors({});
  };

  const handleCancel = () => {
    onOpenChange(false);
    // Reset form
    setClassData(getDefaultClassData());
    setErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Add New Class</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <ClassFormFields 
            classData={classData}
            handleChange={handleChange}
            handleNumberChange={handleNumberChange}
            handleSelectChange={handleSelectChange}
            handleCheckboxChange={handleCheckboxChange}
            handleMultiSelectChange={handleMultiSelectChange}
          />
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="submit">Create Class</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClassDialog;
