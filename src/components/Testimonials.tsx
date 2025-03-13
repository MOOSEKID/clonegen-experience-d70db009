
import { useRef, useEffect } from 'react';
import TestimonialSlider from './testimonials/TestimonialSlider';

const Testimonials = () => {
  const testimonialRef = useRef<HTMLDivElement>(null);

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

  return (
    <section ref={testimonialRef} className="py-20 bg-gym-dark text-white overflow-hidden opacity-0">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Members Say</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from the people who have transformed their lives at Uptown Gym.
          </p>
        </div>
        
        <TestimonialSlider />
      </div>
    </section>
  );
};

export default Testimonials;
