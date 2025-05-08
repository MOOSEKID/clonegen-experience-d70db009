
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Pencil, Pause, Users, Link as LinkIcon, Eye, EyeOff } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { SubscriptionPlan } from '@/hooks/useSubscriptionPlans';

interface PlanCardProps {
  plan: SubscriptionPlan;
  onEdit: (plan: SubscriptionPlan) => void;
  onToggleStatus: (plan: SubscriptionPlan) => void;
  onViewMembers: (plan: SubscriptionPlan) => void;
  onToggleVisibility?: (plan: SubscriptionPlan) => void;
}

export const PlanCard = ({ 
  plan, 
  onEdit, 
  onToggleStatus, 
  onViewMembers,
  onToggleVisibility
}: PlanCardProps) => {
  return (
    <Card className={`flex flex-col ${plan.status !== 'Active' ? 'opacity-75' : ''}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle>{plan.name}</CardTitle>
            {plan.planId && (
              <div className="flex items-center text-xs text-gray-500">
                <LinkIcon className="h-3 w-3 mr-1" />
                <span>{plan.planId}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {plan.is_visible_on_membership_page ? (
              <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                <span>Visible</span>
              </div>
            ) : (
              <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full flex items-center">
                <EyeOff className="h-3 w-3 mr-1" />
                <span>Hidden</span>
              </div>
            )}
            <StatusBadge status={plan.status} />
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="text-sm text-gray-500">{plan.billingCycle}</div>
          <div className="text-xl font-bold">{plan.price}</div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div className="text-sm space-y-2">
            {plan.features.map((feature, idx) => (
              <div key={idx} className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center mt-4">
            <Users className="h-4 w-4 mr-1 text-gray-500" />
            <span className="text-sm text-gray-500">{plan.memberCount} members</span>
          </div>
        </div>
      </CardContent>
      <div className="p-4 pt-0 border-t mt-auto">
        <div className="flex flex-wrap gap-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onEdit(plan)}
          >
            <Pencil className="h-4 w-4 mr-1" /> Edit
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onToggleStatus(plan)}
          >
            {plan.status === 'Active' ? (
              <><Pause className="h-4 w-4 mr-1" /> Pause</>
            ) : (
              <><Check className="h-4 w-4 mr-1" /> Activate</>
            )}
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onViewMembers(plan)}
          >
            <Users className="h-4 w-4 mr-1" /> Members
          </Button>
          {onToggleVisibility && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onToggleVisibility(plan)}
            >
              {plan.is_visible_on_membership_page ? (
                <><EyeOff className="h-4 w-4 mr-1" /> Hide</>
              ) : (
                <><Eye className="h-4 w-4 mr-1" /> Show</>
              )}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
