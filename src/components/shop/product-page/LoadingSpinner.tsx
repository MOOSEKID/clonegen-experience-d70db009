
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="bg-gym-light min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gym-orange"></div>
    </div>
  );
};

export default LoadingSpinner;
