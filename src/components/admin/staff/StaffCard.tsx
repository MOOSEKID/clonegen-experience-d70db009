
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StaffProfile } from '@/hooks/trainers/types';
import { useNavigate } from 'react-router-dom';

interface StaffCardProps {
  staffMember: StaffProfile;
}

const StaffCard: React.FC<StaffCardProps> = ({ staffMember }) => {
  const navigate = useNavigate();
  
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'trainer':
        return 'bg-blue-100 text-blue-800';
      case 'manager':
        return 'bg-purple-100 text-purple-800';
      case 'reception':
        return 'bg-green-100 text-green-800';
      case 'sales':
        return 'bg-amber-100 text-amber-800';
      case 'support':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const handleViewProfile = () => {
    navigate(`/admin/staff/${staffMember.id}`);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 border">
              {staffMember.photo_url ? (
                <img src={staffMember.photo_url} alt={staffMember.name} />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-500">
                  {staffMember.name.charAt(0)}
                </div>
              )}
            </Avatar>
            <div>
              <h3 className="font-semibold">{staffMember.name}</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                <Badge variant="outline" className={getRoleColor(staffMember.role || '')}>
                  {staffMember.role?.charAt(0).toUpperCase() + staffMember.role?.slice(1) || 'Staff'}
                </Badge>
                <Badge variant="outline" className={getStatusColor(staffMember.status || '')}>
                  {staffMember.status || 'Unknown'}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="text-sm space-y-1">
          {staffMember.email && (
            <p className="text-gray-600 truncate">{staffMember.email}</p>
          )}
          {staffMember.phone && (
            <p className="text-gray-600">{staffMember.phone}</p>
          )}
          
          {staffMember.role === 'trainer' && staffMember.specialization && staffMember.specialization.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Specialties:</p>
              <div className="flex flex-wrap gap-1">
                {staffMember.specialization.slice(0, 3).map((specialty, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-gray-50">
                    {specialty}
                  </Badge>
                ))}
                {staffMember.specialization.length > 3 && (
                  <Badge variant="outline" className="text-xs bg-gray-50">
                    +{staffMember.specialization.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={handleViewProfile}
        >
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StaffCard;
