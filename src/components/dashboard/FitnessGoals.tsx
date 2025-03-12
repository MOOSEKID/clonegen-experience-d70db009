
import { Dumbbell, Heart, Yoga } from 'lucide-react';
import { cn } from '@/lib/utils';

const FitnessGoals = () => {
  const goals = [
    {
      title: "Stretch",
      icon: Heart,
      progress: 60,
      details: "600 minutes/month",
      color: "bg-purple-500",
      textColor: "text-purple-500"
    },
    {
      title: "Yoga",
      icon: Yoga,
      progress: 48,
      details: "1500 minutes/3 month",
      color: "bg-orange-500",
      textColor: "text-orange-500"
    },
    {
      title: "Squats",
      icon: Dumbbell,
      progress: 92,
      details: "5000 minutes/month",
      color: "bg-yellow-500",
      textColor: "text-yellow-500"
    }
  ];

  return (
    <div className="bg-gym-darkblue rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Fitness Goals</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {goals.map((goal, index) => (
          <div key={index} className="bg-gym-dark rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={cn("p-2 rounded-lg", goal.color, "bg-opacity-20", goal.textColor)}>
                  <goal.icon size={20} />
                </div>
                <h3 className="font-semibold text-white">{goal.title}</h3>
              </div>
              <span className={cn("text-lg font-bold", goal.textColor)}>{goal.progress}%</span>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
              <div 
                className={cn("h-2.5 rounded-full", goal.color)}
                style={{ width: `${goal.progress}%` }}
              />
            </div>
            
            <p className="text-gray-400 text-sm">{goal.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FitnessGoals;
