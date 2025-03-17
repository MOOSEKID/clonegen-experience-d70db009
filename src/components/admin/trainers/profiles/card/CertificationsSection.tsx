
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import CertificationItem from './CertificationItem';
import { TrainerCertification } from '@/hooks/trainers/useTrainerProfiles';

interface CertificationsSectionProps {
  certifications: TrainerCertification[];
  onAddCertification: () => void;
  onDeleteCertification: (id: string) => Promise<void>;
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
  onAddCertification,
  onDeleteCertification
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <h4 className="text-sm font-semibold">Certifications</h4>
        <Button variant="ghost" size="sm" onClick={onAddCertification} className="h-6 px-2">
          <PlusIcon className="h-3 w-3 mr-1" />
          Add
        </Button>
      </div>
      
      {certifications?.length ? (
        <div className="space-y-1">
          {certifications.map(cert => (
            <CertificationItem 
              key={cert.id} 
              certification={cert} 
              onDelete={() => onDeleteCertification(cert.id)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">No certifications added</div>
      )}
    </div>
  );
};

export default CertificationsSection;
