
import { Dumbbell, Clipboard, Target } from 'lucide-react';
import PlaceholderSection from '@/components/admin/PlaceholderSection';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AdminWorkouts = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Workouts</h1>
        <p className="text-gray-500">Create and manage workout programs for members</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="border hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="bg-orange-100 p-3 rounded-lg w-fit mb-2">
              <Dumbbell className="h-6 w-6 text-gym-orange" />
            </div>
            <h3 className="text-xl font-semibold">Workout Programs</h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Create custom workout programs and assign them to members or groups.</p>
            <Button size="sm" asChild className="mt-2">
              <Link to="/admin/workout-programs">Manage Programs</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="bg-blue-100 p-3 rounded-lg w-fit mb-2">
              <Clipboard className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">Exercise Library</h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Manage a comprehensive library of exercises with instructions and videos.</p>
            <Button size="sm" asChild className="mt-2">
              <Link to="/admin/exercises">View Library</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="bg-green-100 p-3 rounded-lg w-fit mb-2">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold">Progress Tracking</h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Track member progress on assigned workout programs and fitness goals.</p>
            <Button size="sm" asChild className="mt-2">
              <Link to="/admin/progress-tracking">View Progress</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto py-3 justify-start gap-2">
            <Dumbbell className="h-5 w-5" />
            <span>Create New Program</span>
          </Button>
          <Button variant="outline" className="h-auto py-3 justify-start gap-2">
            <Clipboard className="h-5 w-5" />
            <span>Add Exercise</span>
          </Button>
          <Button variant="outline" className="h-auto py-3 justify-start gap-2">
            <Target className="h-5 w-5" />
            <span>Generate Reports</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminWorkouts;
