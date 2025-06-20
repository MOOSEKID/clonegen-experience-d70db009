
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface TrainerStatusBadgeProps {
  status: string;
}

const TrainerStatusBadge: React.FC<TrainerStatusBadgeProps> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'on leave':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Badge variant="outline" className={getStatusColor(status || '')}>
      {status || 'Unknown'}
    </Badge>
  );
};

export default TrainerStatusBadge;
