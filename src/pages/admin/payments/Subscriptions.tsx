
import { useState } from 'react';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Pencil, Pause, X, Users } from 'lucide-react';

// Mock subscription data
const subscriptionPlans = [
  {
    id: '1',
    name: 'Basic Membership',
    billingCycle: 'Monthly',
    price: '$29.99',
    status: 'Active',
    memberCount: 156,
    features: ['Gym Access', 'Basic Equipment', 'Locker Room']
  },
  {
    id: '2',
    name: 'Premium Membership',
    billingCycle: 'Monthly',
    price: '$49.99',
    status: 'Active',
    memberCount: 89,
    features: ['Full Gym Access', 'Group Classes', 'Personal Trainer (1x/month)']
  },
  {
    id: '3',
    name: 'Family Plan',
    billingCycle: 'Annual',
    price: '$899.99',
    status: 'Active',
    memberCount: 34,
    features: ['Access for 4 Family Members', 'Group Classes', 'Pool & Spa']
  },
  {
    id: '4',
    name: 'Student Discount',
    billingCycle: 'Semester',
    price: '$199.99',
    status: 'Paused',
    memberCount: 127,
    features: ['Valid Student ID Required', 'Gym Access', 'Study Area']
  },
  {
    id: '5',
    name: 'Corporate Partnership',
    billingCycle: 'Annual',
    price: 'Custom',
    status: 'Active',
    memberCount: 213,
    features: ['Bulk Discounts', '24/7 Access', 'Dedicated Support']
  }
];

const Subscriptions = () => {
  const [plans, setPlans] = useState(subscriptionPlans);

  const togglePlanStatus = (id: string) => {
    setPlans(plans.map(plan => 
      plan.id === id 
        ? { ...plan, status: plan.status === 'Active' ? 'Paused' : 'Active' } 
        : plan
    ));
  };

  // Status badges with appropriate colors
  const StatusBadge = ({ status }: { status: string }) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
      status === 'Active' ? 'bg-green-100 text-green-800' : 
      status === 'Paused' ? 'bg-yellow-100 text-yellow-800' : 
      'bg-red-100 text-red-800'
    }`}>
      {status === 'Active' && <Check className="h-3 w-3 mr-1" />}
      {status === 'Paused' && <Pause className="h-3 w-3 mr-1" />}
      {status === 'Cancelled' && <X className="h-3 w-3 mr-1" />}
      {status}
    </span>
  );

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/payments">Payments</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Subscriptions</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Subscription Plans</h1>
        <Button variant="default">
          Add New Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{plan.name}</CardTitle>
                <StatusBadge status={plan.status} />
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="text-sm text-gray-500">{plan.billingCycle}</div>
                <div className="text-xl font-bold">{plan.price}</div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-4">
                <div className="text-sm space-y-2">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center mt-4">
                  <Users className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-sm text-gray-500">{plan.memberCount} members</span>
                </div>
              </div>
            </CardContent>
            <div className="p-4 pt-0 border-t mt-auto">
              <div className="flex space-x-2 justify-between">
                <Button size="sm" variant="outline">
                  <Pencil className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => togglePlanStatus(plan.id)}
                >
                  {plan.status === 'Active' ? (
                    <><Pause className="h-4 w-4 mr-1" /> Pause</>
                  ) : (
                    <><Check className="h-4 w-4 mr-1" /> Activate</>
                  )}
                </Button>
                <Button size="sm" variant="outline">
                  <Users className="h-4 w-4 mr-1" /> Members
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
