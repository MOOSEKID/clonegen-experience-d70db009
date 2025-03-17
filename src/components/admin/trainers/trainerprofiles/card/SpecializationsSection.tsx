import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SpecializationsSectionProps {
  specializations: string[];
}

const SpecializationsSection: React.FC<SpecializationsSectionProps> = ({ specializations }) => {
  if (!specializations || specializations.length === 0) {
    return (
      <div className="mt-4">
        <h4 className="text-sm font-semibold mb-2">Specializations</h4>
        <p className="text-sm text-gray-500">No specializations listed</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h4 className="text-sm font-semibold mb-2">Specializations</h4>
      <div className="flex flex-wrap gap-2">
        {specializations.map((spec, index) => (
          <Badge key={index} variant="secondary">
            {spec}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default SpecializationsSection;
