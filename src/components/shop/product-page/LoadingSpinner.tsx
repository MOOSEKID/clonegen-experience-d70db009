
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="bg-gym-light min-h-screen pt-24 pb-16 flex flex-col items-center justify-center">
      <Loader2 className="h-12 w-12 text-gym-orange animate-spin mb-4" />
      <p className="text-gray-600">Loading product details...</p>
    </div>
  );
};

export default LoadingSpinner;
