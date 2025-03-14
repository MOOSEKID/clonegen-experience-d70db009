
import { useEffect } from 'react';
import { Leaf, Droplets, Sparkles, Wind } from 'lucide-react';

const SpaWellness = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      icon: <Droplets className="text-gym-orange" size={48} />,
      title: 'Hydro Therapy',
      description: 'Experience the healing power of water with our hydrotherapy treatments designed to reduce muscle tension and promote relaxation.',
      duration: '45-60 mins'
    },
    {
      icon: <Leaf className="text-gym-orange" size={48} />,
      title: 'Massage Therapy',
      description: 'Our skilled massage therapists offer a variety of techniques to relieve tension, improve circulation, and enhance overall well-being.',
      duration: '30-90 mins'
    },
    {
      icon: <Sparkles className="text-gym-orange" size={48} />,
      title: 'Sauna & Steam Rooms',
      description: 'Detoxify your body and relax your muscles in our premium sauna and steam rooms, designed for optimal comfort and health benefits.',
      duration: 'Unlimited with membership'
    },
    {
      icon: <Wind className="text-gym-orange" size={48} />,
      title: 'Meditation & Mindfulness',
      description: 'Guided sessions to help reduce stress, increase mental clarity, and improve your overall mental well-being through mindfulness practices.',
      duration: '30-45 mins'
    }
  ];

  return (
    <main className="pt-24 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <h1 className="text-4xl font-bold mb-8 text-gym-dark">Spa & Wellness</h1>
        
        <div className="mb-12">
          <img 
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2940&auto=format&fit=crop" 
            alt="Spa and wellness facilities" 
            className="w-full h-[450px] object-cover rounded-lg shadow-md mb-8"
          />
          <p className="text-lg text-gray-700 mb-6">
            At Uptown Gym, we believe that wellness extends beyond physical fitness. Our spa and wellness center 
            offers a sanctuary where you can relax, rejuvenate, and restore balance to your body and mind. 
            Combining traditional techniques with modern approaches, our wellness services complement your 
            fitness routine and enhance your overall health journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg p-6"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gym-dark">{service.title}</h3>
              <div className="mb-3 inline-block bg-gym-orange/10 text-gym-orange px-3 py-1 rounded-full text-sm font-medium">
                {service.duration}
              </div>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gym-dark">Wellness Programs</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gym-orange">Stress Management Workshops</h3>
              <p className="text-gray-700">
                Learn effective techniques to manage stress in your daily life through a combination of breathing exercises, 
                meditation, and lifestyle adjustments. Sessions held weekly.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gym-orange">Nutrition Counseling</h3>
              <p className="text-gray-700">
                Our certified nutritionists provide personalized guidance to help you develop sustainable eating habits 
                that support your wellness and fitness goals.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gym-orange">Recovery Therapy</h3>
              <p className="text-gray-700">
                Specialized services designed to accelerate muscle recovery and prevent injuries, including assisted 
                stretching, compression therapy, and targeted massage techniques.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SpaWellness;
