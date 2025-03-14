
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SpecializationsSectionProps {
  specializations: string[];
}

const SpecializationsSection: React.FC<SpecializationsSectionProps> = ({ specializations }) => {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-1">Specialization</h4>
      <div className="flex flex-wrap gap-1">
        {specializations?.length ? (
          specializations.map((spec, index) => (
            <Badge key={index} variant="secondary" className="mr-1">
              {spec}
            </Badge>
          ))
        ) : (
          <span className="text-sm text-muted-foreground">No specializations listed</span>
        )}
      </div>
    </div>
  );
};

export default SpecializationsSection;
