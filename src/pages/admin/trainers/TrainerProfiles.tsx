import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useTrainerProfilesState } from '@/components/admin/trainers/profiles/useTrainerProfilesState';
import { TrainerProfilesGrid } from '@/components/admin/trainers/profiles/TrainerProfilesGrid';
import { TrainerDialogs } from '@/components/admin/trainers/profiles/TrainerDialogs';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

const TrainerProfiles: React.FC = () => {
  const { user, isAdmin } = useAuth();

  // Redirect if not authenticated or not admin
  if (!user || !isAdmin) {
    return null;
  }

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
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Trainer Profiles</h1>
        <Button onClick={handleAddTrainer}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Trainer
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="on leave">On Leave</TabsTrigger>
        </TabsList>
      </Tabs>

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

      <TrainerDialogs
        isAddOpen={isAddDialogOpen}
        setIsAddOpen={setIsAddDialogOpen}
        isEditOpen={isEditDialogOpen}
        setIsEditOpen={setIsEditDialogOpen}
        isCertOpen={isCertDialogOpen}
        setIsCertOpen={setIsCertDialogOpen}
        isAvailOpen={isAvailDialogOpen}
        setIsAvailOpen={setIsAvailDialogOpen}
        selectedTrainer={getSelectedTrainer()}
        onAddSubmit={handleAddTrainerSubmit}
        onEditSubmit={handleUpdateTrainerSubmit}
        onAddCertSubmit={handleAddCertificationSubmit}
        onAddAvailSubmit={handleAddAvailabilitySubmit}
      />
    </div>
  );
};

export default TrainerProfiles;
