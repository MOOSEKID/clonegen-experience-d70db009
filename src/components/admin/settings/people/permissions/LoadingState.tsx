
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center justify-center min-h-[300px]">
      <Loader2 className="h-10 w-10 text-gym-orange animate-spin mb-4" />
      <p className="text-gray-500">Loading permissions settings...</p>
    </div>
  );
};

export default LoadingState;
