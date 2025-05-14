
import React from 'react';
import { cn } from '@/lib/utils';
import SidebarHeader from './sidebar/SidebarHeader';
import SidebarNavigation from './sidebar/SidebarNavigation';
import SidebarFooter from './sidebar/SidebarFooter';
import { AdminSidebarProps } from './sidebar/types';

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen }) => {
  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-full w-64 bg-gym-darkblue border-r border-white/5 text-white transition-transform durationMinutes-300 z-50',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0 md:static' // Remove fixed positioning and translate on larger screens
      )}
    >
      <div className="flex flex-col h-full">
        <SidebarHeader />
        <SidebarNavigation />
        <SidebarFooter />
      </div>
    </aside>
  );
};

export default AdminSidebar;
