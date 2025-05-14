import { User, Award, Clock, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const programs = [
  {
    id: 1,
    name: "Kids' Swimming Lessons",
    ageRange: "4-12 years",
    schedule: "Monday, Wednesday, Friday 4-5pm",
    durationMinutes: "45 minutes",
    description: "Our kids' swimming program focuses on water safety, stroke development, and building confidence in the water. Classes are grouped by age and ability.",
    image: "/lovable-uploads/kids-swimming.jpg",
    benefits: [
      "Water safety skills",
      "Stroke technique development",
      "Confidence building",
      "Supervised by certified instructors"
    ]
  },
  {
    id: 2,
    name: "Teen Fitness",
    ageRange: "13-17 years",
    schedule: "Tuesday, Thursday 4-5pm, Saturday 10-11am",
    durationMinutes: "60 minutes",
    description: "A program designed specifically for teenagers to learn proper exercise techniques, build strength, and develop healthy fitness habits in a safe, supervised environment.",
    image: "/lovable-uploads/teen-fitness.jpg",
    benefits: [
      "Proper technique instruction",
      "Strength development appropriate for teens",
      "Cardiovascular conditioning",
      "Nutritional guidance"
    ]
  },
  {
    id: 3,
    name: "Youth Sports Camp",
    ageRange: "8-14 years",
    schedule: "School holidays and summer breaks",
    durationMinutes: "Half-day or full-day options",
    description: "Multi-sport camps during school breaks where kids can try a variety of activities including basketball, soccer, swimming, and more in a fun, non-competitive environment.",
    image: "/lovable-uploads/youth-sports.jpg",
    benefits: [
      "Exposure to multiple sports",
      "Team building activities",
      "Development of motor skills",
      "Fun and engaging environment"
    ]
  },
  {
    id: 4,
    name: "Family Fitness Classes",
    ageRange: "All ages (children with parents)",
    schedule: "Saturday, Sunday 9-10am",
    durationMinutes: "45 minutes",
    description: "Workout sessions designed for the whole family, where parents and children can exercise together in a fun, supportive atmosphere.",
    image: "/lovable-uploads/family-fitness.jpg",
    benefits: [
      "Quality family time",
      "Age-appropriate exercises for everyone",
      "Promotes healthy lifestyle for the entire family",
      "Fun, game-based approach to fitness"
    ]
  }
];

const ProgramCard = ({ program }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <img 
        src={program.image || "https://placehold.co/600x400/e2e8f0/475569?text=Program+Image"} 
        alt={program.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{program.name}</h3>
        <p className="text-gray-600 mb-4">{program.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <User className="text-gym-orange" size={18} />
            <div>
              <p className="text-sm font-medium">Age Range</p>
              <p className="text-sm text-gray-600">{program.ageRange}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="text-gym-orange" size={18} />
            <div>
              <p className="text-sm font-medium">Duration</p>
              <p className="text-sm text-gray-600">{program.durationMinutes}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <Calendar className="text-gym-orange" size={18} />
            <div>
              <p className="text-sm font-medium">Schedule</p>
              <p className="text-sm text-gray-600">{program.schedule}</p>
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gym-orange p-0 mb-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "Show benefits"}
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
        
        {isExpanded && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Program Benefits:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {program.benefits.map((benefit, index) => (
                <li key={index} className="text-gray-600">{benefit}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const YouthPrograms = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container-custom py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-6">Youth & Family Programs</h1>
        <p className="text-lg text-gray-600">
          At Uptown Gym, we believe in fostering a love for fitness from an early age. 
          Our youth programs are designed to make exercise fun, engaging, and appropriate 
          for different age groups, helping children and teenagers develop healthy habits 
          that last a lifetime.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {programs.map(program => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>
      
      <div className="bg-gym-dark/5 rounded-xl p-8 mb-16">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">Our Approach to Youth Fitness</h2>
            <p className="text-gray-600 mb-4">
              We understand that children and teenagers have unique physical and emotional needs when it comes to fitness. 
              Our programs are designed with these considerations in mind:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2">
                <Award className="text-gym-orange min-w-[20px] mt-1" size={20} />
                <span>Age-appropriate activities that promote development without overstraining</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="text-gym-orange min-w-[20px] mt-1" size={20} />
                <span>Focus on fun and engagement rather than intense competition</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="text-gym-orange min-w-[20px] mt-1" size={20} />
                <span>Certified instructors trained in working with children and adolescents</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="text-gym-orange min-w-[20px] mt-1" size={20} />
                <span>Emphasis on building confidence, social skills, and teamwork</span>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <img 
              src="/lovable-uploads/youth-fitness-approach.jpg" 
              alt="Youth fitness approach" 
              className="rounded-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Your Child Started?</h2>
        <p className="mb-6 text-gray-600">
          Enroll your child in one of our youth programs today and watch them develop a love for fitness that will benefit them throughout their life.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            className="bg-gym-orange hover:bg-gym-orange/90"
            onClick={() => navigate('/membership')}
          >
            View Family Memberships
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/contact-us')}
          >
            Contact for Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default YouthPrograms;
