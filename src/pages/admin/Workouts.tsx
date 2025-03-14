
import { Dumbbell, Clipboard, Target } from 'lucide-react';
import PlaceholderSection from '@/components/admin/PlaceholderSection';

const AdminWorkouts = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Workouts</h1>
        <p className="text-gray-500">Create and manage workout programs for members</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PlaceholderSection
          title="Workout Programs"
          icon={<Dumbbell className="h-6 w-6 text-gym-orange" />}
          description="Create custom workout programs and assign them to members or groups."
        />
        
        <PlaceholderSection
          title="Exercise Library"
          icon={<Clipboard className="h-6 w-6 text-gym-orange" />}
          description="Manage a comprehensive library of exercises with instructions and videos."
        />
        
        <PlaceholderSection
          title="Progress Tracking"
          icon={<Target className="h-6 w-6 text-gym-orange" />}
          description="Track member progress on assigned workout programs and fitness goals."
        />
      </div>
    </div>
  );
};

export default AdminWorkouts;
