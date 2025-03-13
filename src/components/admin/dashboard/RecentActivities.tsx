
import { Users, CreditCard } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const RecentActivities = () => {
  // Mock activities
  const activities = [
    { id: 1, type: 'member', title: 'New member registration', description: 'John Smith joined Basic membership', time: 'Just now' },
    { id: 2, type: 'payment', title: 'Payment received', description: 'Sarah Johnson - $59.99 Monthly Plan', time: '1 hour ago' },
    { id: 3, type: 'member', title: 'New member registration', description: 'Michael Brown joined Premium membership', time: '2 hours ago' },
    { id: 4, type: 'payment', title: 'Payment received', description: 'Alex Williams - $149.99 Quarterly Plan', time: '3 hours ago' },
    { id: 5, type: 'member', title: 'New member registration', description: 'Lisa Davis joined Student membership', time: '4 hours ago' },
  ];

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Latest gym activities and events</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${activity.type === 'member' ? 'bg-purple-100' : 'bg-blue-100'}`}>
                {activity.type === 'member' ? 
                  <Users className={`h-5 w-5 text-purple-600`} /> : 
                  <CreditCard className={`h-5 w-5 text-blue-600`} />
                }
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900">
                  {activity.title}
                </h4>
                <p className="text-xs text-gray-500">
                  {activity.description}
                </p>
              </div>
              <div className="text-xs text-gray-500">
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
