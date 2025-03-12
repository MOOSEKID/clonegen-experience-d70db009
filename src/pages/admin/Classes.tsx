
import { Calendar, Clock, Users } from 'lucide-react';
import PlaceholderSection from '@/components/admin/PlaceholderSection';

const AdminClasses = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Classes</h1>
        <p className="text-gray-500">Manage your gym class schedules and bookings</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PlaceholderSection
          title="Class Schedule"
          icon={<Calendar className="h-6 w-6 text-gym-orange" />}
          description="Create and manage class schedules, assign trainers, and set capacity limits."
        />
        
        <PlaceholderSection
          title="Class Bookings"
          icon={<Users className="h-6 w-6 text-gym-orange" />}
          description="View and manage member bookings, waitlists, and cancellations."
        />
        
        <PlaceholderSection
          title="Class Analytics"
          icon={<Clock className="h-6 w-6 text-gym-orange" />}
          description="Track attendance rates, popular classes, and optimize scheduling."
        />
      </div>
    </div>
  );
};

export default AdminClasses;
