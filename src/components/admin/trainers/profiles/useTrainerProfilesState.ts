import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Database } from '@/types/database.types';
import { TrainerProfile as BaseTrainerProfile } from '@/hooks/trainers/useTrainerProfiles';

export interface TrainerProfile extends BaseTrainerProfile {
  is_staff: boolean;
  availability: {
    id: string;
    trainer_id: string;
    day_of_week: string;
    start_time: string;
    end_time: string;
  }[];
}

export const useTrainerProfilesState = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<TrainerProfile | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAvailModalOpen, setIsAvailModalOpen] = useState(false);
  const [isAddAvailModalOpen, setIsAddAvailModalOpen] = useState(false);
  const [isDeleteAvailModalOpen, setIsDeleteAvailModalOpen] = useState(false);

  // Fetch trainers
  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ['trainers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('staff_category', 'training')
        .order('full_name');

      if (error) {
        toast.error('Failed to fetch trainers');
        throw error;
      }

      return data as TrainerProfile[];
    },
  });

  // Filter trainers based on active tab
  const filteredTrainers = trainers.filter(trainer => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return trainer.status === 'active';
    if (activeTab === 'inactive') return trainer.status === 'inactive';
    if (activeTab === 'on leave') return trainer.status === 'on leave';
    return true;
  });

  // Get selected trainer data
  const getSelectedTrainer = () => {
    return trainers.find(trainer => trainer.id === selectedTrainer?.id);
  };

  // Add trainer mutation
  const addTrainerMutation = useMutation({
    mutationFn: async (newTrainer: Partial<TrainerProfile>) => {
      const { data, error } = await supabase
        .from('profiles')
        .insert([{
          ...newTrainer,
          staff_category: 'training',
          is_staff: true,
          access_level: 'basic',
          certifications: [],
          availability: [],
          specializations: [],
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainers'] });
      toast.success('Trainer added successfully');
      setIsAddDialogOpen(false);
    },
    onError: (error) => {
      toast.error('Failed to add trainer');
      console.error('Add trainer error:', error);
    },
  });

  // Update trainer mutation
  const updateTrainerMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<TrainerProfile> }) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainers'] });
      toast.success('Trainer updated successfully');
      setIsEditModalOpen(false);
    },
    onError: (error) => {
      toast.error('Failed to update trainer');
      console.error('Update trainer error:', error);
    },
  });

  // Delete trainer mutation
  const deleteTrainerMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trainers'] });
      toast.success('Trainer deleted successfully');
    },
    onError: (error) => {
      toast.error('Failed to delete trainer');
      console.error('Delete trainer error:', error);
    },
  });

  const handleTrainerSelect = (trainer: TrainerProfile) => {
    setSelectedTrainer(trainer);
  };

  const handleEditClick = (trainer: TrainerProfile) => {
    setSelectedTrainer(trainer);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (trainer: TrainerProfile) => {
    setSelectedTrainer(trainer);
    setIsDeleteModalOpen(true);
  };

  const handleAvailabilityClick = (trainer: TrainerProfile) => {
    setSelectedTrainer(trainer);
    setIsAvailModalOpen(true);
  };

  const handleAddAvailabilityClick = (trainer: TrainerProfile) => {
    setSelectedTrainer(trainer);
    setIsAddAvailModalOpen(true);
  };

  const handleDeleteAvailabilityClick = (trainer: TrainerProfile) => {
    setSelectedTrainer(trainer);
    setIsDeleteAvailModalOpen(true);
  };

  const closeModals = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsAvailModalOpen(false);
    setIsAddAvailModalOpen(false);
    setIsDeleteAvailModalOpen(false);
    setSelectedTrainer(null);
  };

  const handleAddTrainer = () => setIsAddDialogOpen(true);

  const handleAddTrainerSubmit = (data: Partial<TrainerProfile>) => {
    addTrainerMutation.mutate(data);
  };

  const handleUpdateTrainerSubmit = (data: Partial<TrainerProfile>) => {
    if (!selectedTrainer) return;
    updateTrainerMutation.mutate({ id: selectedTrainer.id, updates: data });
  };

  const handleDeleteTrainerSubmit = (id: string) => {
    if (window.confirm('Are you sure you want to delete this trainer?')) {
      deleteTrainerMutation.mutate(id);
    }
  };

  return {
    isLoading,
    filteredTrainers,
    isAddDialogOpen,
    setIsAddDialogOpen,
    selectedTrainer,
    isEditModalOpen,
    isDeleteModalOpen,
    isAvailModalOpen,
    isAddAvailModalOpen,
    isDeleteAvailModalOpen,
    handleTrainerSelect,
    handleEditClick,
    handleDeleteClick,
    handleAvailabilityClick,
    handleAddAvailabilityClick,
    handleDeleteAvailabilityClick,
    closeModals,
    handleAddTrainer,
    handleAddTrainerSubmit,
    handleUpdateTrainerSubmit,
    handleDeleteTrainerSubmit,
  };
};

export default useTrainerProfilesState;
