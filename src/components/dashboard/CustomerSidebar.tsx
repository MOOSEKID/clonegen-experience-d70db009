
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart2, Calendar, Dumbbell, Heart, Award, MapPin, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomerSidebarProps {
  isOpen: boolean;
}

const CustomerSidebar = ({ isOpen }: CustomerSidebarProps) => {
  const location = useLocation();
  
  const sidebarItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Dumbbell, label: 'Workouts', path: '/dashboard/workouts' },
    { icon: BarChart2, label: 'Progress', path: '/dashboard/progress' },
    { icon: Calendar, label: 'Schedule', path: '/dashboard/schedule' },
    { icon: Heart, label: 'Health', path: '/dashboard/health' },
    { icon: Award, label: 'Achievements', path: '/dashboard/achievements' },
    { icon: MapPin, label: 'Gym Locations', path: '/dashboard/locations' },
  ];

  const lowerItems = [
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
    { icon: LogOut, label: 'Logout', path: '/login', onClick: () => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
    }},
  ];

  return (
    <aside 
      className={cn(
        "bg-gym-darkblue text-white flex-shrink-0 flex flex-col transition-all duration-300 overflow-hidden",
        isOpen ? "w-64" : "w-20",
      )}
    >
      <div className="p-4 flex justify-center">
        <Link to="/" className={cn("flex items-center", isOpen ? "justify-start" : "justify-center")}>
          <div className="relative h-12 w-12 flex items-center justify-center">
            <div className="bg-white rounded-full p-1.5">
              <span className="text-gym-dark font-bold text-lg">U</span>
            </div>
          </div>
          {isOpen && (
            <span className="text-white font-bold text-xl ml-2">
              <span className="text-gym-orange">Uptown</span>Gym
            </span>
          )}
        </Link>
      </div>

      <div className="flex-1 flex flex-col justify-between py-6">
        <nav className="space-y-1 px-3">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gym-dark transition-colors",
                location.pathname === item.path ? "bg-gym-dark text-gym-orange" : "text-gray-300",
                !isOpen && "justify-center px-2"
              )}
            >
              <item.icon size={22} />
              {isOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <nav className="space-y-1 px-3 mt-auto">
          {lowerItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={item.onClick}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gym-dark transition-colors",
                location.pathname === item.path ? "bg-gym-dark text-gym-orange" : "text-gray-300",
                !isOpen && "justify-center px-2"
              )}
            >
              <item.icon size={22} />
              {isOpen && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default CustomerSidebar;
