
import { toast } from 'sonner';
import { EditPlanDialog } from '@/components/admin/payments/EditPlanDialog';
import { PlanMembersDialog } from '@/components/admin/payments/PlanMembersDialog';
import { ConfirmationDialog } from '@/components/admin/payments/ConfirmationDialog';
import { useSubscriptionPlans } from '@/hooks/useSubscriptionPlans';
import { SubscriptionHeader } from '@/components/admin/payments/subscription/SubscriptionHeader';
import { PlanGrid } from '@/components/admin/payments/subscription/PlanGrid';
import { useSubscriptionDialogs } from '@/components/admin/payments/subscription/useSubscriptionDialogs';

const Subscriptions = () => {
  const { plans, addPlan, updatePlan, togglePlanStatus, loading } = useSubscriptionPlans();
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
    </div>
  );
};

export default Subscriptions;
