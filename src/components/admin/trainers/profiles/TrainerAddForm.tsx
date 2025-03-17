
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TrainerAddFormFields } from './form/TrainerAddFormFields';
import { TrainerProfile } from './TrainerProfileType';

export interface TrainerAddFormValues {
  name: string;
  email: string;
  phone: string;
  bio: string;
  specializations: string[];
  certifications: string[];
  profile_picture: string;
  status: 'active' | 'inactive' | 'on leave';
}

interface TrainerAddFormProps {
  onSubmit: (data: TrainerAddFormValues) => void;
  initialData?: TrainerProfile;
  isEdit?: boolean;
  isLoading?: boolean;
}

const TrainerAddForm = ({ 
  onSubmit, 
  initialData, 
  isEdit = false,
  isLoading = false 
}: TrainerAddFormProps) => {
  const [formData, setFormData] = useState<TrainerAddFormValues>(
    initialData || {
      name: '',
      email: '',
      phone: '',
      bio: '',
      specializations: [],
      certifications: [],
      profile_picture: '',
      status: 'active'
    }
  );

  const handleChange = (field: keyof TrainerAddFormValues, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TrainerAddFormFields 
        formData={formData}
        onChange={handleChange}
        isEdit={isEdit}
      />
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : (isEdit ? 'Update Trainer' : 'Add Trainer')}
        </Button>
      </div>
    </form>
  );
};

export default TrainerAddForm;
export type { TrainerAddFormValues };
