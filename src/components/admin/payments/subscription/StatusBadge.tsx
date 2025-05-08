
import { Check, Pause, X } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
    status === 'Active' ? 'bg-green-100 text-green-800' : 
    status === 'Paused' ? 'bg-yellow-100 text-yellow-800' : 
    'bg-red-100 text-red-800'
  }`}>
    {status === 'Active' && <Check className="h-3 w-3 mr-1" />}
    {status === 'Paused' && <Pause className="h-3 w-3 mr-1" />}
    {status === 'Cancelled' && <X className="h-3 w-3 mr-1" />}
    {status}
  </span>
);
