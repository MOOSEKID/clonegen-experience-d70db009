
import { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// Array of slideshow images
const SLIDE_IMAGES = [
  '/lovable-uploads/d994d119-3820-41b4-be47-519e954840a8.png',
  '/lovable-uploads/df38f2f2-29af-42aa-8f29-0d0de27cd833.png',
  '/lovable-uploads/01fa474e-e83a-48f4-9ffc-2047ca448aa7.png',
  '/lovable-uploads/7dcb1541-09e5-4dc0-afbf-e868d229ff1c.png'
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % SLIDE_IMAGES.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + SLIDE_IMAGES.length) % SLIDE_IMAGES.length);
  };

  // Initial animations
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

  // Auto slideshow effect
  useEffect(() => {
    // Start the slideshow interval
    slideInterval.current = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    // Clean up the interval when component unmounts
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, []);

  // Reset the interval when manually changing slides
  const handleSlideChange = (direction: 'prev' | 'next') => {
    // Clear the existing interval
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    
    // Change the slide
    if (direction === 'prev') {
      prevSlide();
    } else {
      nextSlide();
    }
    
    // Restart the interval
    slideInterval.current = setInterval(() => {
      nextSlide();
    }, 5000);
  };

  return (
    <div ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Slideshow */}
      <div className="absolute inset-0">
        {SLIDE_IMAGES.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity durationMinutes-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image})` }}
          >
            <div className="hero-overlay"></div>
          </div>
        ))}
        
        {/* Slide navigation buttons */}
        <button 
          onClick={() => handleSlideChange('prev')}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => handleSlideChange('next')}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
        
        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {SLIDE_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                if (slideInterval.current) {
                  clearInterval(slideInterval.current);
                }
                slideInterval.current = setInterval(() => {
                  nextSlide();
                }, 5000);
              }}
              className={`h-2 rounded-full transition-all durationMinutes-300 ${
                index === currentSlide ? 'w-8 bg-gym-orange' : 'w-2 bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Content Container */}
      <div ref={textRef} className="relative h-full flex items-center">
        <div className="container-custom h-full flex flex-col justify-center">
          <div className="relative pl-8 max-w-3xl opacity-0 transition-all durationMinutes-700" style={{ transitionDelay: '0.3s' }}>
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
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform durationMinutes-300" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
