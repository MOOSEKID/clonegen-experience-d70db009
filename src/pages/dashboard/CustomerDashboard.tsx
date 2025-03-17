
import { useState } from 'react';
import { 
  Activity, Calendar, Dumbbell, User, 
  CreditCard, Bell, Settings, BarChart 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useUserProfile } from '@/hooks/useUserProfile';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { userProfile, isLoading } = useUserProfile();
  const navigate = useNavigate();
  
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gym-orange"></div>
      </div>
    );
  }
  
  if (!userProfile) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <User className="h-16 w-16 text-gym-orange mb-4" />
        <h2 className="text-2xl font-bold mb-2">Profile Not Found</h2>
        <p className="text-gray-600 mb-6">
          We couldn't find your profile information. Please complete your profile setup.
        </p>
        <Button 
          className="bg-gym-orange hover:bg-gym-orange/90"
          onClick={() => navigate('/dashboard/profile')}
        >
          Complete Profile
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {userProfile.full_name || 'Member'}</h1>
          <p className="text-gray-500">Here's what's happening with your fitness journey</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/notifications')}>
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button 
            className="bg-gym-orange hover:bg-gym-orange/90" 
            size="sm"
            onClick={() => navigate('/dashboard/schedule')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Class
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Next Class</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">HIIT Training</p>
                <p className="text-sm text-gray-500">Today, 6:00 PM</p>
              </div>
              <div className="bg-gym-orange/10 p-2 rounded-full">
                <Dumbbell className="h-6 w-6 text-gym-orange" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Membership Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">Premium</p>
                <p className="text-sm text-gray-500">Valid until Dec 31, 2023</p>
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Workout Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">12 Sessions</p>
                <p className="text-sm text-gray-500">This month</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schedule">My Schedule</TabsTrigger>
          <TabsTrigger value="progress">My Progress</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fitness Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                <div className="text-center p-6">
                  <BarChart className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <h3 className="text-lg font-medium mb-1">Activity Data Coming Soon</h3>
                  <p className="text-gray-500">
                    Start tracking your workouts to see your progress here.
                  </p>
                  <Button className="mt-4 bg-gym-orange hover:bg-gym-orange/90">
                    Log a Workout
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">Yoga Flow</p>
                      <p className="text-sm text-gray-500">Monday, 10:00 AM</p>
                    </div>
                    <span className="text-green-600 text-sm font-medium">Attended</span>
                  </li>
                  <li className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">Spin Class</p>
                      <p className="text-sm text-gray-500">Wednesday, 6:00 PM</p>
                    </div>
                    <span className="text-green-600 text-sm font-medium">Attended</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">HIIT Training</p>
                      <p className="text-sm text-gray-500">Friday, 7:00 PM</p>
                    </div>
                    <span className="text-orange-600 text-sm font-medium">Upcoming</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>My Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Dumbbell className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-medium">Strength Training</p>
                        <span className="text-sm font-medium">70%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Activity className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-medium">Cardio</p>
                        <span className="text-sm font-medium">50%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Settings className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <p className="font-medium">Flexibility</p>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-4">
                  Update Goals
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>My Upcoming Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-10">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <h3 className="text-lg font-medium mb-1">No Upcoming Classes</h3>
                <p className="text-gray-500 mb-4">
                  You haven't booked any classes yet. Browse our schedule and join a class.
                </p>
                <Button 
                  className="bg-gym-orange hover:bg-gym-orange/90"
                  onClick={() => navigate('/dashboard/schedule')}
                >
                  Browse Classes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>My Fitness Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-10">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <h3 className="text-lg font-medium mb-1">No Progress Data Yet</h3>
                <p className="text-gray-500 mb-4">
                  Start tracking your workouts and measurements to see your progress over time.
                </p>
                <Button className="bg-gym-orange hover:bg-gym-orange/90">
                  Start Tracking
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing & Membership</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Current Plan</h3>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">Premium Membership</p>
                    <span className="bg-green-100 text-green-600 text-xs font-medium py-1 px-2 rounded">
                      Active
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-2">
                    Unlimited access to all facilities and classes
                  </p>
                  <div className="flex justify-between items-center text-sm">
                    <span>RWF 50,000/month</span>
                    <span>Renews on Dec 31, 2023</span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-2">Payment History</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y">
                    <tr>
                      <td className="px-4 py-3 text-sm">Nov 30, 2023</td>
                      <td className="px-4 py-3 text-sm">Premium Membership - Monthly</td>
                      <td className="px-4 py-3 text-sm">RWF 50,000</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="bg-green-100 text-green-600 text-xs font-medium py-0.5 px-2 rounded-full">
                          Paid
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">Oct 31, 2023</td>
                      <td className="px-4 py-3 text-sm">Premium Membership - Monthly</td>
                      <td className="px-4 py-3 text-sm">RWF 50,000</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="bg-green-100 text-green-600 text-xs font-medium py-0.5 px-2 rounded-full">
                          Paid
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 mt-6">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => navigate('/dashboard/membership')}
                >
                  Change Plan
                </Button>
                <Button 
                  className="flex-1 bg-gym-orange hover:bg-gym-orange/90"
                  onClick={() => navigate('/dashboard/payment-methods')}
                >
                  Payment Methods
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerDashboard;
