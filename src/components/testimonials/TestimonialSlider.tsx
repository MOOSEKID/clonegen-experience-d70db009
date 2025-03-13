
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '@/data/testimonialData';
import TestimonialCard from './TestimonialCard';

const TestimonialSlider = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const testimonialInterval = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentTestimonial(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const startAutoRotation = () => {
    // Clear any existing interval first
    if (testimonialInterval.current) {
      clearInterval(testimonialInterval.current);
    }
    
    // Set new interval
    testimonialInterval.current = setInterval(() => {
      nextTestimonial();
    }, 8000);
  };

  const handleManualChange = (direction: 'prev' | 'next') => {
    // Reset the interval when manually changing testimonials
    if (direction === 'prev') {
      prevTestimonial();
    } else {
      nextTestimonial();
    }
    
    // Restart the interval
    startAutoRotation();
  };

  // Setup auto rotation on initial render
  useEffect(() => {
    startAutoRotation();
    
    // Cleanup on unmount
    return () => {
      if (testimonialInterval.current) {
        clearInterval(testimonialInterval.current);
      }
    };
  }, []);

  return (
    <div className="relative" ref={sliderRef}>
      {/* Testimonial slider */}
      <div className="max-w-4xl mx-auto px-8">
        <div className="relative min-h-[300px] md:min-h-[250px]">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              isActive={index === currentTestimonial}
            />
          ))}
        </div>
        
        {/* Navigation buttons */}
        <button 
          onClick={() => handleManualChange('prev')}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors z-20"
          aria-label="Previous testimonial"
          disabled={isAnimating}
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => handleManualChange('next')}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors z-20"
          aria-label="Next testimonial"
          disabled={isAnimating}
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      {/* Testimonial indicators */}
      <div className="flex justify-center mt-8 space-x-2">
        {TESTIMONIALS.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentTestimonial(index);
              startAutoRotation();
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentTestimonial ? 'w-8 bg-gym-orange' : 'w-2 bg-white/60'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialSlider;
