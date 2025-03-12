
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import Features from '@/components/Features';

const Index = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
    </main>
  );
};

export default Index;
