
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { StaffProfile } from '@/hooks/trainers/types';

interface ProfileTabProps {
  trainer: StaffProfile;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ trainer }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trainer Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {trainer.bio && (
          <div>
            <h3 className="text-sm font-medium mb-1">Biography</h3>
            <p className="text-gray-600">{trainer.bio}</p>
          </div>
        )}
        
        {trainer.specialties && trainer.specialties.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-1">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {trainer.specialties.map((specialty, i) => (
                <div 
                  key={i}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {specialty}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileTab;
