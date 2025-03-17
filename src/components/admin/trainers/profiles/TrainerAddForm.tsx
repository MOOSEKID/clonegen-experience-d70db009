
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TrainerProfile } from './TrainerProfileType';
import { TrainerAddFormValues } from './form/TrainerAddFormValues';

interface TrainerAddFormProps {
  onSubmit: (data: Omit<TrainerProfile, 'id'>) => Promise<void>;
  initialData?: TrainerProfile;
  isEdit?: boolean;
  isLoading?: boolean;
  onCancel?: () => void;
}

const TrainerAddForm = ({ 
  onSubmit, 
  initialData, 
  isEdit = false,
  isLoading = false,
  onCancel
}: TrainerAddFormProps) => {
  const [formData, setFormData] = useState<TrainerAddFormValues>(
    initialData ? {
      name: initialData.name,
      email: initialData.email,
      phone: initialData.phone || '',
      bio: initialData.bio || '',
      specializations: initialData.specializations || initialData.specialization || [],
      certifications: initialData.certifications || [],
      profile_picture: initialData.profile_picture || '',
      status: initialData.status || 'active',
      hire_date: initialData.hire_date,
      experience_years: initialData.experience_years,
      experience_level: initialData.experience_level
    } : {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields would go here - we'll just leave a placeholder for now */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input 
              type="email" 
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
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
