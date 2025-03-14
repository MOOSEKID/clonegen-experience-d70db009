
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTrainerProfiles } from '@/hooks/trainers/useTrainerProfiles';
import TrainerCard from '@/components/admin/trainers/profiles/TrainerCard';
import TrainerAddForm from '@/components/admin/trainers/profiles/TrainerAddForm';
import TrainerEditForm from '@/components/admin/trainers/profiles/TrainerEditForm';
import TrainerCertificationForm from '@/components/admin/trainers/profiles/TrainerCertificationForm';
import TrainerAvailabilityForm from '@/components/admin/trainers/profiles/TrainerAvailabilityForm';

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
  const filteredTrainers = trainers.filter(trainer => {
    if (activeTab === 'all') return true;
    return trainer.status?.toLowerCase() === activeTab;
  });
  
  // Get the selected trainer object
  const getSelectedTrainer = () => {
    return trainers.find(trainer => trainer.id === selectedTrainer) || null;
  };
  
  // Handle dialog openings
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
  
  // Wrapper functions to handle Promise<void> return types
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Trainer Profiles</h1>
        <Button onClick={handleAddTrainer} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add New Trainer
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="flex">
          <TabsTrigger value="all">All Trainers</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="on leave">On Leave</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4">
          {isLoading ? (
            <Card>
              <CardContent className="p-6">
                <p>Loading trainer data...</p>
              </CardContent>
            </Card>
          ) : filteredTrainers.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">No trainers found in this category.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTrainers.map(trainer => (
                <TrainerCard 
                  key={trainer.id}
                  trainer={trainer}
                  onEdit={() => handleEditTrainer(trainer.id)}
                  onDelete={() => handleDeleteTrainerSubmit(trainer.id)}
                  onAddCertification={() => handleAddCertification(trainer.id)}
                  onDeleteCertification={handleDeleteCertificationSubmit}
                  onAddAvailability={() => handleAddAvailability(trainer.id)}
                  onDeleteAvailability={handleDeleteAvailabilitySubmit}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Add Trainer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Trainer</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[80vh]">
            <div className="p-1">
              <TrainerAddForm 
                onSubmit={handleAddTrainerSubmit}
                onCancel={() => setIsAddDialogOpen(false)}
              />
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      
      {/* Edit Trainer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Trainer</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[80vh]">
            <div className="p-1">
              {getSelectedTrainer() && (
                <TrainerEditForm 
                  trainer={getSelectedTrainer()!}
                  onSubmit={handleUpdateTrainerSubmit}
                  onCancel={() => setIsEditDialogOpen(false)}
                />
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      
      {/* Add Certification Dialog */}
      <Dialog open={isCertDialogOpen} onOpenChange={setIsCertDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Certification</DialogTitle>
          </DialogHeader>
          {selectedTrainer && (
            <TrainerCertificationForm 
              trainerId={selectedTrainer}
              onSubmit={handleAddCertificationSubmit}
              onCancel={() => setIsCertDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Add Availability Dialog */}
      <Dialog open={isAvailDialogOpen} onOpenChange={setIsAvailDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Availability</DialogTitle>
          </DialogHeader>
          {selectedTrainer && (
            <TrainerAvailabilityForm 
              trainerId={selectedTrainer}
              onSubmit={handleAddAvailabilitySubmit}
              onCancel={() => setIsAvailDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainerProfiles;
