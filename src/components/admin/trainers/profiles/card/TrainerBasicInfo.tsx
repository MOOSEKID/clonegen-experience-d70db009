
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardTitle, CardDescription } from '@/components/ui/card';

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
  const getInitials = (name: string) => {
    const nameArray = name.split(' ');
    return nameArray.length > 1
      ? `${nameArray[0][0]}${nameArray[1][0]}`
      : nameArray[0].substring(0, 2);
  };

  return (
    <div className="flex items-center gap-4 mt-2">
      <Avatar className="h-16 w-16">
        {profilePicture ? (
          <AvatarImage src={profilePicture} alt={name} />
        ) : (
          <AvatarFallback className="text-lg bg-primary text-primary-foreground">
            {getInitials(name)}
          </AvatarFallback>
        )}
      </Avatar>
      <div>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{email}</CardDescription>
        {phone && <CardDescription>{phone}</CardDescription>}
      </div>
    </div>
  );
};

export default TrainerBasicInfo;
