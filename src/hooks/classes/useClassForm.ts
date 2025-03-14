
import { useState, useEffect } from 'react';
import { ClassType } from '@/types/classTypes';
import { validateClassForm } from '@/utils/classValidationUtils';
import { toast } from 'sonner';

export const useClassForm = (
  initialData: ClassType | null,
  onSubmit: (data: ClassType) => void,
  onCancel: () => void
) => {
  const [formData, setFormData] = useState<ClassType | null>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

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
    
    const newErrors = validateClassForm(formData);
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
    
    onSubmit(formData);
  };

  return {
    formData,
    errors,
    handleChange,
    handleNumberChange,
    handleSelectChange,
    handleCheckboxChange,
    handleMultiSelectChange,
    handleSubmit
  };
};
