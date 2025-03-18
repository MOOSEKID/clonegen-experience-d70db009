
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import TrainerProfileHeader from '@/components/admin/trainers/profiles/TrainerProfileHeader';
import TrainerProfileTabs from '@/components/admin/trainers/profiles/TrainerProfileTabs';
import TrainerProfilesGrid from '@/components/admin/trainers/profiles/TrainerProfilesGrid';
import TrainerDialogs from '@/components/admin/trainers/profiles/TrainerDialogs';
import { useTrainerProfilesState } from '@/components/admin/trainers/profiles/useTrainerProfilesState';

const TrainerProfiles = () => {
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
    <div className="container mx-auto p-6">
      <TrainerProfileHeader onAddTrainer={handleAddTrainer} />
      
      <TrainerProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="mt-4">
        <TabsContent value={activeTab} className="space-y-4 mt-4">
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
        </TabsContent>
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
