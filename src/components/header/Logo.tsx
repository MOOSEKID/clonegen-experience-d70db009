
import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="h-12 w-auto">
        <img 
          src="/lovable-uploads/50d3d473-1f3f-40d6-b895-c64a2e29ca1d.png" 
          alt="Uptown Gym Logo" 
          className="h-full w-auto object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;
