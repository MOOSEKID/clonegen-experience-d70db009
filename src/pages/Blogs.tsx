import { useEffect } from 'react';
import { CalendarDays, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/Button';

const Blogs = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const blogs = [
    {
      title: 'The Benefits of High-Intensity Interval Training',
      author: 'Alex Johnson',
      date: 'June 15, 2023',
      excerpt: 'Discover how HIIT can transform your fitness routine and maximize results in minimal time.',
      image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=2574&auto=format&fit=crop'
    },
    {
      title: 'Nutrition Tips for Muscle Building',
      author: 'Sarah Miller',
      date: 'July 3, 2023',
      excerpt: 'Learn about the essential nutrients and meal timing strategies to optimize muscle growth and recovery.',
      image: 'https://images.unsplash.com/photo-1615641646288-cbafe8357ecb?q=80&w=2661&auto=format&fit=crop'
    },
    {
      title: 'Mindfulness and Fitness: The Perfect Combination',
      author: 'Maya Patel',
      date: 'July 28, 2023',
      excerpt: 'Explore how incorporating mindfulness into your workouts can enhance performance and overall wellbeing.',
      image: 'https://images.unsplash.com/photo-1593164842264-990881bd9237?q=80&w=2787&auto=format&fit=crop'
    },
    {
      title: "Beginner's Guide to Strength Training",
      author: 'David Park',
      date: 'August 12, 2023',
      excerpt: 'Everything you need to know to start a safe and effective strength training program from scratch.',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2670&auto=format&fit=crop'
    },
    {
      title: 'Recovery Strategies for Athletes',
      author: 'James Wilson',
      date: 'September 5, 2023',
      excerpt: 'Advanced recovery techniques to help you bounce back faster and prevent injuries.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop'
    },
    {
      title: 'Swimming Benefits for All Ages',
      author: 'Michael Torres',
      date: 'September 20, 2023',
      excerpt: 'Why swimming is one of the best full-body workouts for people of all fitness levels and ages.',
      image: 'https://images.unsplash.com/photo-1600965962102-9d260a71890d?q=80&w=2070&auto=format&fit=crop'
    }
  ];

  return (
    <main className="pt-24 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <h1 className="text-4xl font-bold mb-8 text-gym-dark">Fitness Blog</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <div className="flex items-center mr-4">
                    <User size={14} className="mr-1" />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarDays size={14} className="mr-1" />
                    <span>{blog.date}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gym-dark hover:text-gym-orange transition-colors duration-300">
                  <a href="#">{blog.title}</a>
                </h3>
                <p className="text-gray-700 mb-4">{blog.excerpt}</p>
                <a 
                  href="#" 
                  className="inline-flex items-center text-gym-orange font-medium hover:underline group"
                >
                  Read More 
                  <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Button>Load More Articles</Button>
        </div>
      </div>
    </main>
  );
};

export default Blogs;
