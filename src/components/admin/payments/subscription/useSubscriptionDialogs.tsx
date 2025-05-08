
import { useState } from 'react';
import { SubscriptionPlan } from '@/hooks/useSubscriptionPlans';

export const useSubscriptionDialogs = () => {
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
  const [isPauseConfirmOpen, setIsPauseConfirmOpen] = useState(false);

  const openEditModal = (plan: SubscriptionPlan) => {
    setEditingPlan(plan);
    setIsEditModalOpen(true);
  };

  const openAddModal = () => {
    setEditingPlan(null);
    setIsAddModalOpen(true);
  };

  const openMembersModal = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setIsMembersModalOpen(true);
  };

  const openPauseConfirm = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setIsPauseConfirmOpen(true);
  };

  return {
    editingPlan,
    isEditModalOpen,
    setIsEditModalOpen,
    isAddModalOpen,
    setIsAddModalOpen,
    selectedPlan,
    isMembersModalOpen,
    setIsMembersModalOpen,
    isPauseConfirmOpen,
    setIsPauseConfirmOpen,
    openEditModal,
    openAddModal,
    openMembersModal,
    openPauseConfirm
  };
};
