
import { useEffect } from 'react';
import { Dumbbell, HeartPulse, Trophy, Users } from 'lucide-react';

const Services = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      icon: <Dumbbell className="text-gym-orange" size={48} />,
      title: 'Modern Equipment',
      description: 'Access to state-of-the-art fitness equipment designed for all skill levels and fitness goals.'
    },
    {
      icon: <HeartPulse className="text-gym-orange" size={48} />,
      title: 'Spa & Wellness',
      description: 'Rejuvenate your body and mind with our comprehensive spa and sauna services.'
    },
    {
      icon: <Trophy className="text-gym-orange" size={48} />,
      title: 'Expert Trainers',
      description: 'Work with our certified personal trainers to achieve your fitness goals faster and safer.'
    },
    {
      icon: <Users className="text-gym-orange" size={48} />,
      title: 'Youth Programs',
      description: 'Special programs designed for young athletes to develop skills and stay active.'
    }
  ];

  return (
    <main className="pt-24 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <h1 className="text-4xl font-bold mb-8 text-gym-dark">Our Services</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gym-dark">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gym-dark">Additional Services</h2>
          <ul className="space-y-4 list-disc pl-6">
            <li className="text-gray-700">Group fitness classes including yoga, spinning, HIIT, and more</li>
            <li className="text-gray-700">Nutrition counseling and personalized diet plans</li>
            <li className="text-gray-700">Swimming lessons for all ages and skill levels</li>
            <li className="text-gray-700">Corporate wellness programs and team-building activities</li>
            <li className="text-gray-700">Rehabilitation and recovery services</li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Services;
