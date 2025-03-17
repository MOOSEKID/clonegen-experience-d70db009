import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TrainerDashboard = () => {
  const { profile } = useAuth();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome, {profile?.full_name}</h1>
        <div className="text-sm text-gray-500">
          {profile?.role} • {profile?.department}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>My Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View and manage your training schedule</p>
            {profile?.working_hours && (
              <div className="mt-2 text-sm">
                <p>Working hours: {profile.working_hours.start} - {profile.working_hours.end}</p>
                <p>Days: {profile.working_hours.days.join(', ')}</p>
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>My Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage your client list and sessions</p>
            {profile?.max_clients && (
              <p className="mt-2 text-sm">Maximum clients: {profile.max_clients}</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Update your profile and certifications</p>
            {profile?.certifications && profile.certifications.length > 0 && (
              <div className="mt-2 text-sm">
                <p>Certifications:</p>
                <ul className="list-disc list-inside">
                  {profile.certifications.map((cert: string, index: number) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrainerDashboard;
