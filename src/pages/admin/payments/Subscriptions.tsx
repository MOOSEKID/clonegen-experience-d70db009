
import React, { useState } from 'react';
import { toast } from 'sonner';
import { EditPlanDialog } from '@/components/admin/payments/EditPlanDialog';
import { PlanMembersDialog } from '@/components/admin/payments/PlanMembersDialog';
import { ConfirmationDialog } from '@/components/admin/payments/ConfirmationDialog';
import { useSubscriptionPlans, SubscriptionPlan } from '@/hooks/useSubscriptionPlans';
import { SubscriptionHeader } from '@/components/admin/payments/subscription/SubscriptionHeader';
import { PlanGrid } from '@/components/admin/payments/subscription/PlanGrid';
import { useSubscriptionDialogs } from '@/components/admin/payments/subscription/useSubscriptionDialogs';

const Subscriptions = () => {
  const { plans, addPlan, updatePlan, togglePlanStatus, togglePlanVisibility, loading } = useSubscriptionPlans();
  const {
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
  } = useSubscriptionDialogs();

  // Add state for visibility confirmation dialog
  const [isVisibilityConfirmOpen, setIsVisibilityConfirmOpen] = useState(false);

  const handleTogglePlanStatus = (id: string) => {
    const newStatus = togglePlanStatus(id);
    // Close the confirmation dialog
    setIsPauseConfirmOpen(false);
    // Show toast notification
    const plan = plans.find(p => p.id === id);
    if (plan) {
      toast.success(`${plan.name} has been ${newStatus === 'Active' ? 'activated' : 'paused'}`);
    }
  };

  const handleToggleVisibility = (id: string) => {
    const newVisibility = togglePlanVisibility(id);
    // Close the confirmation dialog
    setIsVisibilityConfirmOpen(false);
    // Show toast notification
    const plan = plans.find(p => p.id === id);
    if (plan) {
      toast.success(`${plan.name} is now ${newVisibility ? 'visible' : 'hidden'} on the membership page`);
    }
  };

  const openVisibilityConfirm = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setIsVisibilityConfirmOpen(true);
  };

  // Helper function to encapsulate setting the selected plan
  const setSelectedPlan = (plan: SubscriptionPlan) => {
    // Using any subscription dialog function that sets selectedPlan
    openEditModal(plan);
    // Close the edit modal that was just opened
    setIsEditModalOpen(false);
  };

  const handleSavePlan = (data: any) => {
    if (editingPlan) {
      // Update existing plan
      updatePlan({
        id: editingPlan.id,
        ...data,
        status: editingPlan.status,
        memberCount: editingPlan.memberCount
      });
      toast.success(`Updated "${data.name}" plan successfully`);
      setIsEditModalOpen(false);
    } else {
      // Add new plan
      addPlan(data);
      toast.success(`Created "${data.name}" plan successfully`);
      setIsAddModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      <SubscriptionHeader onAddPlan={openAddModal} />

      <PlanGrid 
        plans={plans}
        onEdit={openEditModal}
        onToggleStatus={openPauseConfirm}
        onViewMembers={openMembersModal}
        onToggleVisibility={openVisibilityConfirm}
        isLoading={loading}
      />

      {/* Edit Plan Modal */}
      <EditPlanDialog
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSavePlan}
        plan={editingPlan || undefined}
      />

      {/* Add Plan Modal */}
      <EditPlanDialog
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSavePlan}
        plan={undefined}
      />

      {/* View Members Modal */}
      {selectedPlan && (
        <PlanMembersDialog
          isOpen={isMembersModalOpen}
          onClose={() => setIsMembersModalOpen(false)}
          planName={selectedPlan.name}
          planId={selectedPlan.id}
        />
      )}

      {/* Pause/Activate Confirmation */}
      {selectedPlan && (
        <ConfirmationDialog
          isOpen={isPauseConfirmOpen}
          onClose={() => setIsPauseConfirmOpen(false)}
          onConfirm={() => handleTogglePlanStatus(selectedPlan.id)}
          title={selectedPlan.status === 'Active' ? 'Pause Plan' : 'Activate Plan'}
          description={
            selectedPlan.status === 'Active'
              ? `Are you sure you want to pause the "${selectedPlan.name}" plan? This will prevent new members from subscribing to it.`
              : `Are you sure you want to activate the "${selectedPlan.name}" plan? This will make it available for new subscriptions.`
          }
          confirmLabel={selectedPlan.status === 'Active' ? 'Pause' : 'Activate'}
        />
      )}

      {/* Visibility Confirmation */}
      {selectedPlan && (
        <ConfirmationDialog
          isOpen={isVisibilityConfirmOpen}
          onClose={() => setIsVisibilityConfirmOpen(false)}
          onConfirm={() => handleToggleVisibility(selectedPlan.id)}
          title={selectedPlan.is_visible_on_membership_page ? 'Hide Plan' : 'Show Plan'}
          description={
            selectedPlan.is_visible_on_membership_page
              ? `Are you sure you want to hide "${selectedPlan.name}" from the membership page? It will no longer be visible to potential customers.`
              : `Are you sure you want to show "${selectedPlan.name}" on the membership page? It will be visible to potential customers.`
          }
          confirmLabel={selectedPlan.is_visible_on_membership_page ? 'Hide' : 'Show'}
        />
      )}
    </div>
  );
};

export default Subscriptions;
