
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTrainerProfiles } from '@/hooks/trainers/useTrainerProfiles';

const TrainerProfiles = () => {
  const navigate = useNavigate();
  const { trainers, isLoading } = useTrainerProfiles();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/admin/staff')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Staff
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Trainer Profiles</h1>
            <p className="text-gray-500">Manage trainer profiles, specialties, and certifications</p>
          </div>
        </div>
      </div>

      {/* Reusing the existing TrainerProfiles content */}
      <iframe 
        src="/admin/trainers" 
        className="w-full h-[calc(100vh-200px)] border-0 rounded-md" 
        title="Trainer Profiles"
      />
    </div>
  );
};

export default TrainerProfiles;
