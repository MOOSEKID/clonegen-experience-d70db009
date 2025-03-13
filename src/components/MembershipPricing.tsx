
import { useRef, useEffect } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from './Button';

const pricingPlans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29.99,
    period: 'month',
    description: 'Perfect for beginners',
    features: [
      'Access to main gym area',
      'Standard equipment use',
      'Locker access',
      '2 guest passes monthly',
      'Online workout guides'
    ],
    recommended: false,
    ctaText: 'Get Started'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 59.99,
    period: 'month',
    description: 'Most popular choice',
    features: [
      'Access to all gym areas',
      'All equipment access',
      'Unlimited group classes',
      '4 guest passes monthly',
      'Personalized workout plan',
      'Nutrition consultation',
      'Weekly progress tracking'
    ],
    recommended: true,
    ctaText: 'Choose Premium'
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 99.99,
    period: 'month',
    description: 'For serious fitness enthusiasts',
    features: [
      'All Premium features',
      '2 personal training sessions/month',
      'Priority class booking',
      'Spa & recovery area access',
      'Monthly body composition analysis',
      'Customized nutrition plan',
      'Access to premium app features',
      'Exclusive events & workshops'
    ],
    recommended: false,
    ctaText: 'Go Elite'
  }
];

const MembershipPricing = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
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
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-600 mb-1">/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
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
      </div>
    </section>
  );
};

export default MembershipPricing;
