
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import FitnessClasses from '@/components/FitnessClasses';
import Testimonials from '@/components/Testimonials';
import MembershipPricing from '@/components/MembershipPricing';
import Trainers from '@/components/Trainers';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/Button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Uptown Gym - Your Fitness Partner</title>
        <link rel="icon" href="/lovable-uploads/50d3d473-1f3f-40d6-b895-c64a2e29ca1d.png" type="image/png" />
      </Helmet>
      <Hero />
      <Features />
      <FitnessClasses />
      <Trainers />
      <Testimonials />
      <MembershipPricing />
      
      {/* Call to Action Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="bg-gym-dark rounded-lg shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-10 md:p-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Start Your Fitness Journey?</h2>
                <p className="text-white/80 mb-8 text-lg">
                  Join Uptown Gym today and transform your life with our state-of-the-art facilities,
                  expert trainers, and supportive community.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg" 
                    className="group"
                    isLink
                    href="/membership"
                  >
                    <span>View Membership Plans</span>
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    isLink
                    href="/contact-us"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop)' }}>
                <div className="h-full bg-gym-orange/20"></div>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <Link to="/classes" className="bg-gym-light rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-gym-dark">Class Schedule</h3>
              <p className="text-gray-600 mb-4">Find the perfect class for your fitness journey and book your spot today.</p>
              <span className="text-gym-orange font-medium flex items-center justify-center">
                View Schedule
                <ArrowRight size={16} className="ml-1" />
              </span>
            </Link>
            
            <Link to="/membership" className="bg-gym-light rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-gym-dark">Membership Plans</h3>
              <p className="text-gray-600 mb-4">Discover our flexible membership options to suit your lifestyle and budget.</p>
              <span className="text-gym-orange font-medium flex items-center justify-center">
                View Plans
                <ArrowRight size={16} className="ml-1" />
              </span>
            </Link>
            
            <Link to="/services" className="bg-gym-light rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-3 text-gym-dark">Our Facilities</h3>
              <p className="text-gray-600 mb-4">Explore our state-of-the-art equipment, spa, and wellness offerings.</p>
              <span className="text-gym-orange font-medium flex items-center justify-center">
                Learn More
                <ArrowRight size={16} className="ml-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
