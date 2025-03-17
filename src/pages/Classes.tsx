
import { useEffect } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/Button';
import { FitnessClasses } from '@/components/FitnessClasses';

const Classes = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-24 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <h1 className="text-4xl font-bold mb-2 text-gym-dark">Our Classes</h1>
        <p className="text-lg text-gray-600 mb-12">Join our diverse range of fitness classes led by expert trainers</p>
        
        <FitnessClasses />
        
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gym-dark">Class Booking Information</h2>
          <p className="text-gray-700 mb-4">
            Important information about our class booking system:
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-start">
              <Check className="text-gym-orange mr-2 flex-shrink-0 mt-1" size={18} />
              <span className="text-gray-700">Book classes up to 7 days in advance</span>
            </li>
            <li className="flex items-start">
              <Check className="text-gym-orange mr-2 flex-shrink-0 mt-1" size={18} />
              <span className="text-gray-700">Cancel at least a 3 hours before class start time</span>
            </li>
            <li className="flex items-start">
              <Check className="text-gym-orange mr-2 flex-shrink-0 mt-1" size={18} />
              <span className="text-gray-700">Premium and Ultimate members get priority booking</span>
            </li>
            <li className="flex items-start">
              <Check className="text-gym-orange mr-2 flex-shrink-0 mt-1" size={18} />
              <span className="text-gray-700">Sign up for waitlist if class is full</span>
            </li>
          </ul>
          
          <Button className="mt-4">
            View Full Class Timetable
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Classes;
