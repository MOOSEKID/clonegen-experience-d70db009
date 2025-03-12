
import { useEffect } from 'react';

const AboutUs = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-24 min-h-screen">
      <div className="container-custom py-16">
        <h1 className="text-4xl font-bold mb-8 text-gym-dark">About Us</h1>
        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-lg mb-6">
            Uptown Gym is a premier fitness facility dedicated to helping people achieve their fitness goals 
            in a supportive and motivating environment. Our state-of-the-art equipment, experienced trainers, 
            and variety of classes ensure that every member has access to the tools they need for success.
          </p>
          <p className="text-lg mb-6">
            Founded in 2015, we've grown from a small local gym to a comprehensive wellness center offering 
            everything from personal training to specialized fitness classes, nutrition counseling, and 
            relaxation services.
          </p>
          <p className="text-lg">
            Our mission is to inspire and empower our community to embrace a healthier lifestyle. We believe 
            that fitness is not just about physical strength, but about mental wellbeing, discipline, and 
            balance in life.
          </p>
        </div>
      </div>
    </main>
  );
};

export default AboutUs;
