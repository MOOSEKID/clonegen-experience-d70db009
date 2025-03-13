
import { Quote } from 'lucide-react';
import { Testimonial } from '@/data/testimonialData';

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

const TestimonialCard = ({ testimonial, isActive }: TestimonialCardProps) => {
  return (
    <div
      className={`absolute inset-0 transition-all duration-500 ${
        isActive 
          ? 'opacity-100 translate-x-0 z-10' 
          : 'opacity-0 translate-x-16 z-0'
      }`}
      aria-hidden={!isActive}
    >
      <div className="bg-gym-darkblue rounded-lg p-8 shadow-xl relative">
        <Quote className="absolute text-gym-orange opacity-20 top-6 left-6" size={60} />
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gym-orange flex-shrink-0">
            <img 
              src={testimonial.image} 
              alt={testimonial.name} 
              className="w-full h-full object-cover"
              loading="lazy"
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
  );
};

export default TestimonialCard;
