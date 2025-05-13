
import React from 'react';
import { format } from 'date-fns';
import { Mail, Phone, CalendarIcon, Award } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { StaffProfile } from '@/hooks/trainers/types';

interface InfoCardsProps {
  trainer: StaffProfile;
}

const InfoCards: React.FC<InfoCardsProps> = ({ trainer }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">{trainer.email || "Not provided"}</CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            Phone
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">{trainer.phone || "Not provided"}</CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Hire Date
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {trainer.hire_date 
            ? format(new Date(trainer.hire_date), 'MMM d, yyyy')
            : "Not provided"}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground flex items-center">
            <Award className="h-4 w-4 mr-2" />
            Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {trainer.experience_years ? `${trainer.experience_years} years` : "Not specified"} 
          {trainer.experience_level && ` • ${trainer.experience_level}`}
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoCards;
