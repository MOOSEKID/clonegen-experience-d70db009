
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import TrainerDialogs from '@/components/admin/trainers/profiles/TrainerDialogs';
import { useAuth } from '@/hooks/useAuth';
import useTrainerProfilesState from '@/components/admin/trainers/profiles/useTrainerProfilesState';
import TrainerProfilesGrid from '@/components/admin/trainers/profiles/TrainerProfilesGrid';

const TrainerProfiles = () => {
  const { isAdmin } = useAuth();
  const [selectedTab, setSelectedTab] = useState('all');
  
  const {
    isLoading,
    filteredTrainers,
    isAddDialogOpen,
    setIsAddDialogOpen,
    handleAddTrainer,
    handleAddTrainerSubmit,
    handleUpdateTrainerSubmit,
    handleDeleteTrainerSubmit,
  } = useTrainerProfilesState();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Trainer Profiles</h2>
        {isAdmin && (
          <Button onClick={handleAddTrainer} className="bg-gym-orange hover:bg-gym-orange/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Trainer
          </Button>
        )}
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Trainers</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
          <TabsTrigger value="on leave">On Leave</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <TrainerProfilesGrid
            trainers={filteredTrainers}
            isLoading={isLoading}
            isAdmin={isAdmin}
          />
        </TabsContent>
        
        <TabsContent value="active" className="mt-0">
          <TrainerProfilesGrid
            trainers={filteredTrainers.filter(trainer => trainer.status === 'active')}
            isLoading={isLoading}
            isAdmin={isAdmin}
          />
        </TabsContent>
        
        <TabsContent value="inactive" className="mt-0">
          <TrainerProfilesGrid
            trainers={filteredTrainers.filter(trainer => trainer.status === 'inactive')}
            isLoading={isLoading}
            isAdmin={isAdmin}
          />
        </TabsContent>
        
        <TabsContent value="on leave" className="mt-0">
          <TrainerProfilesGrid
            trainers={filteredTrainers.filter(trainer => trainer.status === 'on leave')}
            isLoading={isLoading}
            isAdmin={isAdmin}
          />
        </TabsContent>
      </Tabs>
      
      {/* Modals */}
      <TrainerDialogs
        isAddOpen={isAddDialogOpen}
        setIsAddOpen={setIsAddDialogOpen}
        onAddSubmit={handleAddTrainerSubmit}
        onUpdateSubmit={handleUpdateTrainerSubmit}
        onDeleteSubmit={handleDeleteTrainerSubmit}
      />
    </div>
  );
};

export default TrainerProfiles;
