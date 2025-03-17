
import { useEffect } from 'react';
import { Button } from '@/components/Button';

const Blogs = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: 'The Ultimate Guide to HIIT Workouts',
      excerpt: 'Learn how High-Intensity Interval Training can transform your fitness routine in just 20 minutes a day.',
      author: 'Sarah Johnson',
      date: 'May 15, 2023',
      category: 'Fitness',
      imageUrl: '/lovable-uploads/ec104137-606c-4a99-a2c7-ed0a38667c39.png'
    },
    {
      id: 2,
      title: 'Nutrition Tips for Muscle Building',
      excerpt: 'Discover the best foods and meal timing strategies to maximize your muscle growth and recovery.',
      author: 'Michael Chen',
      date: 'April 28, 2023',
      category: 'Nutrition',
      imageUrl: '/lovable-uploads/01fa474e-e83a-48f4-9ffc-2047ca448aa7.png'
    },
    {
      id: 3,
      title: 'Yoga for Stress Relief: 5 Key Poses',
      excerpt: 'Incorporate these simple yoga poses into your daily routine to reduce stress and improve mental clarity.',
      author: 'Aisha Patel',
      date: 'April 10, 2023',
      category: 'Wellness',
      imageUrl: '/lovable-uploads/7dcb1541-09e5-4dc0-afbf-e868d229ff1c.png'
    },
    {
      id: 4,
      title: 'The Science Behind Effective Warm-ups',
      excerpt: 'Learn why proper warm-ups are crucial for performance and how to design the perfect pre-workout routine.',
      author: 'Thomas Rodriguez',
      date: 'March 22, 2023',
      category: 'Training',
      imageUrl: '/lovable-uploads/50d3d473-1f3f-40d6-b895-c64a2e29ca1d.png'
    }
  ];

  return (
    <main className="pt-24 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <h1 className="text-4xl font-bold mb-2 text-gym-dark">Fitness Blog</h1>
        <p className="text-lg text-gray-600 mb-12">Expert advice, tips, and insights for your fitness journey</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="text-xs font-semibold text-white bg-gym-orange px-2 py-1 rounded-full">{post.category}</span>
                  <span className="text-xs text-gray-500 ml-2">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gym-dark">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">By {post.author}</span>
                  <Button variant="link" className="text-gym-orange">
                    Read More
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Button>
            View All Articles
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Blogs;
