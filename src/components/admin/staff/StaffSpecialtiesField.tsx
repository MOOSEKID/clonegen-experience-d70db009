
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage
} from '@/components/ui/form';

// Common specialties for different roles
const commonSpecialties = {
  trainer: [
    'Strength & Conditioning', 'CrossFit', 'Yoga', 'Pilates', 
    'HIIT', 'Cardio', 'Weight Loss', 'Bodybuilding',
    'Functional Training', 'Senior Fitness', 'Nutrition', 'Rehabilitation'
  ],
  manager: [
    'Team Leadership', 'Operations', 'Staff Development', 'Marketing',
    'Member Retention', 'Financial Management', 'Strategic Planning', 'HR'
  ],
  reception: [
    'Customer Service', 'Member Relations', 'Check-In Management', 'Administrative',
    'Scheduling', 'Phone Support', 'CRM Software', 'Conflict Resolution'
  ],
  sales: [
    'Membership Sales', 'Corporate Accounts', 'Upselling', 'Lead Generation',
    'Retention Programs', 'Contract Negotiation', 'Referral Programs', 'Sales Training'
  ],
  support: [
    'Equipment Maintenance', 'Cleaning', 'Towel Service', 'Security',
    'Facility Management', 'Locker Room Attendant', 'Pool Maintenance', 'General Assistance'
  ]
};

interface StaffSpecialtiesFieldProps {
  value: string[];
  onChange: (value: string[]) => void;
  role?: string;
}

const StaffSpecialtiesField: React.FC<StaffSpecialtiesFieldProps> = ({ 
  value = [], 
  onChange, 
  role = '' 
}) => {
  const [newSpecialty, setNewSpecialty] = useState('');
  
  const specialties = value || [];
  
  const handleAddSpecialty = () => {
    if (newSpecialty.trim() === '') return;
    
    if (!specialties.includes(newSpecialty)) {
      onChange([...specialties, newSpecialty]);
      setNewSpecialty('');
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    onChange(specialties.filter(s => s !== specialty));
  };

  const handleAddCommonSpecialty = (specialty: string) => {
    if (!specialties.includes(specialty)) {
      onChange([...specialties, specialty]);
    }
  };
  
  return (
    <div className="space-y-2">
      <FormLabel>Specialties</FormLabel>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {specialties.map((specialty, i) => (
          <Badge key={i} variant="secondary" className="flex items-center gap-1">
            {specialty}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0 ml-1 rounded-full hover:bg-gray-200"
              onClick={() => handleRemoveSpecialty(specialty)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {specialty}</span>
            </Button>
          </Badge>
        ))}
        {specialties.length === 0 && (
          <span className="text-sm text-muted-foreground">No specialties added yet</span>
        )}
      </div>
      
      <div className="flex space-x-2">
        <Input
          value={newSpecialty}
          onChange={(e) => setNewSpecialty(e.target.value)}
          placeholder="Add new specialty"
          className="flex-grow"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddSpecialty();
            }
          }}
        />
        <Button type="button" onClick={handleAddSpecialty} variant="secondary">
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
      
      {role && commonSpecialties[role as keyof typeof commonSpecialties] && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Common Specialties:</h4>
          <div className="flex flex-wrap gap-2">
            {commonSpecialties[role as keyof typeof commonSpecialties]
              .filter(specialty => !specialties.includes(specialty))
              .slice(0, 8)
              .map((specialty, i) => (
                <Badge 
                  key={i} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-secondary"
                  onClick={() => handleAddCommonSpecialty(specialty)}
                >
                  + {specialty}
                </Badge>
              ))
            }
          </div>
        </div>
      )}
      
      <FormDescription>
        Add specialties relevant to this staff member's role.
      </FormDescription>
    </div>
  );
};

export default StaffSpecialtiesField;
