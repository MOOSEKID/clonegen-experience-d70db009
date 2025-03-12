
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import WorkoutOverview from '@/components/dashboard/WorkoutOverview';
import FitnessGoals from '@/components/dashboard/FitnessGoals';
import WorkoutStats from '@/components/dashboard/WorkoutStats';
import CalendarView from '@/components/dashboard/CalendarView';
import UpcomingEvents from '@/components/dashboard/UpcomingEvents';

const Dashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning!');
    else if (hour < 18) setGreeting('Good Afternoon!');
    else setGreeting('Good Evening!');

    // Get user name from localStorage
    const name = localStorage.getItem('userName') || 'Member';
    setUserName(name);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-xl text-white/80">{greeting}</h2>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            Welcome Back, <span className="bg-gym-orange/20 text-gym-orange px-3 py-1 rounded-full">{userName}</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Workout Banner */}
          <WorkoutOverview />
          
          {/* Today's Workout and Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <WorkoutStats />
          </div>
          
          {/* Fitness Goals */}
          <FitnessGoals />
        </div>
        
        <div className="space-y-6">
          {/* Schedule/Calendar */}
          <CalendarView />
          
          {/* Upcoming Events */}
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
