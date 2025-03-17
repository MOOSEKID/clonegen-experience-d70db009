
import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Member } from '@/types/memberTypes';
import MemberActions from './MemberActions';

interface MemberTableRowProps {
  member: Member;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  onViewProfile: (id: string) => void;
}

const MemberTableRow = ({ 
  member, 
  isSelected, 
  onToggleSelect,
  onStatusChange,
  onDelete,
  onViewProfile
}: MemberTableRowProps) => {
  const getStatusBadge = (status: string) => {
    if (status === 'Active') {
      return <span className="flex items-center gap-1 text-green-600"><CheckCircle size={14} /> Active</span>;
    } else {
      return <span className="flex items-center gap-1 text-gray-500"><XCircle size={14} /> Inactive</span>;
    }
  };

  // Format the membership expiry date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    // Check if membership is expired
    const isExpired = new Date() > date;
    
    if (isExpired) {
      return <span className="text-red-500">{formattedDate} (Expired)</span>;
    }
    
    return formattedDate;
  };

  // Get the membership plan with type
  const getMembershipInfo = (member: Member) => {
    const plan = member.membershipPlan || 'Monthly';
    return `${member.membershipType} (${plan})`;
  };

  // Format preferred workout times
  const formatWorkoutTimes = (times?: string[]) => {
    if (!times || times.length === 0) return "Not specified";
    if (times.includes("anytime")) return "Anytime";
    return times.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(", ");
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="pl-4 py-3">
        <input 
          type="checkbox" 
          checked={isSelected}
          onChange={() => onToggleSelect(member.id as string)}
          className="rounded border-gray-300 text-gym-orange focus:ring-gym-orange"
        />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center">
          {member.profilePicture ? (
            <div className="h-8 w-8 rounded-full overflow-hidden mr-3">
              <img 
                src={member.profilePicture} 
                alt={member.name} 
                className="h-full w-full object-cover" 
              />
            </div>
          ) : (
            <div className="h-8 w-8 rounded-full bg-gym-orange/20 text-gym-orange flex items-center justify-center font-medium uppercase">
              {member.name.charAt(0)}
            </div>
          )}
          <div className="ml-3">
            <div className="font-medium cursor-pointer hover:text-blue-600" 
                 onClick={() => onViewProfile(member.id as string)}>
              {member.name}
            </div>
            <div className="text-xs text-gray-500">{member.email}</div>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">{member.phone}</td>
      <td className="px-4 py-3">{getMembershipInfo(member)}</td>
      <td className="px-4 py-3">{formatDate(member.endDate)}</td>
      <td className="px-4 py-3">
        {getStatusBadge(member.status)}
      </td>
      <td className="px-4 py-3">
        <MemberActions 
          memberId={member.id as string} 
          status={member.status}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
          onViewProfile={onViewProfile}
        />
      </td>
    </tr>
  );
};

export default MemberTableRow;
