
import React, { useRef, useState, useEffect } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/Button';
import { SubscriptionPlan } from '@/hooks/useSubscriptionPlans';
import { useSubscriptionCheckout } from '@/hooks/useSubscriptionCheckout';
import AuthModal from './AuthModal';
import PlanCheckoutModal from './PlanCheckoutModal';

interface MembershipPlanCardProps {
  plan: {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    buttonText: string;
    highlighted: boolean;
    planId: string;
  };
  onGetStarted: (planId: string) => void;
}

const MembershipPlanCard = ({ plan, onGetStarted }: MembershipPlanCardProps) => {
  return (
    <div 
      className={`bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl min-w-[300px] ${
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
            {plan.price}
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
          onClick={() => onGetStarted(plan.planId)}
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
  const { 
    isAuthModalOpen, 
    isCheckoutModalOpen, 
    isLoading, 
    selectedPlanId,
    startCheckout,
    closeAuthModal,
    closeCheckoutModal,
    proceedAfterAuth,
    completeSubscription
  } = useSubscriptionCheckout();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Get the selected plan
  const selectedPlan = plans.find(plan => plan.planId === selectedPlanId);
  
  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    // Show left arrow if scrolled right
    setShowLeftArrow(scrollLeft > 10);
    // Show right arrow if more content to scroll right
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
      // Check again after content might have loaded/rendered
      setTimeout(checkScroll, 100);
    }
    
    return () => {
      scrollContainer?.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

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

  const handleGetStarted = (planId: string) => {
    startCheckout(planId);
  };

  return (
    <>
      <div className="relative">
        {showLeftArrow && (
          <button 
            onClick={scrollLeft} 
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
            aria-label="Scroll left"
          >
            <ChevronLeft className="text-gym-dark" size={24} />
          </button>
        )}
        
        <div 
          ref={scrollContainerRef} 
          className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {plans.map((plan, index) => (
            <div key={index} className="snap-center first:ml-0 last:mr-0">
              <MembershipPlanCard 
                plan={plan} 
                onGetStarted={handleGetStarted}
              />
            </div>
          ))}
        </div>
        
        {showRightArrow && (
          <button 
            onClick={scrollRight} 
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="text-gym-dark" size={24} />
          </button>
        )}
      </div>

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal}
        onSuccess={proceedAfterAuth}
        planName={selectedPlan?.name || 'Membership Plan'}
      />
      
      {/* Checkout Modal */}
      <PlanCheckoutModal 
        isOpen={isCheckoutModalOpen}
        onClose={closeCheckoutModal}
        onComplete={completeSubscription}
        plan={selectedPlan}
        isLoading={isLoading}
      />
    </>
  );
};

export default MembershipPlansGrid;
