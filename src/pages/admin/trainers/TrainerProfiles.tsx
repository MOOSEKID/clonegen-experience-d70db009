
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, Search, Filter, Award, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTrainerProfiles, TrainerProfile, TrainerCertification, TrainerAvailability } from '@/hooks/trainers/useTrainerProfiles';
import TrainerCard from '@/components/admin/trainers/profiles/TrainerCard';
import TrainerAddForm from '@/components/admin/trainers/profiles/TrainerAddForm';
import TrainerCertificationForm from '@/components/admin/trainers/profiles/TrainerCertificationForm';
import TrainerAvailabilityForm from '@/components/admin/trainers/profiles/TrainerAvailabilityForm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

const TrainerProfiles = () => {
  const { trainers, isLoading, addTrainer, updateTrainer, deleteTrainer, addCertification, deleteCertification, addAvailability, deleteAvailability } = useTrainerProfiles();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [specializationFilter, setSpecializationFilter] = useState('all');
  const [isAddTrainerModalOpen, setIsAddTrainerModalOpen] = useState(false);
  const [selectedTrainerId, setSelectedTrainerId] = useState<string | null>(null);
  const [modalTab, setModalTab] = useState('certification');

  // Get unique specializations for filter dropdown
  const uniqueSpecializations = Array.from(
    new Set(
      trainers
        .flatMap(trainer => trainer.specialization || [])
        .filter(Boolean)
    )
  ).sort();

  // Filter trainers based on search term and filters
  const filteredTrainers = trainers.filter(trainer => {
    const matchesSearch = 
      trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || trainer.status === statusFilter;
    
    const matchesSpecialization = specializationFilter === 'all' || 
      (trainer.specialization && trainer.specialization.includes(specializationFilter));
    
    return matchesSearch && matchesStatus && matchesSpecialization;
  });

  const handleAddCertificationOrAvailability = (trainerId: string) => {
    setSelectedTrainerId(trainerId);
    setModalTab('certification');
  };

  // Wrapper functions to convert Promise<boolean> to Promise<void>
  const handleDeleteTrainer = async (id: string): Promise<void> => {
    await deleteTrainer(id);
  };

  const handleUpdateTrainer = async (id: string, updates: Partial<Omit<TrainerProfile, 'id' | 'certifications' | 'availability'>>): Promise<void> => {
    await updateTrainer(id, updates);
  };

  const handleDeleteCertification = async (id: string): Promise<void> => {
    await deleteCertification(id);
  };

  const handleDeleteAvailability = async (id: string): Promise<void> => {
    await deleteAvailability(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Trainer Profiles</h1>
          <p className="text-gray-500">Manage trainer profiles, certifications, and availability</p>
        </div>
        <Button onClick={() => setIsAddTrainerModalOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Trainer
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search trainers..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="w-full md:w-40">
            <Select 
              value={statusFilter} 
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>Status</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-48">
            <Select 
              value={specializationFilter} 
              onValueChange={setSpecializationFilter}
            >
              <SelectTrigger className="w-full">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <span>Specialization</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specializations</SelectItem>
                {uniqueSpecializations.map(spec => (
                  <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-96 w-full" />
          ))}
        </div>
      ) : filteredTrainers.length === 0 ? (
        <div className="bg-gray-50 text-center p-12 rounded-lg border border-dashed">
          <p className="text-gray-500">No trainers found matching your filters.</p>
          {searchTerm && (
            <Button 
              variant="link" 
              onClick={() => setSearchTerm('')}
              className="mt-2"
            >
              Clear search
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainers.map(trainer => (
            <TrainerCard 
              key={trainer.id} 
              trainer={trainer}
              onDelete={handleDeleteTrainer}
              onUpdate={handleUpdateTrainer}
              onDeleteCertification={handleDeleteCertification}
              onDeleteAvailability={handleDeleteAvailability}
            />
          ))}
        </div>
      )}

      {/* Add Trainer Modal */}
      <Dialog open={isAddTrainerModalOpen} onOpenChange={setIsAddTrainerModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Trainer</DialogTitle>
          </DialogHeader>
          <TrainerAddForm 
            onSubmit={async (data) => {
              await addTrainer(data);
              setIsAddTrainerModalOpen(false);
            }}
            onCancel={() => setIsAddTrainerModalOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Add Certification/Availability Modal */}
      <Dialog 
        open={selectedTrainerId !== null} 
        onOpenChange={(open) => !open && setSelectedTrainerId(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {modalTab === 'certification' ? 'Add Certification' : 'Add Availability'}
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue={modalTab} onValueChange={setModalTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="certification" className="flex items-center">
                <Award className="h-4 w-4 mr-2" />
                Certification
              </TabsTrigger>
              <TabsTrigger value="availability" className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Availability
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="certification" className="pt-4">
              {selectedTrainerId && (
                <TrainerCertificationForm 
                  trainerId={selectedTrainerId}
                  onSubmit={async (data: Omit<TrainerCertification, 'id'>) => {
                    await addCertification(data);
                    setSelectedTrainerId(null);
                  }}
                  onCancel={() => setSelectedTrainerId(null)}
                />
              )}
            </TabsContent>
            
            <TabsContent value="availability" className="pt-4">
              {selectedTrainerId && (
                <TrainerAvailabilityForm
                  trainerId={selectedTrainerId}
                  onSubmit={async (data: Omit<TrainerAvailability, 'id'>) => {
                    await addAvailability(data);
                    setSelectedTrainerId(null);
                  }}
                  onCancel={() => setSelectedTrainerId(null)}
                />
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainerProfiles;
