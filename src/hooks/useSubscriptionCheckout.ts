
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOptimizedAuthContext } from '@/hooks/useOptimizedAuthContext';
import { useSubscriptionPlans } from '@/hooks/useSubscriptionPlans';
import { useUserProfile } from '@/hooks/useUserProfile';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface CheckoutState {
  isLoading: boolean;
  selectedPlanId: string | null;
  isAuthModalOpen: boolean;
  isCheckoutModalOpen: boolean;
}

interface SubscriptionUpdate {
  active_plan_id: string | null;
  billing_start_date: string | null;
  subscription_status: string | null;
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
  const { userProfile, updateUserProfile } = useUserProfile();
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
      
      // Create a properly typed subscription update object
      const subscriptionUpdate: SubscriptionUpdate = {
        active_plan_id: plan.planId || plan.id,
        billing_start_date: formattedDate,
        subscription_status: 'Active'
      };
      
      // Update user profile with subscription info using the updateUserProfile function
      try {
        await updateUserProfile(subscriptionUpdate);
        toast.success("Your subscription has been activated successfully!");
        closeCheckoutModal();
        
        // Redirect to dashboard instead of member/dashboard
        navigate('/dashboard');
      } catch (error: any) {
        console.error('Failed to update subscription', error);
        toast.error("Failed to activate your subscription. Please try again.");
      }
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
