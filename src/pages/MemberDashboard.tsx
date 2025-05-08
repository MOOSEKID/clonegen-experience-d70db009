
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useOptimizedAuthContext } from '@/hooks/useOptimizedAuthContext';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useSubscriptionPlans } from '@/hooks/useSubscriptionPlans';
import { toast } from 'sonner';

const MemberDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useOptimizedAuthContext();
  const { userProfile, isLoading: profileLoading } = useUserProfile();
  const { plans, loading: plansLoading, getPlanByIdentifier } = useSubscriptionPlans();
  const [activePlan, setActivePlan] = useState<any>(null);
  
  useEffect(() => {
    if (!profileLoading && userProfile && userProfile.active_plan_id && !plansLoading) {
      const plan = getPlanByIdentifier(userProfile.active_plan_id);
      if (plan) {
        setActivePlan(plan);
      } else {
        console.log('Plan not found for ID:', userProfile.active_plan_id);
      }
    }
  }, [profileLoading, userProfile, plansLoading, plans, getPlanByIdentifier]);

  useEffect(() => {
    // If this component is rendered, and the URL is '/member/dashboard',
    // we should redirect to '/dashboard' to match our route structure
    if (window.location.pathname === '/member/dashboard') {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);
  
  // Redirect if not authenticated
  if (!isAuthenticated && !profileLoading) {
    return <Navigate to="/auth/login" />;
  }
  
  if (profileLoading || plansLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gym-orange"></div>
      </div>
    );
  }

  return (
    <main className="pt-24 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <h1 className="text-3xl font-bold mb-6">Member Dashboard</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Welcome, {userProfile?.full_name || 'Member'}</h2>
          
          {activePlan ? (
            <div>
              <div className="mb-4">
                <span className="text-gray-600">Current Plan:</span>
                <span className="ml-2 font-medium">{activePlan.name}</span>
                <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Active</span>
              </div>
              
              <div className="mb-4">
                <span className="text-gray-600">Billing Cycle:</span>
                <span className="ml-2">{activePlan.billingCycle}</span>
              </div>
              
              <div className="mb-4">
                <span className="text-gray-600">Price:</span>
                <span className="ml-2 font-medium">
                  {activePlan.price.startsWith('RWF') ? activePlan.price : `RWF ${activePlan.price}`}
                  /{activePlan.billingCycle.toLowerCase()}
                </span>
              </div>
              
              <div className="mb-4">
                <span className="text-gray-600">Started On:</span>
                <span className="ml-2">{userProfile?.billing_start_date || 'N/A'}</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">You don't have an active membership plan.</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
            <p className="text-gray-600">No recent activity to display.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-4">Upcoming Classes</h3>
            <p className="text-gray-600">No upcoming classes at this time.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MemberDashboard;
