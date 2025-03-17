
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TrainerStatusBadgeProps {
  status: string;
  className?: string;
}

const TrainerStatusBadge: React.FC<TrainerStatusBadgeProps> = ({ status, className }) => {
  const getStatusStyles = (status: string) => {
    const lowerStatus = status.toLowerCase();
    
    switch (lowerStatus) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'on leave':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'pending':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={cn("font-normal", getStatusStyles(status), className)}
    >
      {status}
    </Badge>
  );
};

export default TrainerStatusBadge;
