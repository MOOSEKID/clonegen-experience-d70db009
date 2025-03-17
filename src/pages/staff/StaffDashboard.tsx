import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StaffDashboard = () => {
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
            <p>View your work schedule</p>
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
            <CardTitle>Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View and manage your tasks</p>
            <div className="mt-2 text-sm">
              <p>Status: {profile?.status}</p>
              {profile?.reporting_to && (
                <p>Reports to: {profile.reporting_to}</p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Update your profile information</p>
            <div className="mt-2 text-sm">
              <p>Access Level: {profile?.access_level}</p>
              <p>Category: {profile?.staff_category}</p>
              {profile?.primary_location && (
                <p>Location: {profile.primary_location}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffDashboard;
