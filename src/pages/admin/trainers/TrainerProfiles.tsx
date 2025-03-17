
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { TrainerProfilesGrid } from '@/components/admin/trainers/trainerprofiles/TrainerProfilesGrid';
import { useTrainerProfiles } from '@/hooks/trainers/useTrainerProfiles';
import { TrainerProfile } from '@/components/admin/trainers/profiles/TrainerProfileType';
import TrainerAddDialog from '@/components/admin/trainers/profiles/TrainerAddDialog';
import PageHeading from '@/components/ui/page-heading';

const TrainerProfiles = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerProfile | null>(null);
  
  const {
    trainers,
    isLoading,
    error,
    addTrainer,
    updateTrainer,
    deleteTrainer
  } = useTrainerProfiles();

  const handleAddSubmit = async (trainerData: Omit<TrainerProfile, 'id'>) => {
    try {
      await addTrainer({
        ...trainerData,
        specialization: trainerData.specializations, // Adapt to the API format
        status: trainerData.status || 'Active'
      });
      setIsAddDialogOpen(false);
      toast.success('Trainer profile created successfully');
    } catch (error) {
      console.error('Error creating trainer profile:', error);
      toast.error('Failed to create trainer profile');
    }
  };

  const handleEditSubmit = async (trainerData: TrainerProfile) => {
    try {
      await updateTrainer(trainerData.id, {
        name: trainerData.name,
        email: trainerData.email,
        phone: trainerData.phone,
        bio: trainerData.bio,
        specialization: trainerData.specializations,
        status: trainerData.status,
        profile_picture: trainerData.profile_picture
      });
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

  const handleEditClick = (trainerId: string) => {
    const trainer = trainers.find(t => t.id === trainerId);
    if (trainer) {
      // Convert API format to component format
      const componentTrainer: TrainerProfile = {
        id: trainer.id,
        name: trainer.name,
        email: trainer.email,
        specializations: trainer.specialization || [],
        profile_picture: trainer.profile_picture,
        status: (trainer.status?.toLowerCase() || 'active') as 'active' | 'inactive' | 'on leave',
        bio: trainer.bio || '',
        phone: trainer.phone || '',
        certifications: []
      };
      setSelectedTrainer(componentTrainer);
      setIsEditDialogOpen(true);
    }
  };

  // Default handlers for these operations - they would be implemented properly in a real app
  const handleAddCertification = (trainerId: string) => {
    console.log("Add certification for trainer", trainerId);
  };

  const handleDeleteCertification = (certificationId: string) => {
    console.log("Delete certification", certificationId);
  };

  const handleAddAvailability = (trainerId: string) => {
    console.log("Add availability for trainer", trainerId);
  };

  const handleDeleteAvailability = (availabilityId: string) => {
    console.log("Delete availability", availabilityId);
  };

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
        trainers={trainers.map(trainer => ({
          id: trainer.id,
          name: trainer.name,
          email: trainer.email,
          specializations: trainer.specialization || [],
          profile_picture: trainer.profile_picture,
          status: (trainer.status?.toLowerCase() || 'active') as 'active' | 'inactive' | 'on leave',
          bio: trainer.bio || '',
          phone: trainer.phone || '',
          certifications: []
        }))} 
        isLoading={isLoading}
        onEdit={handleEditClick}
        onDelete={handleDeleteTrainer}
        onAddCertification={handleAddCertification}
        onDeleteCertification={handleDeleteCertification}
        onAddAvailability={handleAddAvailability}
        onDeleteAvailability={handleDeleteAvailability}
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
