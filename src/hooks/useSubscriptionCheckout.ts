
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOptimizedAuthContext } from '@/hooks/useOptimizedAuthContext';
import { useSubscriptionPlans } from '@/hooks/useSubscriptionPlans';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface CheckoutState {
  isLoading: boolean;
  selectedPlanId: string | null;
  isAuthModalOpen: boolean;
  isCheckoutModalOpen: boolean;
}

export const useSubscriptionCheckout = () => {
  const [state, setState] = useState<CheckoutState>({
    isLoading: false,
    selectedPlanId: null,
    isAuthModalOpen: false,
    isCheckoutModalOpen: false,
  });
  const { isAuthenticated, user } = useOptimizedAuthContext();
  const { getPlanByIdentifier } = useSubscriptionPlans();
  const navigate = useNavigate();

  // Handle the initial checkout flow
  const startCheckout = async (planIdentifier: string) => {
    setState(prev => ({ ...prev, isLoading: true, selectedPlanId: planIdentifier }));
    
    // If user is not authenticated, show login modal
    if (!isAuthenticated) {
      setState(prev => ({ ...prev, isAuthModalOpen: true, isLoading: false }));
      return;
    }
    
    // User is authenticated, proceed to checkout
    const plan = getPlanByIdentifier(planIdentifier);
    if (!plan) {
      toast.error("Unable to find the selected membership plan.");
      setState(prev => ({ ...prev, isLoading: false }));
      return;
    }
    
    // Show checkout modal or navigate to checkout page
    setState(prev => ({ ...prev, isCheckoutModalOpen: true, isLoading: false }));
  };

  // Close the auth modal
  const closeAuthModal = () => {
    setState(prev => ({ ...prev, isAuthModalOpen: false }));
  };

  // Close the checkout modal
  const closeCheckoutModal = () => {
    setState(prev => ({ ...prev, isCheckoutModalOpen: false }));
  };

  // Proceed after successful authentication
  const proceedAfterAuth = () => {
    closeAuthModal();
    setState(prev => ({ ...prev, isCheckoutModalOpen: true }));
  };

  // Complete subscription process
  const completeSubscription = async (paymentMethod: string) => {
    if (!state.selectedPlanId || !user) return;
    
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const plan = getPlanByIdentifier(state.selectedPlanId);
      
      if (!plan) {
        toast.error("Selected plan is no longer available.");
        setState(prev => ({ ...prev, isLoading: false }));
        return;
      }
      
      // Get today's date for billing start
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      
      // Update user profile with subscription info
      // Using a type-safe approach for the update operation
      const updates = {
        active_plan_id: plan.planId || plan.id,
        billing_start_date: formattedDate,
        subscription_status: 'Active'
      };
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
        
      if (error) {
        console.error('Failed to update subscription', error);
        toast.error("Failed to activate your subscription. Please try again.");
        setState(prev => ({ ...prev, isLoading: false }));
        return;
      }
      
      toast.success("Your subscription has been activated successfully!");
      closeCheckoutModal();
      
      // Redirect to member dashboard or confirmation page
      navigate('/member/dashboard');
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  return {
    ...state,
    startCheckout,
    closeAuthModal,
    closeCheckoutModal,
    proceedAfterAuth,
    completeSubscription
  };
};
