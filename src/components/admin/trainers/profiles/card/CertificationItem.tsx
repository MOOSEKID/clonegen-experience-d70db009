
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Award } from 'lucide-react';
import { TrainerCertification } from '@/hooks/trainers/useTrainerProfiles';
import { format } from 'date-fns';

interface CertificationItemProps {
  certification: TrainerCertification;
  onDelete: () => void;
}

const CertificationItem: React.FC<CertificationItemProps> = ({ certification, onDelete }) => {
  // Format date for display if available
  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
      <div className="flex-1">
        <div className="flex items-center">
          <Award className="h-3 w-3 mr-1 text-muted-foreground" />
          <span className="font-medium">{certification.certification_name}</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {certification.issuing_organization}
          {certification.issue_date && (
            <span className="ml-1">
              (Issued: {formatDate(certification.issue_date)}
              {certification.expiry_date && `, Expires: ${formatDate(certification.expiry_date)}`})
            </span>
          )}
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={onDelete} className="h-6 w-6 p-0">
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default CertificationItem;
