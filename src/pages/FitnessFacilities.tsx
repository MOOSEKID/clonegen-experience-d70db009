
import { useEffect } from 'react';
import { Dumbbell, BarChart, HeartPulse, ShieldCheck } from 'lucide-react';

const FitnessFacilities = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const facilities = [
    {
      icon: <Dumbbell className="text-gym-orange" size={48} />,
      title: 'State-of-the-Art Equipment',
      description: 'Our gym features the latest premium fitness equipment from top brands, catering to all fitness levels and goals.'
    },
    {
      icon: <BarChart className="text-gym-orange" size={48} />,
      title: 'Performance Tracking',
      description: 'Advanced tracking systems integrated throughout our facilities to help you monitor your progress and optimize your workouts.'
    },
    {
      icon: <HeartPulse className="text-gym-orange" size={48} />,
      title: 'Cardio Zone',
      description: 'Dedicated space with treadmills, ellipticals, rowing machines and stationary bikes for effective cardiovascular training.'
    },
    {
      icon: <ShieldCheck className="text-gym-orange" size={48} />,
      title: 'Safety First',
      description: 'All our facilities undergo regular maintenance and cleaning to ensure a safe and hygienic environment for all members.'
    }
  ];

  return (
    <main className="pt-24 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <h1 className="text-4xl font-bold mb-8 text-gym-dark">Fitness Facilities</h1>
        
        <div className="mb-12">
          <img 
            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2975&auto=format&fit=crop" 
            alt="Our premium fitness facility" 
            className="w-full h-[450px] object-cover rounded-lg shadow-md mb-8"
          />
          <p className="text-lg text-gray-700 mb-6">
            At Uptown Gym, we take pride in offering top-tier fitness facilities designed to inspire and empower your fitness journey. 
            Our spacious and well-equipped gym floor provides the perfect environment for workouts of all types, from strength training 
            to cardio exercises and everything in between.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {facilities.map((facility, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all durationMinutes-300 hover:shadow-lg p-6"
            >
              <div className="mb-4">{facility.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gym-dark">{facility.title}</h3>
              <p className="text-gray-600">{facility.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gym-dark">Facility Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gym-orange">Weekdays</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="font-medium">Monday - Friday</span>
                  <span>5:00 AM - 11:00 PM</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gym-orange">Weekends</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="font-medium">Saturday</span>
                  <span>6:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">Sunday</span>
                  <span>7:00 AM - 9:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FitnessFacilities;
