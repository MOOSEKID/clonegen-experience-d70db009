
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, Calendar, Dumbbell, Briefcase, DollarSign, Settings, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StaffProfile } from '@/hooks/trainers/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface StaffGridProps {
  staff: StaffProfile[];
}

const StaffGrid: React.FC<StaffGridProps> = ({ staff }) => {
  const navigate = useNavigate();
  
  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case 'trainer':
        return <Dumbbell className="h-4 w-4 text-emerald-600" />;
      case 'manager':
        return <Briefcase className="h-4 w-4 text-blue-600" />;
      case 'reception':
        return <Calendar className="h-4 w-4 text-amber-600" />;
      case 'sales':
        return <DollarSign className="h-4 w-4 text-purple-600" />;
      default:
        return <Settings className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRoleBadgeColor = (role?: string) => {
    if (!role) return "bg-gray-100 text-gray-800";
    
    const roleLower = role.toLowerCase();
    if (roleLower === 'trainer') return "bg-emerald-100 text-emerald-800 border-emerald-200";
    if (roleLower === 'manager') return "bg-blue-100 text-blue-800 border-blue-200";
    if (roleLower === 'reception') return "bg-amber-100 text-amber-800 border-amber-200";
    if (roleLower === 'admin') return "bg-purple-100 text-purple-800 border-purple-200";
    if (roleLower === 'sales') return "bg-indigo-100 text-indigo-800 border-indigo-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusColor = (status?: string) => {
    if (!status) return "bg-gray-100 text-gray-800";
    
    const statusLower = status.toLowerCase();
    if (statusLower === 'active') return "bg-green-100 text-green-800";
    if (statusLower === 'on leave') return "bg-amber-100 text-amber-800";
    if (statusLower === 'inactive') return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
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
      <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">No staff members found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {staff.map((staffMember) => (
        <Card 
          key={staffMember.id} 
          className="overflow-hidden hover:shadow-md transition-shadow border border-gray-200 hover:border-primary/20"
          onClick={() => handleViewProfile(staffMember)}
        >
          <div className={`h-2 ${getRoleBadgeColor(staffMember.role)}`} />
          <CardContent className="pt-6">
            <div className="flex flex-col items-center mb-4">
              <Avatar className="h-20 w-20 mb-3 border">
                {staffMember.photo_url ? (
                  <img 
                    src={staffMember.photo_url} 
                    alt={staffMember.full_name || 'Staff'} 
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground text-xl">
                    <User className="h-8 w-8 text-gray-400" />
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
                  <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">{staffMember.email}</span>
                </div>
              )}
              {staffMember.phone && (
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
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
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    className="w-full"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewProfile(staffMember);
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View detailed profile information</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StaffGrid;
