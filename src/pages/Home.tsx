
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Trainers from '@/components/Trainers';
import FitnessClasses from '@/components/FitnessClasses';
import MembershipPricing from '@/components/MembershipPricing';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <FitnessClasses />
        <Trainers />
        <MembershipPricing />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
