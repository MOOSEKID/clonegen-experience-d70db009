
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Dumbbell, Flame, Medal, Target, Trophy, Calendar, Clock } from 'lucide-react';

const Achievements = () => {
  const achievementsList = [
    {
      id: 1,
      title: "30-Day Streak",
      description: "Completed workouts for 30 consecutive days",
      icon: <Calendar className="h-8 w-8 text-gym-orange" />,
      date: "April 15, 2025",
      points: 500
    },
    {
      id: 2,
      title: "Personal Record: Bench Press",
      description: "Reached new personal best of 225 lbs",
      icon: <Dumbbell className="h-8 w-8 text-gym-orange" />,
      date: "April 3, 2025",
      points: 300
    },
    {
      id: 3,
      title: "Marathon Ready",
      description: "Completed a 20-mile run preparation",
      icon: <Flame className="h-8 w-8 text-gym-orange" />,
      date: "March 28, 2025",
      points: 400
    },
    {
      id: 4,
      title: "Class Champion",
      description: "Attended 25 fitness classes",
      icon: <Trophy className="h-8 w-8 text-gym-orange" />,
      date: "March 15, 2025",
      points: 250
    },
    {
      id: 5,
      title: "Weight Loss Goal",
      description: "Achieved 10 lbs weight loss target",
      icon: <Target className="h-8 w-8 text-gym-orange" />,
      date: "March 1, 2025",
      points: 350
    }
  ];
  
  const nextAchievements = [
    {
      id: 6,
      title: "50-Day Streak",
      description: "Complete workouts for 50 consecutive days",
      icon: <Calendar className="h-6 w-6 text-gray-400" />,
      progress: 60, // percentage
      pointsReward: 750
    },
    {
      id: 7,
      title: "Strength Master",
      description: "Increase strength by 25% across all major lifts",
      icon: <Dumbbell className="h-6 w-6 text-gray-400" />,
      progress: 40,
      pointsReward: 500
    },
    {
      id: 8,
      title: "Early Riser",
      description: "Complete 20 workouts before 7 AM",
      icon: <Clock className="h-6 w-6 text-gray-400" />,
      progress: 30,
      pointsReward: 300
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Your Achievements</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Award className="h-4 w-4 text-gym-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,850</div>
            <p className="text-xs text-gray-400">Ranked #42 in your gym</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Achievements Unlocked</CardTitle>
            <Trophy className="h-4 w-4 text-gym-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-gray-400">Out of 50 possible</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Flame className="h-4 w-4 text-gym-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 days</div>
            <p className="text-xs text-gray-400">Personal best: 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Medal className="h-5 w-5 text-gym-orange" />
            <span>Recent Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievementsList.map(achievement => (
              <div key={achievement.id} className="flex items-center gap-4 p-4 bg-gym-dark rounded-lg">
                <div className="flex-shrink-0">
                  {achievement.icon}
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium">{achievement.title}</h3>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                  <p className="text-xs text-gray-500 mt-1">Achieved on {achievement.date}</p>
                </div>
                <div className="flex-shrink-0 text-center">
                  <div className="text-xl font-bold text-gym-orange">+{achievement.points}</div>
                  <div className="text-xs text-gray-400">points</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Next Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {nextAchievements.map(achievement => (
              <div key={achievement.id} className="p-4 bg-gym-dark rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  {achievement.icon}
                  <h3 className="font-medium">{achievement.title}</h3>
                </div>
                <p className="text-sm text-gray-400 mb-3">{achievement.description}</p>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{achievement.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gym-orange h-2 rounded-full" 
                    style={{ width: `${achievement.progress}%` }}
                  ></div>
                </div>
                <div className="mt-3 text-right text-xs text-gray-400">
                  Reward: <span className="text-gym-orange">{achievement.pointsReward} points</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Achievements;
