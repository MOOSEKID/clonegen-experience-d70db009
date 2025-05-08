import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/Button';
import { useSubscriptionPlans } from '@/hooks/useSubscriptionPlans';

const Membership = () => {
  const { plans, loading } = useSubscriptionPlans();
  const [activePlans, setActivePlans] = useState<any[]>([]);

  // Filter active plans and format them for display
  useEffect(() => {
    if (!loading) {
      const filtered = plans
        .filter(plan => plan.status === 'Active')
        .map(plan => ({
          name: plan.name,
          price: plan.price.startsWith('$') ? plan.price.substring(1) : plan.price,
          period: plan.billingCycle.toLowerCase(),
          description: `${plan.billingCycle} plan`,
          features: plan.features,
          buttonText: 'Get Started',
          highlighted: plan.planId === 'premium-monthly' // Mark premium as highlighted
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
      title: 'Specialized Programs',
      icon: '🏆',
      services: [
        'Weight management programs',
        'Senior fitness classes',
        'Prenatal and postnatal training',
        'Rehabilitation services',
        'Sports-specific conditioning',
        'Nutrition and diet planning'
      ]
    }
  ];

  // Display loading placeholder if plans are loading
  if (loading) {
    return (
      <main className="pt-24 min-h-screen bg-gray-50">
        <div className="container-custom py-16">
          <h1 className="text-4xl font-bold mb-2 text-gym-dark">Membership Plans</h1>
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gym-orange"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <h1 className="text-4xl font-bold mb-2 text-gym-dark">Membership Plans</h1>
        <p className="text-lg text-gray-600 mb-12">Choose the perfect plan for your fitness journey</p>
        
        {activePlans.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-lg shadow-md">
            <p className="text-lg text-gray-500">No active membership plans available right now.</p>
            <p className="text-gray-500">Please check back soon or contact us for custom options.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activePlans.map((plan, index) => (
              <div 
                key={index}
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
                    <span className="text-4xl font-bold text-gym-dark">{plan.price.startsWith('RWF') ? plan.price : `RWF ${plan.price}`}</span>
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
            ))}
          </div>
        )}
        
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-gym-dark">Our Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{category.icon}</span>
                  <h3 className="text-2xl font-bold text-gym-dark">{category.title}</h3>
                </div>
                <ul className="space-y-2">
                  {category.services.map((service, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="text-gym-orange mr-2 flex-shrink-0 mt-1" size={18} />
                      <span className="text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gym-dark">Membership Benefits</h2>
          <p className="text-gray-700 mb-4">
            All members, regardless of plan, enjoy these additional benefits:
          </p>
          <ul className="space-y-2 list-disc pl-6">
            <li className="text-gray-700">Free parking</li>
            <li className="text-gray-700">Free wifi throughout the facility</li>
            <li className="text-gray-700">Access to member-only events</li>
            <li className="text-gray-700">Mobile app for tracking workouts</li>
            <li className="text-gray-700">Discounts on merchandise and supplements</li>
            <li className="text-gray-700">Towel service</li>
            <li className="text-gray-700">Fitness assessment every 3 months</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Membership;
