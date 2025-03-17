import React, { useState } from 'react';
import { useTrainerProfiles, TrainerProfile } from '@/hooks/trainers/useTrainerProfiles';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

import TrainerProfilesGrid from '@/components/admin/trainers/trainerprofiles/TrainerProfilesGrid';
import TrainerDialogs from '@/components/admin/trainers/profiles/TrainerDialogs';

const TrainerProfiles = () => {
  const {
    trainers,
    isLoading,
    addTrainer,
    updateTrainer,
    deleteTrainer,
    addCertification,
    deleteCertification,
    addAvailability,
    deleteAvailability
  } = useTrainerProfiles();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCertDialogOpen, setIsCertDialogOpen] = useState(false);
  const [isAvailDialogOpen, setIsAvailDialogOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  // Filter trainers based on active tab
  const filteredTrainers = trainers.filter((trainer) => {
    if (activeTab === 'all') return true;
    return trainer.status?.toLowerCase() === activeTab;
  });

  // Get the selected trainer object
  const getSelectedTrainer = () => {
    return trainers.find((trainer) => trainer.id === selectedTrainer) || null;
  };

  const handleAddTrainer = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditTrainer = (trainerId: string) => {
    setSelectedTrainer(trainerId);
    setIsEditDialogOpen(true);
  };

  const handleAddCertification = (trainerId: string) => {
    setSelectedTrainer(trainerId);
    setIsCertDialogOpen(true);
  };

  const handleAddAvailability = (trainerId: string) => {
    setSelectedTrainer(trainerId);
    setIsAvailDialogOpen(true);
  };

  const handleAddTrainerSubmit = async (data: any) => {
    await addTrainer(data);
    setIsAddDialogOpen(false);
  };

  const handleUpdateTrainerSubmit = async (id: string, data: any) => {
    await updateTrainer(id, data);
    setIsEditDialogOpen(false);
  };

  const handleDeleteTrainerSubmit = async (id: string) => {
    await deleteTrainer(id);
  };

  const handleAddCertificationSubmit = async (data: any) => {
    await addCertification(data);
    setIsCertDialogOpen(false);
  };

  const handleDeleteCertificationSubmit = async (id: string) => {
    await deleteCertification(id);
  };

  const handleAddAvailabilitySubmit = async (data: any) => {
    await addAvailability(data);
    setIsAvailDialogOpen(false);
  };

  const handleDeleteAvailabilitySubmit = async (id: string) => {
    await deleteAvailability(id);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Trainer Profiles</h1>
          <p className="text-gray-500">Manage your gym's trainers, specializations and availability</p>
        </div>
        <Button onClick={handleAddTrainer} className="bg-gym-orange hover:bg-opacity-90">
          <Plus className="mr-1 h-4 w-4" />
          Add Trainer
        </Button>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="all">All Trainers</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="on leave">On Leave</TabsTrigger>
        </TabsList>
        
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
      </Tabs>
      
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
