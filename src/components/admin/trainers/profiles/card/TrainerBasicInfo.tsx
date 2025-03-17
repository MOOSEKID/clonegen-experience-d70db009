
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone } from 'lucide-react';

interface TrainerBasicInfoProps {
  name: string;
  email: string;
  phone?: string;
  profilePicture?: string;
}

const TrainerBasicInfo: React.FC<TrainerBasicInfoProps> = ({
  name,
  email,
  phone,
  profilePicture
}) => {
  // Get initials from the name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex items-center">
      <Avatar className="h-12 w-12 mr-3">
        <AvatarImage src={profilePicture || ''} alt={name} />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-lg font-semibold">{name}</h2>
        <div className="flex flex-col text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Mail className="h-3 w-3" />
            <span>{email}</span>
          </div>
          {phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>{phone}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainerBasicInfo;
