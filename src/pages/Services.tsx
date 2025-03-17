
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Services = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);
  
  const serviceCategories = [
    {
      title: 'Fitness Facilities',
      description: 'State-of-the-art equipment and spaces designed for every fitness level and goal.',
      image: '/lovable-uploads/ec104137-606c-4a99-a2c7-ed0a38667c39.png',
      link: '/facilities'
    },
    {
      title: 'Youth Programs',
      description: 'Fun, engaging fitness activities designed specifically for children and teenagers.',
      image: '/lovable-uploads/01fa474e-e83a-48f4-9ffc-2047ca448aa7.png',
      link: '/youth-programs'
    },
    {
      title: 'Spa & Wellness',
      description: 'Relaxation and recovery services to rejuvenate your body and mind.',
      image: '/lovable-uploads/7dcb1541-09e5-4dc0-afbf-e868d229ff1c.png',
      link: '/spa-wellness'
    }
  ];

  return (
    <main className="pt-24 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <h1 className="text-4xl font-bold mb-2 text-gym-dark">Our Services</h1>
        <p className="text-lg text-gray-600 mb-12">Comprehensive fitness and wellness solutions for everyone</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {serviceCategories.map((category, index) => (
            <Link 
              key={index} 
              to={category.link}
              className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gym-dark">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="flex items-center text-gym-orange font-medium">
                  <span>Learn more</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4 text-gym-dark">Personal Training</h2>
          <p className="text-gray-700 mb-6">
            Work one-on-one with our certified personal trainers to achieve your specific fitness goals. Whether you're looking to lose weight, build muscle, improve athletic performance, or enhance overall health, our trainers will create a customized program tailored to your needs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gym-dark mb-2">Benefits include:</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Personalized workout plans</li>
                <li>Nutritional guidance</li>
                <li>Progress tracking</li>
                <li>Form correction and injury prevention</li>
                <li>Accountability and motivation</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gym-dark mb-2">Pricing options:</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Single session: RWF 35,000</li>
                <li>Pack of 5 sessions: RWF 150,000</li>
                <li>Pack of 10 sessions: RWF 250,000</li>
                <li>Monthly package (12 sessions): RWF 300,000</li>
              </ul>
            </div>
          </div>
          
          <p className="text-center mt-6">
            <Link to="/contact-us" className="inline-block bg-gym-orange text-white px-6 py-2 rounded-md font-medium hover:bg-gym-orange/90 transition-colors">
              Book a Consultation
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Services;
