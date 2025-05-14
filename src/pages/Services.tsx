
import { useEffect } from 'react';
import { Dumbbell, HeartPulse, Trophy, Waves, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      icon: <Dumbbell className="text-gym-orange" size={48} />,
      title: 'Fitness Facilities',
      description: 'State-of-the-art equipment and training areas designed for all fitness levels and goals.',
      link: '/services/fitness-facilities'
    },
    {
      icon: <HeartPulse className="text-gym-orange" size={48} />,
      title: 'Spa & Wellness',
      description: 'Rejuvenate your body and mind with our comprehensive spa and wellness services.',
      link: '/services/spa-wellness'
    },
    {
      icon: <Waves className="text-gym-orange" size={48} />,
      title: 'Swimming',
      description: 'Olympic-sized pools, swimming lessons, and aqua fitness classes for all ages.',
      link: '/services/spa-wellness#swimming'
    },
    {
      icon: <Users className="text-gym-orange" size={48} />,
      title: 'Youth Programs',
      description: 'Special programs designed for young athletes to develop skills and stay active.',
      link: '/services/youth-programs'
    }
  ];

  const additionalServices = [
    {
      title: 'Fitness',
      services: [
        'Group fitness classes including yoga, spinning, HIIT, and more',
        'Personal training sessions with certified trainers',
        'CrossFit and functional training zones',
        'Strength and conditioning programs'
      ]
    },
    {
      title: 'Wellness',
      services: [
        'Nutrition counseling and personalized diet plans',
        'Health screening and fitness assessments',
        'Meditation and mindfulness sessions',
        'Stress management workshops'
      ]
    },
    {
      title: 'Specialized Programs',
      services: [
        'Corporate wellness programs and team-building activities',
        'Rehabilitation and recovery services',
        'Sports-specific training for athletes',
        'Weight management programs'
      ]
    }
  ];

  return (
    <main className="pt-24 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <h1 className="text-4xl font-bold mb-8 text-gym-dark">Our Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Link 
              key={index}
              to={service.link}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all durationMinutes-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gym-dark">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-16">
          {additionalServices.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gym-dark">{category.title}</h2>
              <ul className="space-y-4 list-disc pl-6">
                {category.services.map((service, i) => (
                  <li key={i} className="text-gray-700">{service}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Services;
