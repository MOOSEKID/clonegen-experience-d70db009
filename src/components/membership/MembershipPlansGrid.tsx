
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/Button';
import { SubscriptionPlan } from '@/hooks/useSubscriptionPlans';

interface MembershipPlanCardProps {
  plan: {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    buttonText: string;
    highlighted: boolean;
  };
}

const MembershipPlanCard = ({ plan }: MembershipPlanCardProps) => {
  return (
    <div 
      className={`bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
        plan.highlighted 
          ? 'ring-2 ring-gym-orange shadow-lg relative transform hover:-translate-y-2' 
          : 'shadow-md hover:-translate-y-1'
      }`}
    >
      {plan.highlighted && (
        <div className="absolute top-0 right-0 bg-gym-orange text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
          Popular
        </div>
      )}
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-2 text-gym-dark">{plan.name}</h3>
        <p className="text-gray-600 mb-6">{plan.description}</p>
        <div className="mb-8">
          <span className="text-4xl font-bold text-gym-dark">
            {plan.price.startsWith('RWF') ? plan.price : `RWF ${plan.price}`}
          </span>
          <span className="text-gray-500 ml-1">/ {plan.period}</span>
        </div>
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature: string, i: number) => (
            <li key={i} className="flex items-start">
              <Check className="text-gym-orange mr-2 flex-shrink-0 mt-1" size={18} />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        <Button 
          className="w-full" 
          variant={plan.highlighted ? 'primary' : 'outline'}
        >
          {plan.buttonText}
        </Button>
      </div>
    </div>
  );
};

interface MembershipPlansGridProps {
  plans: any[];
  loading: boolean;
}

const MembershipPlansGrid = ({ plans, loading }: MembershipPlansGridProps) => {
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gym-orange"></div>
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow-md">
        <p className="text-lg text-gray-500">No active membership plans available right now.</p>
        <p className="text-gray-500">Please check back soon or contact us for custom options.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan, index) => (
        <MembershipPlanCard key={index} plan={plan} />
      ))}
    </div>
  );
};

export default MembershipPlansGrid;
