
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ClassType } from '@/hooks/useClassesData';
import ClassFormFields from './ClassFormFields';
import { toast } from 'sonner';

interface EditClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classData: ClassType | null;
  onUpdateClass: (updatedClass: ClassType) => void;
}

const EditClassDialog = ({ 
  open, 
  onOpenChange, 
  classData, 
  onUpdateClass 
}: EditClassDialogProps) => {
  const [formData, setFormData] = useState<ClassType | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (classData) {
      setFormData(classData);
    }
  }, [classData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: value
      };
    });
    
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
      setFormData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          [name]: name === 'classFees' ? null : 0
        };
      });
      return;
    }
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setFormData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          [name]: numValue
        };
      });
      
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
    setFormData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: value
      };
    });
    
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
    setFormData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: checked
      };
    });
  };
  
  const handleMultiSelectChange = (name: string, values: string[]) => {
    setFormData(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: values
      };
    });
  };

  const validateForm = (): boolean => {
    if (!formData) return false;
    
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Class name is required';
    }
    
    if (!formData.trainer && !formData.trainerId) {
      newErrors.trainer = 'Trainer is required';
    }
    
    if (!formData.day) {
      newErrors.day = 'Day is required';
    }
    
    if (!formData.time) {
      newErrors.time = 'Start time is required';
    }
    
    if (!formData.room) {
      newErrors.room = 'Room is required';
    }
    
    // Numeric validations
    if (formData.capacity <= 0) {
      newErrors.capacity = 'Capacity must be at least 1';
    }
    
    if (formData.duration <= 0) {
      newErrors.duration = 'Duration must be at least 1 minute';
    }
    
    // Fee validations
    if (formData.classFees !== null) {
      if (formData.classFees < 0) {
        newErrors.classFees = 'Fee cannot be negative';
      }
      
      if (!formData.feeType) {
        newErrors.feeType = 'Fee type is required when fee is specified';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData) {
      toast.error('No class data to update');
      return;
    }
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    onUpdateClass(formData);
    onOpenChange(false);
  };

  if (!formData) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Edit Class</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <ClassFormFields 
            classData={formData}
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
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Update Class</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditClassDialog;
