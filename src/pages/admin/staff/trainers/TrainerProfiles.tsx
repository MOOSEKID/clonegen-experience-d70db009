
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import TrainerProfileHeader from '@/components/admin/trainers/profiles/TrainerProfileHeader';
import TrainerProfileTabs from '@/components/admin/trainers/profiles/TrainerProfileTabs';
import TrainerProfilesGrid from '@/components/admin/trainers/profiles/TrainerProfilesGrid';
import TrainerDialogs from '@/components/admin/trainers/profiles/TrainerDialogs';
import { useTrainerProfilesState } from '@/components/admin/trainers/profiles/useTrainerProfilesState';

const TrainerProfiles = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    filteredTrainers,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isCertDialogOpen,
    setIsCertDialogOpen,
    isAvailDialogOpen,
    setIsAvailDialogOpen,
    selectedTrainer,
    activeTab,
    setActiveTab,
    getSelectedTrainer,
    handleAddTrainer,
    handleEditTrainer,
    handleAddCertification,
    handleAddAvailability,
    handleAddTrainerSubmit,
    handleUpdateTrainerSubmit,
    handleDeleteTrainerSubmit,
    handleAddCertificationSubmit,
    handleDeleteCertificationSubmit,
    handleAddAvailabilitySubmit,
    handleDeleteAvailabilitySubmit,
  } = useTrainerProfilesState();

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

      <TrainerProfileHeader onAddTrainer={handleAddTrainer} />
      
      <TrainerProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="mt-4">
        <TrainerProfilesGrid
          trainers={filteredTrainers}
          isLoading={isLoading}
          onEdit={handleEditTrainer}
          onDelete={handleDeleteTrainerSubmit}
          onAddCertification={handleAddCertification}
          onDeleteCertification={handleDeleteCertificationSubmit}
          onAddAvailability={handleAddAvailability}
          onDeleteAvailability={handleDeleteAvailabilitySubmit}
        />
      </div>
      
      <TrainerDialogs
        isAddDialogOpen={isAddDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        isCertDialogOpen={isCertDialogOpen}
        setIsCertDialogOpen={setIsCertDialogOpen}
        isAvailDialogOpen={isAvailDialogOpen}
        setIsAvailDialogOpen={setIsAvailDialogOpen}
        selectedTrainer={selectedTrainer}
        selectedTrainerData={getSelectedTrainer()}
        onAddTrainerSubmit={handleAddTrainerSubmit}
        onUpdateTrainerSubmit={handleUpdateTrainerSubmit}
        onAddCertificationSubmit={handleAddCertificationSubmit}
        onAddAvailabilitySubmit={handleAddAvailabilitySubmit}
      />
    </div>
  );
};

export default TrainerProfiles;
