
import { useEffect } from 'react';
import { Dumbbell, Users, Ruler, Check } from 'lucide-react';

const FitnessFacilities = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const facilities = [
    {
      icon: <Dumbbell className="text-gym-orange" size={48} />,
      title: 'State-of-the-Art Equipment',
      description: 'Our facilities feature the latest fitness equipment from industry-leading brands, designed for all fitness levels.'
    },
    {
      icon: <Users className="text-gym-orange" size={48} />,
      title: 'Spacious Workout Areas',
      description: 'Enjoy ample space in our workout zones, ensuring comfort and safety during your fitness routine.'
    },
    {
      icon: <Ruler className="text-gym-orange" size={48} />,
      title: 'Functional Training Zones',
      description: 'Dedicated areas for functional training with equipment like battle ropes, sleds, and kettlebells.'
    },
    {
      icon: <Check className="text-gym-orange" size={48} />,
      title: 'Recovery Spaces',
      description: 'Dedicated recovery spaces with foam rollers, stretching areas, and recovery tools to help your body recuperate.'
    }
  ];

  return (
    <main className="pt-24 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <h1 className="text-4xl font-bold mb-8 text-gym-dark">Fitness Facilities</h1>
        
        <div className="mb-12">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
            alt="Gym facilities" 
            className="w-full h-[450px] object-cover rounded-lg shadow-md mb-8"
          />
          <p className="text-lg text-gray-700 mb-6">
            At Uptown Gym, we pride ourselves on providing world-class fitness facilities 
            designed to maximize your workout experience. Our gym features premium equipment, 
            specialized training zones, and comfortable amenities to support your fitness journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {facilities.map((facility, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg p-6"
            >
              <div className="mb-4">{facility.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gym-dark">{facility.title}</h3>
              <p className="text-gray-600">{facility.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gym-dark">Additional Amenities</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              <span className="font-semibold">Locker Rooms:</span> Modern locker rooms with secure storage, showers, and grooming stations.
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Hydration Stations:</span> Filtered water dispensers located throughout the facility.
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Fitness Assessment Room:</span> Private space for consultations and fitness assessments with our trainers.
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Nutrition Corner:</span> Information and resources on nutrition to complement your fitness regimen.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FitnessFacilities;
