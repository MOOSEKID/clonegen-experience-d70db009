
import { useEffect, useRef } from 'react';
import { Button } from './Button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroElement = heroRef.current;
    const textElement = textRef.current;

    if (heroElement && textElement) {
      heroElement.classList.add('animate-fade-in');
      
      const timer = setTimeout(() => {
        textElement.classList.add('animate-slide-in');
      }, 300);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/lovable-uploads/df38f2f2-29af-42aa-8f29-0d0de27cd833.png)' }}
      >
        <div className="hero-overlay"></div>
      </div>
      
      {/* Content Container */}
      <div ref={textRef} className="relative h-full flex items-center">
        <div className="container-custom h-full flex flex-col justify-center">
          <div className="relative pl-8 max-w-3xl opacity-0 transition-all duration-700" style={{ transitionDelay: '0.3s' }}>
            <div className="vertical-orange-line"></div>
            <p className="text-white text-xl mb-4">Different From Others!</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-6">
              Book Appointment<br />
              To Join Our Online<br />
              Health Courses.
            </h1>
            <Button 
              size="lg" 
              className="mt-6 group"
              onClick={() => window.open("#contact", "_self")}
            >
              <span>GET STARTED</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
