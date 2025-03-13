
import { useRef, useEffect } from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

// Trainer data
const TRAINERS = [
  {
    id: 1,
    name: 'Alex Johnson',
    specialty: 'Strength & Conditioning',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2070&auto=format&fit=crop',
    bio: 'Alex specializes in strength training and has 10+ years of experience helping clients achieve their fitness goals.',
    social: {
      instagram: '#',
      facebook: '#',
      twitter: '#'
    }
  },
  {
    id: 2,
    name: 'Maya Patel',
    specialty: 'Yoga & Meditation',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop',
    bio: 'Maya is a certified yoga instructor with expertise in various yoga styles, helping members improve flexibility and mindfulness.',
    social: {
      instagram: '#',
      facebook: '#',
      twitter: '#'
    }
  },
  {
    id: 3,
    name: 'David Park',
    specialty: 'High-Intensity Training',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e6349?q=80&w=1974&auto=format&fit=crop',
    bio: 'David specializes in HIIT workouts that maximize calorie burn and boost metabolism in efficient workout sessions.',
    social: {
      instagram: '#',
      facebook: '#',
      twitter: '#'
    }
  },
  {
    id: 4,
    name: 'Sarah Miller',
    specialty: 'Nutrition & Weight Management',
    image: 'https://images.unsplash.com/photo-1596803244618-8dea39ebff61?q=80&w=2071&auto=format&fit=crop',
    bio: 'Sarah helps members complement their fitness routines with personalized nutrition plans for optimal results.',
    social: {
      instagram: '#',
      facebook: '#',
      twitter: '#'
    }
  }
];

const Trainers = () => {
  const trainersRef = useRef<HTMLDivElement>(null);
  const trainerItemsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    if (trainersRef.current) {
      observer.observe(trainersRef.current);
    }

    trainerItemsRef.current.forEach(item => {
      if (item) observer.observe(item);
    });

    return () => {
      if (trainersRef.current) {
        observer.unobserve(trainersRef.current);
      }
      trainerItemsRef.current.forEach(item => {
        if (item) observer.unobserve(item);
      });
    };
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div 
        ref={trainersRef} 
        className="container-custom opacity-0 transition-opacity duration-1000"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gym-dark">Meet Our Expert Trainers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our certified professionals are here to help you achieve your fitness goals with personalized guidance and support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TRAINERS.map((trainer, index) => (
            <div
              key={trainer.id}
              ref={el => trainerItemsRef.current[index] = el}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 opacity-0"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={trainer.image} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gym-dark">{trainer.name}</h3>
                <p className="text-gym-orange font-medium mb-3">{trainer.specialty}</p>
                <p className="text-gray-600 mb-4">{trainer.bio}</p>
                
                {/* Social media links */}
                <div className="flex space-x-3">
                  <a 
                    href={trainer.social.instagram} 
                    className="text-gray-400 hover:text-gym-orange transition-colors"
                    aria-label={`${trainer.name}'s Instagram`}
                  >
                    <Instagram size={20} />
                  </a>
                  <a 
                    href={trainer.social.facebook} 
                    className="text-gray-400 hover:text-gym-orange transition-colors"
                    aria-label={`${trainer.name}'s Facebook`}
                  >
                    <Facebook size={20} />
                  </a>
                  <a 
                    href={trainer.social.twitter} 
                    className="text-gray-400 hover:text-gym-orange transition-colors"
                    aria-label={`${trainer.name}'s Twitter`}
                  >
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
