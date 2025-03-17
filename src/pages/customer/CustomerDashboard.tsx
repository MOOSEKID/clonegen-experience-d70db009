import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CustomerDashboard = () => {
  const { profile } = useAuth();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome, {profile?.full_name}</h1>
        <div className="text-sm text-gray-500">
          Member since {new Date(profile?.created_at || '').toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>My Membership</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View and manage your membership details</p>
            <div className="mt-2 text-sm">
              <p>Status: {profile?.status}</p>
              {profile?.primary_location && (
                <p>Primary Location: {profile.primary_location}</p>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Training Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Book and view your training sessions</p>
            {profile?.contact_email && (
              <div className="mt-2 text-sm">
                <p>Contact: {profile.contact_email}</p>
                {profile.contact_phone && <p>Phone: {profile.contact_phone}</p>}
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>My Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Track your fitness progress</p>
            {profile?.specializations && profile.specializations.length > 0 && (
              <div className="mt-2 text-sm">
                <p>Training Focus:</p>
                <ul className="list-disc list-inside">
                  {profile.specializations.map((spec: string, index: number) => (
                    <li key={index}>{spec}</li>
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

export default CustomerDashboard;
