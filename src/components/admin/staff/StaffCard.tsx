
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Badge,
  Avatar, 
  AvatarFallback,
  AvatarImage
} from '@/components/ui';
import { CalendarIcon, Mail, Phone, Edit } from 'lucide-react';
import { StaffProfile } from '@/hooks/trainers/types';

// Role badge colors
const roleBadgeColors = {
  trainer: 'bg-green-100 text-green-800',
  manager: 'bg-blue-100 text-blue-800',
  reception: 'bg-amber-100 text-amber-800',
  sales: 'bg-orange-100 text-orange-800',
  support: 'bg-purple-100 text-purple-800'
};

// Status badge colors
const statusBadgeColors = {
  Active: 'bg-emerald-100 text-emerald-800',
  Inactive: 'bg-gray-100 text-gray-800',
  'On Leave': 'bg-yellow-100 text-yellow-800'
};

interface StaffCardProps {
  staffMember: StaffProfile;
}

const StaffCard: React.FC<StaffCardProps> = ({ staffMember }) => {
  const navigate = useNavigate();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <Card className="transition-all duration-300 hover:shadow-md">
      <CardHeader className="p-4 pb-0 flex flex-row items-start justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={staffMember.photo_url || ""} alt={staffMember.full_name} />
            <AvatarFallback className="bg-gray-200 text-gray-700">
              {getInitials(staffMember.full_name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{staffMember.full_name}</h3>
            <div className="flex space-x-2 mt-1">
              <Badge 
                variant="secondary"
                className={roleBadgeColors[staffMember.role] || 'bg-gray-100 text-gray-800'}
              >
                {staffMember.role.charAt(0).toUpperCase() + staffMember.role.slice(1)}
              </Badge>
              
              <Badge 
                variant="outline"
                className={statusBadgeColors[staffMember.status] || 'bg-gray-100 text-gray-800'}
              >
                {staffMember.status}
              </Badge>
            </div>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-full h-8 w-8 p-0" 
          onClick={() => navigate(`/admin/staff/${staffMember.id}`)}
        >
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
      </CardHeader>
      
      <CardContent className="p-4">
        <dl className="space-y-2">
          {staffMember.email && (
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 mr-2 opacity-70" />
              <span className="text-muted-foreground">{staffMember.email}</span>
            </div>
          )}
          
          {staffMember.phone && (
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2 opacity-70" />
              <span className="text-muted-foreground">{staffMember.phone}</span>
            </div>
          )}
          
          {staffMember.hire_date && (
            <div className="flex items-center text-sm">
              <CalendarIcon className="h-4 w-4 mr-2 opacity-70" />
              <span className="text-muted-foreground">
                Hire date: {format(new Date(staffMember.hire_date), 'MMM d, yyyy')}
              </span>
            </div>
          )}
        </dl>
        
        {staffMember.specialties && staffMember.specialties.length > 0 && (
          <div className="mt-3">
            <p className="text-sm font-medium mb-1">Specialties:</p>
            <div className="flex flex-wrap gap-1">
              {staffMember.specialties.map((specialty, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate(`/admin/staff/${staffMember.id}`)}
        >
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StaffCard;
