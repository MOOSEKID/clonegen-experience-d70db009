
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './Button';

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.slide-up');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('show');
              }, 150 * index);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Content - Image */}
        <div className="relative order-2 md:order-1">
          <div className="relative overflow-hidden rounded-lg shadow-xl h-full">
            <img
              src="/lovable-uploads/ec104137-606c-4a99-a2c7-ed0a38667c39.png"
              alt="Fitness training"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Content - Text */}
        <div className="order-1 md:order-2 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl slide-up uppercase tracking-wider font-bold text-gym-dark mb-2">
            WHY CHOOSE US!
          </h2>
          <div className="w-32 h-1 bg-gym-orange mb-6 slide-up" style={{ transitionDelay: '0.1s' }}></div>
          
          <p className="text-gray-700 mb-8 slide-up" style={{ transitionDelay: '0.2s' }}>
            At Uptown Gym, we offer state-of-the art fitness equipment, a serene
            swimming pool, rejuvenating spa services, and empowering youth
            programs.
          </p>

          <h3 className="text-2xl font-bold text-gym-dark mb-6 slide-up" style={{ transitionDelay: '0.3s' }}>
            Featured Services
          </h3>

          <div className="space-y-6">
            <div className="flex items-start slide-up feature-item group" style={{ transitionDelay: '0.4s' }}>
              <ArrowRight className="feature-arrow mt-1 mr-3 flex-shrink-0" size={18} />
              <p className="text-gray-700">
                State-of-the-art gym equipment and swimming pool designed for all skill levels
              </p>
            </div>
            
            <div className="flex items-start slide-up feature-item group" style={{ transitionDelay: '0.5s' }}>
              <ArrowRight className="feature-arrow mt-1 mr-3 flex-shrink-0" size={18} />
              <p className="text-gray-700">
                Spa and sauna services to rejuvenate your body and mind
              </p>
            </div>
            
            <div className="flex items-start slide-up feature-item group" style={{ transitionDelay: '0.6s' }}>
              <ArrowRight className="feature-arrow mt-1 mr-3 flex-shrink-0" size={18} />
              <p className="text-gray-700">
                Youth empowerment programs to nurture the leaders of tomorrow
              </p>
            </div>
          </div>

          <Button 
            className="mt-8 w-48 slide-up group" 
            size="md" 
            isLink 
            href="/services"
            style={{ transitionDelay: '0.7s' }}
          >
            <span>VIEW MORE</span>
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Features;
