
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import { Helmet } from 'react-helmet';

const Index = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen">
      <Helmet>
        <title>Uptown Gym - Your Fitness Partner</title>
        <link rel="icon" href="/public/lovable-uploads/50d3d473-1f3f-40d6-b895-c64a2e29ca1d.png" type="image/png" />
      </Helmet>
      <Hero />
      <Features />
    </main>
  );
};

export default Index;
