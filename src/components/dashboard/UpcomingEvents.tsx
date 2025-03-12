
import { Calendar, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const UpcomingEvents = () => {
  const upcomingEvent = {
    title: "Legend Run 2023",
    organization: "By Scorpions club",
    date: "Monday, April 10th 2023",
    time: "09:00 AM - 16:00"
  };
  
  const activities = [
    {
      user: "Kathryn Lucas",
      activity: "Morning Swim",
      time: "10 Min ago"
    },
    {
      user: "Kelly Guerrero",
      activity: "Quick Sprint",
      time: "33 Min ago"
    }
  ];

  return (
    <div className="space-y-4">
      {/* Upcoming Event Card */}
      <div className="bg-gym-darkblue rounded-xl p-5 text-white">
        <h2 className="text-xl font-bold text-gym-orange mb-3">{upcomingEvent.title}</h2>
        <p className="text-gray-400 text-sm">{upcomingEvent.organization}</p>
        
        <div className="mt-4 flex items-start gap-3">
          <div className="bg-blue-500/20 p-2 rounded-lg">
            <Calendar size={22} className="text-blue-500" />
          </div>
          <div>
            <p className="text-white font-medium">{upcomingEvent.date}</p>
            <p className="text-gray-400 text-sm">{upcomingEvent.time}</p>
          </div>
        </div>
      </div>
      
      {/* Activities */}
      <div className="bg-gym-darkblue rounded-xl p-5 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Live Map</h2>
          <button className="text-gym-orange flex items-center text-sm hover:underline">
            View <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="bg-gray-800 rounded-lg h-32 mb-4 flex items-center justify-center">
          <p className="text-gray-400">Map preview</p>
        </div>
        
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-500")}>
                {activity.user.charAt(0)}
              </div>
              <div>
                <p className="text-white font-medium">{activity.user}</p>
                <div className="flex items-center gap-2">
                  <p className="text-gray-400 text-sm">{activity.activity}</p>
                  <span className="text-gray-500 text-xs">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
