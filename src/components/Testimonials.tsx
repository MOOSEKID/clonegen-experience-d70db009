
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// Testimonial data
const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Member since 2020',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop',
    quote: 'Uptown Gym has completely transformed my fitness journey. The trainers are knowledgeable and supportive, and the facilities are top-notch. I've achieved results I never thought possible!'
  },
  {
    id: 2,
    name: 'Michael Peterson',
    role: 'Member since 2019',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop',
    quote: 'As someone who was intimidated by gyms, Uptown Gym provided the perfect welcoming environment. The community here is incredible, and the classes are challenging yet accessible for all fitness levels.'
  },
  {
    id: 3,
    name: 'Jessica Williams',
    role: 'Member since 2021',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop',
    quote: 'The personal training sessions at Uptown Gym are exceptional. My trainer developed a program specifically for my needs and has been with me every step of the way. I'm stronger and more confident than ever!'
  },
  {
    id: 4,
    name: 'David Chen',
    role: 'Member since 2018',
    image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1887&auto=format&fit=crop',
    quote: 'Uptown Gym offers everything I need in one place - from state-of-the-art equipment to amazing group classes. The spa facilities are an amazing bonus after an intense workout!'
  }
];

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const testimonialInterval = useRef<NodeJS.Timeout | null>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // Auto slide testimonials
    testimonialInterval.current = setInterval(() => {
      nextTestimonial();
    }, 8000); // Change testimonial every 8 seconds

    return () => {
      if (testimonialInterval.current) {
        clearInterval(testimonialInterval.current);
      }
    };
  }, []);

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (testimonialRef.current) {
      observer.observe(testimonialRef.current);
    }

    return () => {
      if (testimonialRef.current) {
        observer.unobserve(testimonialRef.current);
      }
    };
  }, []);

  const handleManualChange = (direction: 'prev' | 'next') => {
    // Reset the interval when manually changing testimonials
    if (testimonialInterval.current) {
      clearInterval(testimonialInterval.current);
    }
    
    // Change the testimonial
    if (direction === 'prev') {
      prevTestimonial();
    } else {
      nextTestimonial();
    }
    
    // Restart the interval
    testimonialInterval.current = setInterval(() => {
      nextTestimonial();
    }, 8000);
  };

  return (
    <section ref={testimonialRef} className="py-20 bg-gym-dark text-white overflow-hidden opacity-0">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Members Say</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from the people who have transformed their lives at Uptown Gym.
          </p>
        </div>
        
        <div className="relative">
          {/* Testimonial slider */}
          <div className="max-w-4xl mx-auto px-8">
            <div className="relative">
              {TESTIMONIALS.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-500 ${
                    index === currentTestimonial 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 absolute top-0 left-0 right-0 translate-x-16'
                  }`}
                >
                  <div className="bg-gym-darkblue rounded-lg p-8 shadow-xl relative">
                    <Quote className="absolute text-gym-orange opacity-20 top-6 left-6" size={60} />
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gym-orange flex-shrink-0">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 z-10">
                        <p className="italic text-lg mb-6 relative">"{testimonial.quote}"</p>
                        <div>
                          <h4 className="font-bold text-xl">{testimonial.name}</h4>
                          <p className="text-gym-orange">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation buttons */}
            <button 
              onClick={() => handleManualChange('prev')}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors z-10"
              aria-label="Previous testimonial"
              disabled={isAnimating}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => handleManualChange('next')}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors z-10"
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
                  if (testimonialInterval.current) {
                    clearInterval(testimonialInterval.current);
                  }
                  testimonialInterval.current = setInterval(() => {
                    nextTestimonial();
                  }, 8000);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? 'w-8 bg-gym-orange' : 'w-2 bg-white/60'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
