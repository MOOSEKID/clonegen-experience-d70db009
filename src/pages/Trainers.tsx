
import React from 'react';
import { Helmet } from 'react-helmet';
import Trainers from '@/components/Trainers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TrainersPage = () => {
  return (
    <>
      <Helmet>
        <title>Our Trainers | FitSync Gym</title>
        <meta name="description" content="Meet our expert fitness trainers and instructors who will help you achieve your fitness goals." />
      </Helmet>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          <div className="py-12 bg-white">
            <div className="container-custom mx-auto px-4">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gym-dark mb-4">Our Expert Trainers</h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Our certified fitness professionals are dedicated to helping you reach your health and fitness goals through personalized instruction and motivation.
                </p>
              </div>
            </div>
          </div>
          
          <Trainers />
          
          <section className="py-16 bg-white">
            <div className="container-custom mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gym-dark mb-4">Work With Our Trainers</h2>
                  <p className="text-gray-600 mb-6">
                    Our trainers offer personalized one-on-one sessions, small group training, and specialized programs to help you achieve your specific fitness goals.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <span className="text-gym-orange font-bold mr-2">✓</span>
                      <span>Personalized workout plans tailored to your fitness level</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gym-orange font-bold mr-2">✓</span>
                      <span>Nutritional guidance and meal planning support</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gym-orange font-bold mr-2">✓</span>
                      <span>Regular progress tracking and goal adjustment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gym-orange font-bold mr-2">✓</span>
                      <span>Motivation and accountability to keep you on track</span>
                    </li>
                  </ul>
                  <a 
                    href="/contact" 
                    className="px-6 py-3 bg-gym-orange text-white font-medium rounded-md hover:bg-gym-orange/90 transition-colors inline-block"
                  >
                    Contact Us for Training
                  </a>
                </div>
                
                <div className="bg-gray-100 p-8 rounded-lg shadow-sm">
                  <h3 className="text-2xl font-bold text-gym-dark mb-4">Trainer Certifications</h3>
                  <p className="text-gray-600 mb-6">
                    All our trainers hold recognized fitness certifications from accredited organizations including:
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded shadow-sm">
                      <h4 className="font-bold text-gym-dark">NASM</h4>
                      <p className="text-sm text-gray-600">National Academy of Sports Medicine</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                      <h4 className="font-bold text-gym-dark">ACE</h4>
                      <p className="text-sm text-gray-600">American Council on Exercise</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                      <h4 className="font-bold text-gym-dark">ISSA</h4>
                      <p className="text-sm text-gray-600">International Sports Sciences Association</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow-sm">
                      <h4 className="font-bold text-gym-dark">ACSM</h4>
                      <p className="text-sm text-gray-600">American College of Sports Medicine</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default TrainersPage;
