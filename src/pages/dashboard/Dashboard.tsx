
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const { user, profile } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {profile?.full_name || user?.full_name || 'Member'}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upcoming Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You have no upcoming classes scheduled</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recent Workouts</CardTitle>
          </CardHeader>
          <CardContent>
            <p>No recent workouts recorded</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Membership</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Your membership is active</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <button className="p-4 bg-primary/10 text-primary rounded-lg text-left hover:bg-primary/20 transition-colors">
            Book a Class
          </button>
          <button className="p-4 bg-primary/10 text-primary rounded-lg text-left hover:bg-primary/20 transition-colors">
            Log a Workout
          </button>
          <button className="p-4 bg-primary/10 text-primary rounded-lg text-left hover:bg-primary/20 transition-colors">
            View Progress
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
