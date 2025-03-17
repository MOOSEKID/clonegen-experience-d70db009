import { Leaf, Heart, Flame, CupSoda, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    id: 1,
    name: "Swedish Massage",
    duration: "60 / 90 minutes",
    price: "RWF 30,000 / RWF 45,000",
    description: "A classic relaxation massage that uses long, flowing strokes to reduce tension, improve circulation, and promote overall wellbeing.",
    image: "/lovable-uploads/swedish-massage.jpg",
    benefits: [
      "Reduces muscle tension and pain",
      "Improves circulation and flexibility",
      "Promotes relaxation and stress relief",
      "Helps with headache and insomnia"
    ]
  },
  {
    id: 2,
    name: "Deep Tissue Massage",
    duration: "60 / 90 minutes",
    price: "RWF 35,000 / RWF 50,000",
    description: "Targets deeper muscle layers and connective tissue with firmer pressure, ideal for addressing chronic tension and sports-related issues.",
    image: "/lovable-uploads/deep-tissue.jpg",
    benefits: [
      "Alleviates chronic muscle pain",
      "Breaks down adhesions and knots",
      "Improves posture and range of motion",
      "Aids in recovery from injuries"
    ]
  },
  {
    id: 3,
    name: "Sports Recovery",
    duration: "60 / 90 minutes",
    price: "RWF 35,000 / RWF 50,000",
    description: "Specifically designed for athletes, this massage focuses on areas of the body that are overused and stressed from repetitive movements.",
    image: "/lovable-uploads/sports-recovery.jpg",
    benefits: [
      "Reduces recovery time after intense workouts",
      "Prevents injury by improving flexibility",
      "Enhances athletic performance",
      "Helps maintain peak physical condition"
    ]
  },
  {
    id: 4,
    name: "Sauna & Steam Room",
    duration: "Unlimited access with membership",
    price: "Included with Premium Membership",
    description: "Our state-of-the-art sauna and steam room facilities provide the perfect way to relax after your workout and enhance your recovery.",
    image: "/lovable-uploads/sauna.jpg",
    benefits: [
      "Detoxifies the body through sweating",
      "Relaxes muscles and reduces soreness",
      "Improves circulation and heart health",
      "Relieves stress and promotes relaxation"
    ]
  },
  {
    id: 5,
    name: "Nutrition Consultation",
    duration: "45 minutes",
    price: "RWF 25,000",
    description: "Meet with our certified nutritionists to create a personalized nutrition plan that complements your fitness goals and lifestyle.",
    image: "/lovable-uploads/nutrition.jpg",
    benefits: [
      "Personalized nutrition recommendations",
      "Meal planning assistance",
      "Supplement advice if needed",
      "Ongoing support and adjustments"
    ]
  },
  {
    id: 6,
    name: "Recovery Smoothie Bar",
    duration: "N/A",
    price: "RWF 5,000 - RWF 8,000",
    description: "Our smoothie bar offers a range of nutrient-rich options designed to replenish and support your body after workouts.",
    image: "/lovable-uploads/smoothie-bar.jpg",
    benefits: [
      "Protein-rich options for muscle recovery",
      "Antioxidant smoothies for immune support",
      "Hydration boosters with electrolytes",
      "All natural ingredients, no artificial additives"
    ]
  }
];

const ServiceCard = ({ service }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <img 
        src={service.image || "https://placehold.co/600x400/e2e8f0/475569?text=Service+Image"} 
        alt={service.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{service.name}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm font-medium">Duration</p>
            <p className="text-sm text-gray-600">{service.duration}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Price</p>
            <p className="text-sm text-gym-orange font-semibold">{service.price}</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gym-orange p-0 mb-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "Show benefits"}
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
        
        {isExpanded && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Benefits:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="text-gray-600">{benefit}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const SpaWellness = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container-custom py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-6">Spa & Wellness Services</h1>
        <p className="text-lg text-gray-600">
          At Uptown Gym, we believe fitness is just one component of overall wellness.
          Our spa and recovery services are designed to complement your fitness routine,
          enhance recovery, and promote holistic well-being.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      
      <div className="bg-gym-dark/5 rounded-xl p-8 mb-16">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">The Importance of Recovery</h2>
            <p className="text-gray-600 mb-4">
              Recovery is as crucial as exercise itself in achieving your fitness goals. 
              Our wellness services are specifically designed to enhance your recovery 
              process and improve your overall performance.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Flame className="text-gym-orange min-w-[20px] mt-1" size={20} />
                <div>
                  <p className="font-medium">Faster Muscle Recovery</p>
                  <p className="text-sm text-gray-600">Massage therapy and heat treatments help reduce recovery time between workouts.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Heart className="text-gym-orange min-w-[20px] mt-1" size={20} />
                <div>
                  <p className="font-medium">Stress Reduction</p>
                  <p className="text-sm text-gray-600">Our wellness services help lower cortisol levels, promoting better overall health.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Leaf className="text-gym-orange min-w-[20px] mt-1" size={20} />
                <div>
                  <p className="font-medium">Improved Flexibility</p>
                  <p className="text-sm text-gray-600">Regular massage increases range of motion and helps prevent injuries.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CupSoda className="text-gym-orange min-w-[20px] mt-1" size={20} />
                <div>
                  <p className="font-medium">Optimal Nutrition</p>
                  <p className="text-sm text-gray-600">Our nutrition services ensure your body gets the fuel it needs to perform and recover.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <img 
              src="/lovable-uploads/wellness-recovery.jpg" 
              alt="Wellness and recovery" 
              className="rounded-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Enhance Your Wellness Journey?</h2>
        <p className="mb-6 text-gray-600">
          Add our spa and wellness services to your fitness routine and experience the benefits of complete mind and body care.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            className="bg-gym-orange hover:bg-gym-orange/90"
            onClick={() => navigate('/membership')}
          >
            View Premium Memberships
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/contact-us')}
          >
            Book a Service
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpaWellness;
