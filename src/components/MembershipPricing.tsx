
import { useRef, useEffect, useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { useSubscriptionPlans } from '@/hooks/useSubscriptionPlans';

const MembershipPricing = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { plans, loading } = useSubscriptionPlans();
  const [activePlans, setActivePlans] = useState<any[]>([]);
  
  // Filter active and visible plans and transform them to match the component's expected format
  useEffect(() => {
    if (!loading) {
      const filtered = plans
        .filter(plan => plan.status === 'Active' && plan.is_visible_on_membership_page)
        .map(plan => ({
          id: plan.planId || plan.id,
          name: plan.name,
          price: plan.price === 'Custom' ? 'Custom' : plan.price.split(' ')[1], // Extract price value without currency
          currency: plan.currency || 'RWF',
          period: plan.billingCycle.toLowerCase(),
          description: `${plan.billingCycle} plan`,
          features: plan.features,
          recommended: plan.planId === 'premium-monthly', // Mark premium as recommended
          ctaText: 'Get Started'
        }));
      
      setActivePlans(filtered);
    }
  }, [plans, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Display loading placeholder if data is loading
  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Membership Plans</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gym-orange"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-white opacity-0 transition-opacity duration-1000"
      id="pricing-section"
    >
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Membership Plans</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan to achieve your fitness goals. 
            Join today and start your transformation journey.
          </p>
        </div>

        {activePlans.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-500">No active membership plans available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activePlans.map((plan) => (
              <div 
                key={plan.id}
                className={`rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full ${
                  plan.recommended 
                    ? 'border-2 border-gym-orange shadow-lg relative transform hover:-translate-y-1' 
                    : 'border border-gray-200 hover:-translate-y-1'
                }`}
              >
                {plan.recommended && (
                  <div className="bg-gym-orange text-white text-center py-2 font-medium">
                    Recommended
                  </div>
                )}
                <div className="p-6 bg-gym-light flex-grow">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-end mb-6">
                    {plan.price === 'Custom' ? (
                      <span className="text-4xl font-bold">Custom</span>
                    ) : (
                      <>
                        <span className="text-sm mr-1 mt-2">{plan.currency}</span>
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-gray-600 mb-1">/{plan.period}</span>
                      </>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <Check size={18} className="text-gym-orange flex-shrink-0 mt-0.5 mr-2" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 bg-white">
                  <Button 
                    className={`w-full group ${plan.recommended ? '' : 'variant-outline'}`} 
                    variant={plan.recommended ? 'primary' : 'outline'}
                    size="lg"
                    isLink
                    href="/membership"
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MembershipPricing;
