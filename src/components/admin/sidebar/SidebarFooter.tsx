
import React from 'react';

const SidebarFooter: React.FC = () => {
  return (
    <div className="p-4 border-t border-white/5 text-center text-white/60 text-sm">
      <p>&copy; {new Date().getFullYear()} Uptown Gym</p>
    </div>
  );
};

export default SidebarFooter;
