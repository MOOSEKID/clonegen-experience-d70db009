import React from 'react';
import { Badge } from '@/components/ui/badge';

interface TrainerStatusBadgeProps {
  status: 'active' | 'inactive' | 'on leave';
}

const TrainerStatusBadge: React.FC<TrainerStatusBadgeProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'bg-green-500 hover:bg-green-600';
      case 'inactive':
        return 'bg-red-500 hover:bg-red-600';
      case 'on leave':
        return 'bg-yellow-500 hover:bg-yellow-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <Badge className={`${getStatusColor()} text-white`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default TrainerStatusBadge;
