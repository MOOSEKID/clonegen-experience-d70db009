
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!classData.name.trim()) {
      newErrors.name = 'Class name is required';
    }
    
    if (!classData.trainer && !classData.trainerId) {
      newErrors.trainer = 'Trainer is required';
      newErrors.trainerId = 'Trainer is required';
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
    
    if (classData.durationMinutes <= 0) {
      newErrors.durationMinutes = 'Duration must be at least 1 minute';
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
    
    // Equipment validation
    if (!classData.equipmentRequired || classData.equipmentRequired.length === 0) {
      newErrors.equipmentRequired = 'At least one equipment option is required';
    }
    
    console.log('Form validation errors:', newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await onAddClass(classData);
      onOpenChange(false);
      // Reset form
      setClassData(getDefaultClassData());
      setErrors({});
    } catch (error) {
      console.error('Error submitting class:', error);
      toast.error('Failed to create class. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    // Reset form
    setClassData(getDefaultClassData());
    setErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Class</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <ClassFormFields 
            classData={classData}
            errors={errors}
            handleChange={handleChange}
            handleNumberChange={handleNumberChange}
            handleSelectChange={handleSelectChange}
            handleCheckboxChange={handleCheckboxChange}
            handleMultiSelectChange={handleMultiSelectChange}
          />
          
          <DialogFooter className="mt-4 pt-2 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Class'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClassDialog;
