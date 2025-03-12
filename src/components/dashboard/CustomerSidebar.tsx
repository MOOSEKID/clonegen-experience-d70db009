
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
          <div className="h-12 w-auto">
            <img 
              src="/lovable-uploads/50d3d473-1f3f-40d6-b895-c64a2e29ca1d.png" 
              alt="Uptown Gym Logo" 
              className="h-full w-auto object-contain"
            />
          </div>
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
