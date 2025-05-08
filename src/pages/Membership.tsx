
import { useEffect, useState } from 'react';
import { useSubscriptionPlans } from '@/hooks/useSubscriptionPlans';
import MembershipHeader from '@/components/membership/MembershipHeader';
import MembershipPlansGrid from '@/components/membership/MembershipPlansGrid';
import ServiceCategoriesGrid from '@/components/membership/ServiceCategoriesGrid';
import MembershipBenefits from '@/components/membership/MembershipBenefits';

const Membership = () => {
  const { plans, loading } = useSubscriptionPlans();
  const [activePlans, setActivePlans] = useState<any[]>([]);

  // Filter active and visible plans and format them for display
  useEffect(() => {
    if (!loading) {
      const filtered = plans
        .filter(plan => plan.status === 'Active' && plan.is_visible_on_membership_page)
        .map(plan => ({
          name: plan.name,
          price: plan.price === 'Custom' ? 'Custom' : plan.price, // Keep "Custom" text as is
          period: plan.billingCycle.toLowerCase(),
          description: `${plan.billingCycle} plan`,
          features: [
            ...(plan.features || []),
            ...(plan.planId === 'premium-monthly' || plan.planId === 'family-annual' ? 
              ['AI-powered workout generation', 'Advanced exercise techniques', 'Premium progress tracking'] : [])
          ],
          buttonText: 'Get Started',
          highlighted: plan.planId === 'premium-monthly', // Mark premium as highlighted
          planId: plan.planId || plan.id // Important: Include planId for checkout flow
        }));
      
      setActivePlans(filtered);
    }
  }, [plans, loading]);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const serviceCategories = [
    {
      title: 'Fitness',
      icon: '💪',
      services: [
        'State-of-the-art cardio equipment',
        'Free weights and resistance machines',
        'Functional training zones',
        'Group HIIT sessions',
        'CrossFit area',
        'Powerlifting platforms'
      ]
    },
    {
      title: 'Spa & Wellness',
      icon: '🧖',
      services: [
        'Hot stone massage therapy',
        'Swedish and deep tissue massage',
        'Hydro-therapy sessions',
        'Facial treatments',
        'Steam rooms and saunas',
        'Relaxation lounge'
      ]
    },
    {
      title: 'Swimming',
      icon: '🏊',
      services: [
        'Olympic-sized swimming pool',
        'Heated indoor pool',
        'Swimming lessons for all ages',
        'Aqua aerobics classes',
        'Hydrotherapy pool',
        'Lifeguard supervision'
      ]
    },
    {
      title: 'Premium Features',
      icon: '🏆',
      services: [
        'AI-powered workout generation',
        'Advanced exercise techniques library',
        'Detailed progress tracking and analytics',
        'Nutrition planning assistance',
        'Personal fitness dashboard',
        'Priority class booking'
      ]
    }
  ];

  const membershipBenefits = [
    'Free parking',
    'Free wifi throughout the facility',
    'Access to member-only events',
    'Mobile app for tracking workouts',
    'AI-powered fitness assistant (Premium)',
    'Discounts on merchandise and supplements',
    'Towel service',
    'Fitness assessment every 3 months'
  ];

  // Display loading state or content
  return (
    <main className="pt-24 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <MembershipHeader 
          title="Membership Plans" 
          subtitle="Choose the perfect plan for your fitness journey"
        />
        
        <MembershipPlansGrid plans={activePlans} loading={loading} />
        
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-gym-dark">Our Services</h2>
          <ServiceCategoriesGrid categories={serviceCategories} />
        </div>
        
        <div className="mt-16">
          <MembershipBenefits benefits={membershipBenefits} />
        </div>
      </div>
    </main>
  );
};

export default Membership;
