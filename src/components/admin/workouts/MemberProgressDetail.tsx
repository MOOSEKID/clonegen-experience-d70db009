
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Send, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

interface MemberProgressDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: {
    id: number;
    name: string;
    programName: string;
    progress: number;
    lastActivity: string;
  } | null;
}

// Mock progress data
const progressData = [
  { week: 'Week 1', completion: 15, weight: 185 },
  { week: 'Week 2', completion: 32, weight: 184 },
  { week: 'Week 3', completion: 45, weight: 182 },
  { week: 'Week 4', completion: 62, weight: 180 },
  { week: 'Week 5', completion: 78, weight: 178 },
  { week: 'Week 6', completion: 78, weight: 176 },
];

const completedWorkouts = [
  { id: 1, name: 'Upper Body Strength', date: '2023-05-01', duration: '45 min', completion: 100 },
  { id: 2, name: 'HIIT Cardio', date: '2023-05-03', duration: '30 min', completion: 100 },
  { id: 3, name: 'Lower Body Focus', date: '2023-05-05', duration: '50 min', completion: 85 },
  { id: 4, name: 'Upper Body Strength', date: '2023-05-08', duration: '45 min', completion: 90 },
  { id: 5, name: 'Core Workout', date: '2023-05-10', duration: '25 min', completion: 100 },
];

const MemberProgressDetail = ({ open, onOpenChange, member }: MemberProgressDetailProps) => {
  const [message, setMessage] = React.useState('');
  const [couponCode, setCouponCode] = React.useState('');

  if (!member) return null;

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error('Please enter a message');
      return;
    }
    
    toast.success(`Message sent to ${member.name}`);
    setMessage('');
  };

  const handleSendCoupon = () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }
    
    toast.success(`Coupon ${couponCode} sent to ${member.name}`);
    setCouponCode('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Member Progress Detail</DialogTitle>
          <DialogDescription>
            Detailed progress information for {member.name}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div>
              <h2 className="text-xl font-bold">{member.name}</h2>
              <p className="text-gray-500">Program: {member.programName}</p>
              <p className="text-gray-500">Last active: {member.lastActivity}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="text-sm font-medium">Overall Progress:</div>
                <Badge 
                  variant="outline"
                  className={
                    member.progress >= 80 ? 'bg-green-100 text-green-800' : 
                    member.progress >= 50 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }
                >
                  {member.progress}%
                </Badge>
              </div>
              <div className="bg-gray-200 h-2 w-full rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    member.progress >= 80 ? 'bg-green-500' : 
                    member.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${member.progress}%` }}
                />
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Progress Overview</TabsTrigger>
              <TabsTrigger value="workouts">Completed Workouts</TabsTrigger>
              <TabsTrigger value="message">Send Message</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="pt-4">
              <div className="h-[300px] mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="week" />
                    <YAxis yAxisId="left" orientation="left" domain={[0, 100]} />
                    <YAxis yAxisId="right" orientation="right" domain={['auto', 'auto']} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="completion" 
                      stroke="#3b82f6" 
                      name="Completion (%)" 
                      activeDot={{ r: 8 }}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="weight" 
                      stroke="#10b981" 
                      name="Weight (lbs)" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Goals</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-1">Weight Loss</h4>
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-200 h-2 flex-grow rounded-full overflow-hidden">
                        <div 
                          className="bg-green-500 h-full rounded-full"
                          style={{ width: '60%' }}
                        />
                      </div>
                      <span className="text-sm">60%</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Target: 165 lbs</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-1">Strength Increase</h4>
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-200 h-2 flex-grow rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-500 h-full rounded-full"
                          style={{ width: '45%' }}
                        />
                      </div>
                      <span className="text-sm">45%</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Target: 225 lbs bench press</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="workouts" className="pt-4">
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workout</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {completedWorkouts.map(workout => (
                      <tr key={workout.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{workout.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(workout.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {workout.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="bg-gray-200 h-2 w-16 rounded-full overflow-hidden">
                              <div 
                                className="bg-green-500 h-full"
                                style={{ width: `${workout.completion}%` }}
                              />
                            </div>
                            <span className="text-sm">{workout.completion}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Activity Timeline</h3>
                <div className="space-y-4">
                  {[
                    { date: 'Today', event: 'Completed Core Workout', type: 'workout' },
                    { date: '2 days ago', event: 'Updated weight: 176 lbs', type: 'measurement' },
                    { date: '3 days ago', event: 'Completed Upper Body Strength', type: 'workout' },
                    { date: '1 week ago', event: 'Set new goal: Run 5k in under 30 minutes', type: 'goal' },
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className={`w-3 h-3 mt-1.5 rounded-full ${
                        item.type === 'workout' ? 'bg-blue-500' :
                        item.type === 'measurement' ? 'bg-green-500' : 'bg-purple-500'
                      }`} />
                      <div>
                        <p className="text-sm text-gray-500">{item.date}</p>
                        <p>{item.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="message" className="pt-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Send Encouragement Message</h3>
                  <div className="space-y-4">
                    <Textarea 
                      placeholder="Write a message to encourage the member..."
                      className="min-h-[120px]"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                    />
                    <Button onClick={handleSendMessage} className="w-full sm:w-auto">
                      <MessageSquare className="h-4 w-4 mr-2" /> Send Message
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-semibold mb-2">Send Promotion or Coupon</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <Input 
                          placeholder="Enter coupon code or promotion..." 
                          value={couponCode}
                          onChange={e => setCouponCode(e.target.value)}
                        />
                      </div>
                      <Button onClick={handleSendCoupon}>
                        <Send className="h-4 w-4 mr-2" /> Send Coupon
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="cursor-pointer hover:bg-primary/80" onClick={() => setCouponCode('WORKOUT10')}>WORKOUT10 (10% off)</Badge>
                      <Badge className="cursor-pointer hover:bg-primary/80" onClick={() => setCouponCode('FREEPT')}>FREEPT (Free PT session)</Badge>
                      <Badge className="cursor-pointer hover:bg-primary/80" onClick={() => setCouponCode('SUMMER25')}>SUMMER25 (25% off)</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemberProgressDetail;
