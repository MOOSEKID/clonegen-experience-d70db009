
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface SubscriptionPlan {
  id: string;
  name: string;
  billingCycle: string;
  price: string;           // Formatted price with currency (display format)
  priceValue: number;      // Numeric price value (for calculations)
  currency: string;        // Currency code (RWF, USD, etc.)
  status: 'Active' | 'Paused' | 'Cancelled';
  memberCount: number;
  features: string[];
  planId?: string;
  slug?: string; // URL-friendly identifier for the plan
  checkoutUrl?: string; // Direct URL to checkout page
  is_visible_on_membership_page: boolean; // New field for controlling visibility
}

export const useSubscriptionPlans = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);

  // Load plans from localStorage on initial render
  useEffect(() => {
    const loadPlans = () => {
      try {
        const savedPlans = localStorage.getItem('subscriptionPlans');
        if (savedPlans) {
          setPlans(JSON.parse(savedPlans));
        } else {
          // If no plans in storage, use the default ones
          setPlans(defaultSubscriptionPlans);
          // Save default plans to localStorage
          localStorage.setItem('subscriptionPlans', JSON.stringify(defaultSubscriptionPlans));
        }
      } catch (error) {
        console.error('Error loading subscription plans:', error);
        toast.error('Failed to load subscription plans');
        // Fallback to defaults if there's an error
        setPlans(defaultSubscriptionPlans);
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, []);

  // Save plans to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('subscriptionPlans', JSON.stringify(plans));
    }
  }, [plans, loading]);

  // Format price consistently
  const formatPrice = (value: number, currency: string = 'RWF') => {
    return `${currency} ${value.toLocaleString()}`;
  };

  const addPlan = (plan: Omit<SubscriptionPlan, 'id' | 'status' | 'memberCount' | 'is_visible_on_membership_page' | 'priceValue' | 'currency'> & { priceValue?: number, currency?: string }) => {
    const newPlan: SubscriptionPlan = {
      id: Date.now().toString(),
      status: 'Active',
      memberCount: 0,
      is_visible_on_membership_page: true, // Default to visible
      priceValue: plan.priceValue || 0, // Default to 0 if not provided
      currency: plan.currency || 'RWF', // Default to RWF if not provided
      ...plan,
    };
    
    // Ensure the price string is formatted correctly
    if (!plan.price) {
      newPlan.price = formatPrice(newPlan.priceValue, newPlan.currency);
    }
    
    setPlans([...plans, newPlan]);
    return newPlan;
  };

  const updatePlan = (updatedPlan: Partial<SubscriptionPlan> & { id: string }) => {
    setPlans(plans.map(plan => {
      if (plan.id === updatedPlan.id) {
        const updated = { ...plan, ...updatedPlan };
        
        // Ensure price string is updated if priceValue or currency changes
        if (updatedPlan.priceValue !== undefined || updatedPlan.currency !== undefined) {
          const newPriceValue = updatedPlan.priceValue !== undefined ? updatedPlan.priceValue : plan.priceValue;
          const newCurrency = updatedPlan.currency || plan.currency;
          updated.price = formatPrice(newPriceValue, newCurrency);
        }
        
        return updated;
      }
      return plan;
    }));
  };

  const togglePlanStatus = (id: string) => {
    setPlans(plans.map(plan => 
      plan.id === id 
        ? { ...plan, status: plan.status === 'Active' ? 'Paused' : 'Active' } 
        : plan
    ));
    return plans.find(p => p.id === id)?.status === 'Active' ? 'Paused' : 'Active';
  };

  // Toggle plan visibility on membership page
  const togglePlanVisibility = (id: string) => {
    setPlans(plans.map(plan => 
      plan.id === id 
        ? { ...plan, is_visible_on_membership_page: !plan.is_visible_on_membership_page } 
        : plan
    ));
    return plans.find(p => p.id === id)?.is_visible_on_membership_page ? false : true;
  };

  // New function to get a specific plan by planId or slug
  const getPlanByIdentifier = (identifier: string): SubscriptionPlan | undefined => {
    // First try to match by planId
    let plan = plans.find(p => p.planId === identifier);
    
    // If not found, try to match by slug
    if (!plan) {
      plan = plans.find(p => p.slug === identifier);
    }
    
    // If still not found, try to match by id
    if (!plan) {
      plan = plans.find(p => p.id === identifier);
    }
    
    return plan;
  };

  return {
    plans,
    loading,
    addPlan,
    updatePlan,
    togglePlanStatus,
    togglePlanVisibility,
    getPlanByIdentifier,
    formatPrice
  };
};

// Default subscription plans data with consistent currency
const defaultSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: '1',
    name: 'Basic Membership',
    billingCycle: 'Monthly',
    price: 'RWF 29,999',
    priceValue: 29999,
    currency: 'RWF',
    status: 'Active',
    memberCount: 156,
    features: ['Gym Access', 'Basic Equipment', 'Locker Room'],
    planId: 'basic-monthly',
    is_visible_on_membership_page: true
  },
  {
    id: '2',
    name: 'Premium Membership',
    billingCycle: 'Monthly',
    price: 'RWF 49,999',
    priceValue: 49999,
    currency: 'RWF',
    status: 'Active',
    memberCount: 89,
    features: ['Full Gym Access', 'Group Classes', 'Personal Trainer (1x/month)'],
    planId: 'premium-monthly',
    is_visible_on_membership_page: true
  },
  {
    id: '3',
    name: 'Family Plan',
    billingCycle: 'Annual',
    price: 'RWF 899,999',
    priceValue: 899999,
    currency: 'RWF',
    status: 'Active',
    memberCount: 34,
    features: ['Access for 4 Family Members', 'Group Classes', 'Pool & Spa'],
    planId: 'family-annual',
    is_visible_on_membership_page: true
  },
  {
    id: '4',
    name: 'Student Discount',
    billingCycle: 'Semester',
    price: 'RWF 199,999',
    priceValue: 199999,
    currency: 'RWF',
    status: 'Paused',
    memberCount: 127,
    features: ['Valid Student ID Required', 'Gym Access', 'Study Area'],
    planId: 'student-semester',
    is_visible_on_membership_page: false
  },
  {
    id: '5',
    name: 'Corporate Partnership',
    billingCycle: 'Annual',
    price: 'Custom',
    priceValue: 0,
    currency: 'RWF',
    status: 'Active',
    memberCount: 213,
    features: ['Bulk Discounts', '24/7 Access', 'Dedicated Support'],
    planId: 'corporate-annual',
    is_visible_on_membership_page: false
  }
];
