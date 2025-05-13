
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, Calendar, Dumbbell, Briefcase, DollarSign, Settings } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StaffProfile } from '@/hooks/trainers/types';

interface StaffGridProps {
  staff: StaffProfile[];
}

const StaffGrid: React.FC<StaffGridProps> = ({ staff }) => {
  const navigate = useNavigate();
  
  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'trainer':
        return <Dumbbell className="h-4 w-4 text-blue-600" />;
      case 'manager':
        return <Briefcase className="h-4 w-4 text-green-600" />;
      case 'reception':
        return <Calendar className="h-4 w-4 text-amber-600" />;
      case 'sales':
        return <DollarSign className="h-4 w-4 text-purple-600" />;
      default:
        return <Settings className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status?: string) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    const statusLower = status.toLowerCase();
    if (statusLower === 'active') return 'bg-green-100 text-green-800';
    if (statusLower === 'on leave') return 'bg-amber-100 text-amber-800';
    if (statusLower === 'inactive') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const formatRole = (role: string) => {
    if (!role) return 'Staff';
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const handleViewProfile = (staffMember: StaffProfile) => {
    if (staffMember.role === 'trainer') {
      navigate(`/admin/staff/trainers/${staffMember.id}`);
    } else {
      navigate(`/admin/staff/${staffMember.id}`);
    }
  };

  if (staff.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No staff members found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {staff.map((staffMember) => (
        <Card key={staffMember.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <div className="h-4 bg-gradient-to-r from-blue-500 to-purple-500" />
          <CardContent className="pt-6">
            <div className="flex flex-col items-center mb-4">
              <Avatar className="h-20 w-20 mb-3 border">
                {staffMember.photo_url ? (
                  <img src={staffMember.photo_url} alt={staffMember.full_name || 'Staff'} />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500 text-xl">
                    {(staffMember.full_name || 'S').charAt(0)}
                  </div>
                )}
              </Avatar>
              <h3 className="font-medium text-lg">{staffMember.full_name || 'Staff Member'}</h3>
              <div className="flex items-center mt-1 space-x-2">
                {getRoleIcon(staffMember.role || 'staff')}
                <span className="text-sm text-gray-600">{formatRole(staffMember.role || 'Staff')}</span>
              </div>
              <Badge className={`mt-2 ${getStatusColor(staffMember.status)}`}>
                {staffMember.status || 'Unknown'}
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              {staffMember.email && (
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="truncate">{staffMember.email}</span>
                </div>
              )}
              {staffMember.phone && (
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{staffMember.phone}</span>
                </div>
              )}
              
              {staffMember.role === 'trainer' && staffMember.specialties && staffMember.specialties.length > 0 && (
                <div className="mt-3">
                  <div className="text-xs text-gray-500 mb-1">Specialties</div>
                  <div className="flex flex-wrap gap-1">
                    {staffMember.specialties.slice(0, 3).map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                    {staffMember.specialties.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{staffMember.specialties.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <Button 
              className="w-full"
              variant="outline"
              onClick={() => handleViewProfile(staffMember)}
            >
              View Profile
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StaffGrid;
