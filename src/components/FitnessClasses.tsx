
import { useRef, useEffect } from 'react';
import { Dumbbell, Users, Clock, ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';

// Fitness class data
const classCategories = [
  {
    id: 'cardio',
    name: 'Cardio'
  },
  {
    id: 'strength',
    name: 'Strength'
  },
  {
    id: 'yoga',
    name: 'Yoga'
  },
  {
    id: 'hiit',
    name: 'HIIT'
  }
];

const fitnessClasses = {
  cardio: [
    {
      id: 1,
      title: 'Spin Class',
      description: 'High-energy indoor cycling with motivating music and expert instruction.',
      image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?q=80&w=2070&auto=format&fit=crop',
      durationMinutes: '45 min',
      maxParticipants: 20,
      instructor: 'Emma Johnson'
    },
    {
      id: 2,
      title: 'Zumba',
      description: 'Dance-based cardio that feels like a party rather than a workout.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop',
      durationMinutes: '60 min',
      maxParticipants: 25,
      instructor: 'Maria Rodriguez'
    },
    {
      id: 3,
      title: 'Kickboxing',
      description: 'High-intensity cardio combining martial arts techniques and heart-pumping exercise.',
      image: 'https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=2070&auto=format&fit=crop',
      durationMinutes: '50 min',
      maxParticipants: 18,
      instructor: 'Alex Nguyen'
    }
  ],
  strength: [
    {
      id: 4,
      title: 'BodyPump',
      description: 'Barbell workout that strengthens your entire body and challenges all major muscle groups.',
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop',
      durationMinutes: '55 min',
      maxParticipants: 15,
      instructor: 'Jason Smith'
    },
    {
      id: 5,
      title: 'Core Power',
      description: 'Strengthen your core muscles including abs, obliques, and lower back.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop',
      durationMinutes: '40 min',
      maxParticipants: 20,
      instructor: 'Mike Johnson'
    },
    {
      id: 6,
      title: 'Powerlifting',
      description: 'Master the techniques of squats, bench press, and deadlift with expert coaching.',
      image: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?q=80&w=2071&auto=format&fit=crop',
      durationMinutes: '60 min',
      maxParticipants: 12,
      instructor: 'Chris Taylor'
    }
  ],
  yoga: [
    {
      id: 7,
      title: 'Vinyasa Flow',
      description: 'Dynamic practice linking breath with movement in a flowing sequence.',
      image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=2070&auto=format&fit=crop',
      durationMinutes: '60 min',
      maxParticipants: 18,
      instructor: 'Sarah Adams'
    },
    {
      id: 8,
      title: 'Hot Yoga',
      description: 'Practice in a heated room to detoxify the body and increase flexibility.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2022&auto=format&fit=crop',
      durationMinutes: '75 min',
      maxParticipants: 16,
      instructor: 'Lisa Chan'
    },
    {
      id: 9,
      title: 'Restorative Yoga',
      description: 'Passive, deep stretches held for longer periods to promote relaxation.',
      image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1926&auto=format&fit=crop',
      durationMinutes: '60 min',
      maxParticipants: 15,
      instructor: 'Priya Patel'
    }
  ],
  hiit: [
    {
      id: 10,
      title: 'Circuit Training',
      description: 'High-intensity workout stations combining cardio and strength for maximum calorie burn.',
      image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=1931&auto=format&fit=crop',
      durationMinutes: '45 min',
      maxParticipants: 16,
      instructor: 'Ryan Peters'
    },
    {
      id: 11,
      title: 'Tabata',
      description: '20 seconds of intense work followed by 10 seconds of rest, repeated for 4 minutes per exercise.',
      image: 'https://images.unsplash.com/photo-1551215110-9bf21a2941ef?q=80&w=2070&auto=format&fit=crop',
      durationMinutes: '30 min',
      maxParticipants: 20,
      instructor: 'Jen Williams'
    },
    {
      id: 12,
      title: 'Battle Ropes',
      description: 'Full-body workout using heavy ropes for intense cardio and strength training.',
      image: 'https://images.unsplash.com/photo-1520941066462-45f451bca908?q=80&w=1974&auto=format&fit=crop',
      durationMinutes: '40 min',
      maxParticipants: 12,
      instructor: 'Marcus Jones'
    }
  ]
};

const FitnessClasses = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
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
    <section 
      ref={sectionRef}
      className="py-20 bg-gym-light text-gym-dark opacity-0 transition-opacity durationMinutes-1000"
      id="classes-section"
    >
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Fitness Classes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover a variety of classes to suit your fitness level and goals. 
            Our expert instructors will guide you every step of the way.
          </p>
        </div>

        <Tabs defaultValue="cardio" className="w-full">
          <TabsList className="flex justify-center mb-8 bg-transparent">
            {classCategories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="px-6 py-3 mx-1 data-[state=active]:bg-gym-orange data-[state=active]:text-white"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.entries(fitnessClasses).map(([category, classes]) => (
            <TabsContent key={category} value={category} className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {classes.map((fitnessClass) => (
                  <Card key={fitnessClass.id} className="overflow-hidden hover:shadow-lg transition-shadow durationMinutes-300 flex flex-col">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={fitnessClass.image} 
                        alt={fitnessClass.title} 
                        className="w-full h-full object-cover transition-transform durationMinutes-500 hover:scale-110"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{fitnessClass.title}</CardTitle>
                      <CardDescription className="text-gray-600">{fitnessClass.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-gray-700 mb-4">{fitnessClass.description}</p>
                      <div className="flex justify-between text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock size={16} className="mr-1" />
                          <span>{fitnessClass.durationMinutes}</span>
                        </div>
                        <div className="flex items-center">
                          <Users size={16} className="mr-1" />
                          <span>Max {fitnessClass.maxParticipants}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full group"
                        isLink
                        href="/classes"
                      >
                        <span>Book Now</span>
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform durationMinutes-300" size={16} />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="flex justify-center mt-10">
                <Button 
                  size="lg" 
                  className="group"
                  isLink
                  href="/classes"
                >
                  <span>View All Classes</span>
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform durationMinutes-300" size={18} />
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default FitnessClasses;
