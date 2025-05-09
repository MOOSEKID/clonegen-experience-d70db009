
import React from 'react';
import { Link } from 'react-router-dom';

const SidebarHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-20 border-b border-white/5">
      <Link to="/admin" className="flex items-center space-x-2">
        <div className="h-10 w-auto">
          <img
            src="/lovable-uploads/50d3d473-1f3f-40d6-b895-c64a2e29ca1d.png"
            alt="Uptown Gym Logo"
            className="h-full w-auto object-contain"
          />
        </div>
      </Link>
    </div>
  );
};

export default SidebarHeader;
