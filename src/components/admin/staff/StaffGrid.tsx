
import React from 'react';
import { StaffProfile } from '@/hooks/trainers/types';
import StaffCard from './StaffCard';

interface StaffGridProps {
  staff: StaffProfile[];
}

const StaffGrid: React.FC<StaffGridProps> = ({ staff }) => {
  if (staff.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-500">No staff members found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {staff.map((staffMember) => (
        <StaffCard key={staffMember.id} staffMember={staffMember} />
      ))}
    </div>
  );
};

export default StaffGrid;
