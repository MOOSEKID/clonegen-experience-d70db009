
import { useState } from 'react';
import { Dumbbell, MapPin, Ruler, Users, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const facilities = [
  {
    id: 1,
    name: 'Main Gym Floor',
    description: 'Our spacious main gym floor features state-of-the-art cardio and strength training equipment.',
    image: '/lovable-uploads/gym-floor.jpg',
    size: '10,000 sq ft',
    capacity: '100 members',
    equipmentCount: '75+ machines',
    hours: 'Open 24/7',
  },
  {
    id: 2,
    name: 'Group Fitness Studio',
    description: 'Dedicated space for our wide range of group fitness classes including yoga, HIIT, and spin.',
    image: '/lovable-uploads/fitness-studio.jpg',
    size: '2,500 sq ft',
    capacity: '30 members',
    equipmentCount: 'Fully equipped',
    hours: 'Class schedule varies',
  },
  {
    id: 3,
    name: 'Olympic Swimming Pool',
    description: 'A 25-meter, 6-lane swimming pool perfect for lap swimming, aqua aerobics, and swimming lessons.',
    image: '/lovable-uploads/swimming-pool.jpg',
    size: '4,000 sq ft',
    capacity: '50 swimmers',
    equipmentCount: 'Swim equipment available',
    hours: '6am - 10pm daily',
  },
  {
    id: 4,
    name: 'Functional Training Area',
    description: 'Dedicated zone for functional fitness with rigs, free weights, and open floor space.',
    image: '/lovable-uploads/functional-area.jpg',
    size: '3,000 sq ft',
    capacity: '25 members',
    equipmentCount: 'Complete functional kit',
    hours: 'Open 24/7',
  }
];

const FacilityCard = ({ facility }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <img 
        src={facility.image || "https://placehold.co/600x400/e2e8f0/475569?text=Facility+Image"} 
        alt={facility.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{facility.name}</h3>
        <p className="text-gray-600 mb-4">{facility.description}</p>
        
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gym-orange p-0 mb-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "Show details"}
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
        
        {isExpanded && (
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Ruler className="text-gym-orange" size={18} />
              <div>
                <p className="text-sm font-medium">Size</p>
                <p className="text-sm text-gray-600">{facility.size}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="text-gym-orange" size={18} />
              <div>
                <p className="text-sm font-medium">Capacity</p>
                <p className="text-sm text-gray-600">{facility.capacity}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Dumbbell className="text-gym-orange" size={18} />
              <div>
                <p className="text-sm font-medium">Equipment</p>
                <p className="text-sm text-gray-600">{facility.equipmentCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-gym-orange" size={18} />
              <div>
                <p className="text-sm font-medium">Hours</p>
                <p className="text-sm text-gray-600">{facility.hours}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FitnessFacilities = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container-custom py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-6">State-of-the-Art Fitness Facilities</h1>
        <p className="text-lg text-gray-600">
          Our premium gym facilities are designed to provide the ultimate workout experience.
          With cutting-edge equipment and spacious training areas, we've created the perfect
          environment for achieving your fitness goals.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {facilities.map(facility => (
          <FacilityCard key={facility.id} facility={facility} />
        ))}
      </div>
      
      <div className="bg-gym-dark/5 rounded-xl p-8 mb-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">Find Us</h2>
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="text-gym-orange mt-1" />
              <div>
                <p className="font-medium">Uptown Gym Main Location</p>
                <p className="text-gray-600">123 Fitness Street, Kigali, Rwanda</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Conveniently located in the heart of Kigali with ample parking and easy access to public transportation.
            </p>
            <Button 
              className="bg-gym-orange hover:bg-gym-orange/90"
              onClick={() => navigate('/contact-us')}
            >
              Contact Us
            </Button>
          </div>
          <div className="flex-1 rounded-lg overflow-hidden h-64">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63799.41051218705!2d30.02994235!3d-1.9440867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca5a86e46385b%3A0x2b7c959fd79d2a07!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2sus!4v1652371188978!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Gym Location"
            ></iframe>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Experience Our Facilities?</h2>
        <p className="mb-6 text-gray-600">
          Join Uptown Gym today and get access to all our premium facilities.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            className="bg-gym-orange hover:bg-gym-orange/90"
            onClick={() => navigate('/membership')}
          >
            View Membership Options
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/classes')}
          >
            Browse Classes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FitnessFacilities;
