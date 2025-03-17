
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { TrainerProfilesGrid } from '@/components/admin/trainers/trainerprofiles/TrainerProfilesGrid';
import { useTrainerProfiles } from '@/hooks/trainers/useTrainerProfiles';
import { TrainerProfile as ComponentTrainerProfile } from '@/components/admin/trainers/profiles/TrainerProfileType';
import TrainerAddDialog from '@/components/admin/trainers/profiles/TrainerAddDialog';
import PageHeading from '@/components/ui/page-heading';

const TrainerProfiles = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<ComponentTrainerProfile | null>(null);
  
  const {
    trainers,
    isLoading,
    error,
    createTrainer,
    updateTrainer,
    deleteTrainer,
    fetchTrainers
  } = useTrainerProfiles();

  useEffect(() => {
    fetchTrainers();
  }, [fetchTrainers]);

  const handleAddSubmit = async (trainerData: Omit<ComponentTrainerProfile, 'id'>) => {
    try {
      await createTrainer({
        ...trainerData,
        status: trainerData.status || 'active'
      });
      setIsAddDialogOpen(false);
      toast.success('Trainer profile created successfully');
    } catch (error) {
      console.error('Error creating trainer profile:', error);
      toast.error('Failed to create trainer profile');
    }
  };

  const handleEditSubmit = async (trainerData: ComponentTrainerProfile) => {
    try {
      await updateTrainer(trainerData);
      setIsEditDialogOpen(false);
      setSelectedTrainer(null);
      toast.success('Trainer profile updated successfully');
    } catch (error) {
      console.error('Error updating trainer profile:', error);
      toast.error('Failed to update trainer profile');
    }
  };

  const handleDeleteTrainer = async (trainerId: string) => {
    try {
      await deleteTrainer(trainerId);
      toast.success('Trainer profile deleted successfully');
    } catch (error) {
      console.error('Error deleting trainer profile:', error);
      toast.error('Failed to delete trainer profile');
    }
  };

  const handleEditClick = (trainer: ComponentTrainerProfile) => {
    setSelectedTrainer(trainer);
    setIsEditDialogOpen(true);
  };

  // Convert trainer data between formats if needed
  const adaptedTrainers: ComponentTrainerProfile[] = trainers.map(trainer => ({
    id: trainer.id,
    name: trainer.name,
    email: trainer.email,
    specializations: trainer.specializations || [],
    profile_picture: trainer.profile_picture || trainer.profilepicture,
    status: (trainer.status?.toLowerCase() || 'active') as 'active' | 'inactive' | 'on leave',
    bio: trainer.bio || '',
    phone: trainer.phone || '',
    certifications: trainer.certifications || []
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeading 
          title="Trainer Profiles" 
          description="Manage all trainer profiles and information"
        />
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Trainer
        </Button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error instanceof Error ? error.message : 'Error loading trainer profiles'}
        </div>
      )}

      <TrainerProfilesGrid 
        trainers={adaptedTrainers} 
        onEdit={handleEditClick}
        onDelete={handleDeleteTrainer}
        isLoading={isLoading}
      />

      <TrainerAddDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddSubmit}
      />

      {selectedTrainer && (
        <TrainerAddDialog
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedTrainer(null);
          }}
          onSubmit={handleEditSubmit}
          initialData={selectedTrainer}
          isEdit
        />
      )}
    </div>
  );
};

export default TrainerProfiles;
