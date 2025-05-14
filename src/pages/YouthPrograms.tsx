
import { useEffect } from 'react';
import { Users, Heart, Trophy, Shield } from 'lucide-react';

const YouthPrograms = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const programs = [
    {
      icon: <Users className="text-gym-orange" size={48} />,
      title: 'Youth Sports Conditioning',
      description: 'Specialized training programs designed to improve athletic performance and reduce injury risk for young athletes.',
      ageGroups: '12-17 years'
    },
    {
      icon: <Heart className="text-gym-orange" size={48} />,
      title: 'Kids Fitness Fun',
      description: 'Engaging fitness activities that make exercise fun while developing motor skills and promoting healthy habits.',
      ageGroups: '5-11 years'
    },
    {
      icon: <Trophy className="text-gym-orange" size={48} />,
      title: 'Teen Strength & Conditioning',
      description: 'Safe and effective strength training programs specifically designed for teenage athletes and fitness enthusiasts.',
      ageGroups: '13-17 years'
    },
    {
      icon: <Shield className="text-gym-orange" size={48} />,
      title: 'Family Fitness Classes',
      description: 'Workout classes where parents and children can exercise together, creating healthy family habits and bonding time.',
      ageGroups: 'All ages'
    }
  ];

  return (
    <main className="pt-24 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <h1 className="text-4xl font-bold mb-8 text-gym-dark">Youth Programs</h1>
        
        <div className="mb-12">
          <img 
            src="https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=2969&auto=format&fit=crop" 
            alt="Youth fitness programs" 
            className="w-full h-[450px] object-cover rounded-lg shadow-md mb-8"
          />
          <p className="text-lg text-gray-700 mb-6">
            Our youth programs are designed to inspire and encourage young people to embrace physical activity from an early age.
            We focus on making fitness fun while teaching valuable skills, teamwork, and healthy habits that will last a lifetime.
            All our youth programs are led by certified trainers with experience working with children and adolescents.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {programs.map((program, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all durationMinutes-300 hover:shadow-lg p-6"
            >
              <div className="mb-4">{program.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gym-dark">{program.title}</h3>
              <div className="mb-3 inline-block bg-gym-orange/10 text-gym-orange px-3 py-1 rounded-full text-sm font-medium">
                {program.ageGroups}
              </div>
              <p className="text-gray-600">{program.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gym-dark">Program Safety & Registration</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              <span className="font-semibold">Safety First:</span> All our youth program instructors are fully certified, background-checked, and trained in pediatric first aid and CPR.
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Registration Process:</span> Enrollment in our youth programs requires a parent/guardian consent form and a brief health questionnaire.
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Trial Classes:</span> We offer one free trial class for each program to ensure it's the right fit for your child.
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Class Sizes:</span> We maintain small class sizes to ensure personalized attention and optimal learning.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default YouthPrograms;
