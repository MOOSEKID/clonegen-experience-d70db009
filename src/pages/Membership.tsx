
import { useEffect } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/Button';

const Membership = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const plans = [
    {
      name: 'Basic',
      price: '49',
      period: 'month',
      description: 'Perfect for beginners',
      features: [
        'Access to main gym area',
        'Standard equipment usage',
        '2 group classes per week',
        'Locker access',
        'Online booking system'
      ],
      buttonText: 'Get Started',
      highlighted: false
    },
    {
      name: 'Premium',
      price: '89',
      period: 'month',
      description: 'Most popular choice',
      features: [
        'Full gym access 24/7',
        'All equipment access',
        'Unlimited group classes',
        'Personal trainer (2 sessions/month)',
        'Spa access (once per week)',
        'Nutritional consultation'
      ],
      buttonText: 'Get Started',
      highlighted: true
    },
    {
      name: 'Ultimate',
      price: '149',
      period: 'month',
      description: 'For serious athletes',
      features: [
        'VIP 24/7 access to all facilities',
        'Premium equipment priority',
        'Unlimited classes with priority booking',
        'Personal trainer (8 sessions/month)',
        'Unlimited spa & sauna access',
        'Full nutrition program',
        'Exclusive members events'
      ],
      buttonText: 'Get Started',
      highlighted: false
    }
  ];

  return (
    <main className="pt-24 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <h1 className="text-4xl font-bold mb-2 text-gym-dark">Membership Plans</h1>
        <p className="text-lg text-gray-600 mb-12">Choose the perfect plan for your fitness journey</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
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
                  <span className="text-4xl font-bold text-gym-dark">${plan.price}</span>
                  <span className="text-gray-500 ml-1">/ {plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
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
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Membership;
