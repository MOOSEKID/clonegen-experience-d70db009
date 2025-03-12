
import { Dumbbell, Activity, Timer } from 'lucide-react';

const WorkoutStats = () => {
  const stats = [
    {
      title: "850",
      subtitle: "Sets/week",
      icon: Dumbbell,
      workouts: [
        { name: "Squats", count: "10 sets of squats", color: "yellow" },
        { name: "Low Lung", count: "25 sets of lungs", color: "blue" },
        { name: "Batting rope", count: "20 sets of batting", color: "pink" }
      ]
    },
    {
      title: "1.2 hr",
      subtitle: "Walk/week",
      icon: Activity,
      color: "#FFB347"
    },
    {
      title: "4578",
      subtitle: "Steps/week",
      icon: Timer,
      color: "#4EA8DE"
    }
  ];

  return (
    <>
      {stats.map((stat, index) => (
        <div key={index} className="bg-gym-darkblue p-4 rounded-xl">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm">{stat.subtitle}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stat.title}</h3>
            </div>
            <div className="p-2 rounded-lg bg-gym-dark text-gray-300">
              <stat.icon size={22} />
            </div>
          </div>
          
          {stat.workouts && (
            <div className="mt-4 space-y-3">
              {stat.workouts.map((workout, idx) => (
                <div key={idx} className="flex items-center">
                  <div 
                    className={`h-2 w-2 rounded-full mr-2 ${
                      workout.color === 'yellow' ? 'bg-yellow-400' :
                      workout.color === 'blue' ? 'bg-blue-400' :
                      workout.color === 'pink' ? 'bg-pink-400' : 'bg-gray-400'
                    }`}
                  />
                  <div>
                    <p className="text-white text-sm">{workout.name}</p>
                    <p className="text-gray-400 text-xs">{workout.count}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default WorkoutStats;
