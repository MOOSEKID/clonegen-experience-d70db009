
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface TrainerStatusBadgeProps {
  status: string;
}

const TrainerStatusBadge: React.FC<TrainerStatusBadgeProps> = ({ status }) => {
  const getVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'on leave':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Badge 
      variant="outline" 
      className={`${getVariant(status)} border-0 font-medium py-1 px-2`}
    >
      {status}
    </Badge>
  );
};

export default TrainerStatusBadge;
