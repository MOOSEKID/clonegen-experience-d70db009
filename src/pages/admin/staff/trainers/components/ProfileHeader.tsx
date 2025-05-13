
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { StaffProfile } from '@/hooks/trainers/types';

interface ProfileHeaderProps {
  trainer: StaffProfile;
  onDelete: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ trainer, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/admin/staff/trainers/profiles')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Trainers
        </Button>
        <Separator orientation="vertical" className="h-6" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{trainer.full_name}</h1>
          <p className="text-gray-500">Trainer • {trainer.status}</p>
        </div>
      </div>

      <div className="space-x-2">
        <Button
          variant="outline"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
        <Button
          onClick={() => navigate(`/admin/staff/trainers/${trainer.id}/calendar`)}
        >
          <CalendarIcon className="h-4 w-4 mr-2" />
          View Calendar
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
