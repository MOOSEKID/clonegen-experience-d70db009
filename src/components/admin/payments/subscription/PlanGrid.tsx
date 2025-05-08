
import { SubscriptionPlan } from '@/hooks/useSubscriptionPlans';
import { PlanCard } from './PlanCard';

interface PlanGridProps {
  plans: SubscriptionPlan[];
  onEdit: (plan: SubscriptionPlan) => void;
  onToggleStatus: (plan: SubscriptionPlan) => void;
  onViewMembers: (plan: SubscriptionPlan) => void;
  onToggleVisibility?: (plan: SubscriptionPlan) => void;
  isLoading: boolean;
}

export const PlanGrid = ({ 
  plans, 
  onEdit, 
  onToggleStatus, 
  onViewMembers,
  onToggleVisibility,
  isLoading
}: PlanGridProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <PlanCard 
          key={plan.id}
          plan={plan}
          onEdit={onEdit}
          onToggleStatus={onToggleStatus}
          onViewMembers={onViewMembers}
          onToggleVisibility={onToggleVisibility}
        />
      ))}
    </div>
  );
};
