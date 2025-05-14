
import { useEffect } from 'react';
import { Button } from '@/components/Button';

const Classes = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const classes = [
    {
      name: 'High-Intensity Interval Training',
      instructor: 'Alex Johnson',
      time: 'Mon, Wed, Fri - 6:00 AM',
      description: 'Burn maximum calories in minimum time with our HIIT classes designed to boost metabolism and improve cardiovascular health.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop'
    },
    {
      name: 'Yoga Flow',
      instructor: 'Maya Patel',
      time: 'Tue, Thu - 7:30 AM, Sat - 9:00 AM',
      description: 'Find your center with our flowing yoga sequences that improve flexibility, balance, and mental clarity.',
      image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=2070&auto=format&fit=crop'
    },
    {
      name: 'Spin Class',
      instructor: 'David Park',
      time: 'Mon, Wed, Fri - 5:30 PM',
      description: 'Experience the ultimate cardio workout on our premium bikes with motivating music and expert instruction.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop'
    },
    {
      name: 'Strength Training',
      instructor: 'Sarah Miller',
      time: 'Tue, Thu - 6:00 PM, Sat - 10:30 AM',
      description: 'Build muscle, increase bone density, and improve overall body composition with our comprehensive strength program.',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop'
    },
    {
      name: 'Aqua Fitness',
      instructor: 'Michael Torres',
      time: 'Mon, Wed, Fri - 11:00 AM',
      description: 'Low-impact, high-resistance water workouts perfect for all fitness levels and especially beneficial for joint health.',
      image: 'https://images.unsplash.com/photo-1600965962102-9d260a71890d?q=80&w=2070&auto=format&fit=crop'
    },
    {
      name: 'Boxing Fundamentals',
      instructor: 'James Wilson',
      time: 'Tue, Thu - 7:00 PM',
      description: 'Learn proper boxing techniques while getting an intense full-body workout that improves coordination and power.',
      image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2074&auto=format&fit=crop'
    }
  ];

  return (
    <main className="pt-24 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <h1 className="text-4xl font-bold mb-8 text-gym-dark">Our Classes</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((classItem, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all durationMinutes-300 hover:shadow-xl transform hover:-translate-y-1"
            >
              <div className="h-56 overflow-hidden">
                <img 
                  src={classItem.image} 
                  alt={classItem.name} 
                  className="w-full h-full object-cover transition-transform durationMinutes-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gym-dark">{classItem.name}</h3>
                <p className="text-gym-orange font-medium mb-1">Instructor: {classItem.instructor}</p>
                <p className="text-gray-600 mb-3">{classItem.time}</p>
                <p className="text-gray-700 mb-4">{classItem.description}</p>
                <Button variant="outline" size="sm">Book Now</Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gym-dark text-white rounded-lg shadow-xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gym-orange opacity-10 transform -skew-x-12"></div>
          <h2 className="text-2xl font-bold mb-4 relative z-10">Ready to join a class?</h2>
          <p className="mb-6 max-w-2xl relative z-10">
            Our experienced instructors are ready to help you achieve your fitness goals. 
            Whether you're a beginner or an experienced athlete, we have classes for all levels.
          </p>
          <Button>View Class Schedule</Button>
        </div>
      </div>
    </main>
  );
};

export default Classes;
