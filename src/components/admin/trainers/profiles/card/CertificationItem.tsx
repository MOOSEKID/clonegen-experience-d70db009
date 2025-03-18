
import React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import { TrainerCertification } from '@/hooks/trainers/useTrainerProfiles';

interface CertificationItemProps {
  certification: TrainerCertification;
  onDelete: () => void;
}

const CertificationItem: React.FC<CertificationItemProps> = ({ certification, onDelete }) => {
  return (
    <div className="bg-muted p-2 rounded-sm text-sm relative group">
      <div className="font-medium">{certification.certification_name}</div>
      <div className="text-muted-foreground">{certification.issuing_organization}</div>
      {(certification.issue_date || certification.expiry_date) && (
        <div className="text-xs text-muted-foreground mt-1">
          {certification.issue_date && (
            <span>Issued: {format(new Date(certification.issue_date), 'MMM yyyy')}</span>
          )}
          {certification.issue_date && certification.expiry_date && <span> • </span>}
          {certification.expiry_date && (
            <span>Expires: {format(new Date(certification.expiry_date), 'MMM yyyy')}</span>
          )}
        </div>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={onDelete}
      >
        <Trash2Icon className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default CertificationItem;
