import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TrainerBasicInfoProps {
  name: string;
  email: string;
  imageUrl?: string;
}

const TrainerBasicInfo: React.FC<TrainerBasicInfoProps> = ({ name, email, imageUrl }) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-12 w-12">
        <AvatarImage src={imageUrl} alt={name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </div>
  );
};

export default TrainerBasicInfo;
