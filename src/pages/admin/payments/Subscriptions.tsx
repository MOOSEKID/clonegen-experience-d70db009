
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
import { Check, Pencil, Pause, X, Users, Link as LinkIcon } from 'lucide-react';
import { EditPlanDialog } from '@/components/admin/payments/EditPlanDialog';
import { PlanMembersDialog } from '@/components/admin/payments/PlanMembersDialog';
import { ConfirmationDialog } from '@/components/admin/payments/ConfirmationDialog';
import { toast } from 'sonner';

// Mock subscription data
const subscriptionPlansData = [
  {
    id: '1',
    name: 'Basic Membership',
    billingCycle: 'Monthly',
    price: '$29.99',
    status: 'Active',
    memberCount: 156,
    features: ['Gym Access', 'Basic Equipment', 'Locker Room'],
    planId: 'basic-monthly'
  },
  {
    id: '2',
    name: 'Premium Membership',
    billingCycle: 'Monthly',
    price: '$49.99',
    status: 'Active',
    memberCount: 89,
    features: ['Full Gym Access', 'Group Classes', 'Personal Trainer (1x/month)'],
    planId: 'premium-monthly'
  },
  {
    id: '3',
    name: 'Family Plan',
    billingCycle: 'Annual',
    price: '$899.99',
    status: 'Active',
    memberCount: 34,
    features: ['Access for 4 Family Members', 'Group Classes', 'Pool & Spa'],
    planId: 'family-annual'
  },
  {
    id: '4',
    name: 'Student Discount',
    billingCycle: 'Semester',
    price: '$199.99',
    status: 'Paused',
    memberCount: 127,
    features: ['Valid Student ID Required', 'Gym Access', 'Study Area'],
    planId: 'student-semester'
  },
  {
    id: '5',
    name: 'Corporate Partnership',
    billingCycle: 'Annual',
    price: 'Custom',
    status: 'Active',
    memberCount: 213,
    features: ['Bulk Discounts', '24/7 Access', 'Dedicated Support'],
    planId: 'corporate-annual'
  }
];

const Subscriptions = () => {
  const [plans, setPlans] = useState(subscriptionPlansData);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
  const [isPauseConfirmOpen, setIsPauseConfirmOpen] = useState(false);

  const togglePlanStatus = (id: string) => {
    setPlans(plans.map(plan => 
      plan.id === id 
        ? { ...plan, status: plan.status === 'Active' ? 'Paused' : 'Active' } 
        : plan
    ));
    // Close the confirmation dialog
    setIsPauseConfirmOpen(false);
    // Show toast notification
    const plan = plans.find(p => p.id === id);
    if (plan) {
      toast.success(`${plan.name} has been ${plan.status === 'Active' ? 'paused' : 'activated'}`);
    }
  };

  const openEditModal = (plan: any) => {
    setEditingPlan(plan);
    setIsEditModalOpen(true);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const openMembersModal = (plan: any) => {
    setSelectedPlan(plan);
    setIsMembersModalOpen(true);
  };

  const openPauseConfirm = (plan: any) => {
    setSelectedPlan(plan);
    setIsPauseConfirmOpen(true);
  };

  const handleSavePlan = (data: any) => {
    if (editingPlan) {
      // Update existing plan
      setPlans(plans.map(plan => 
        plan.id === editingPlan.id 
          ? { ...plan, ...data } 
          : plan
      ));
    } else {
      // Add new plan
      const newPlan = {
        id: Date.now().toString(),
        ...data,
        status: 'Active',
        memberCount: 0
      };
      setPlans([...plans, newPlan]);
    }
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
        <Button variant="default" onClick={openAddModal}>
          Add New Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className={`flex flex-col ${plan.status !== 'Active' ? 'opacity-75' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.planId && (
                    <div className="flex items-center text-xs text-gray-500">
                      <LinkIcon className="h-3 w-3 mr-1" />
                      <span>{plan.planId}</span>
                    </div>
                  )}
                </div>
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
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => openEditModal(plan)}
                >
                  <Pencil className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => openPauseConfirm(plan)}
                >
                  {plan.status === 'Active' ? (
                    <><Pause className="h-4 w-4 mr-1" /> Pause</>
                  ) : (
                    <><Check className="h-4 w-4 mr-1" /> Activate</>
                  )}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => openMembersModal(plan)}
                >
                  <Users className="h-4 w-4 mr-1" /> Members
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Plan Modal */}
      <EditPlanDialog
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSavePlan}
        plan={editingPlan}
      />

      {/* Add Plan Modal */}
      <EditPlanDialog
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSavePlan}
        plan={undefined}
      />

      {/* View Members Modal */}
      {selectedPlan && (
        <PlanMembersDialog
          isOpen={isMembersModalOpen}
          onClose={() => setIsMembersModalOpen(false)}
          planName={selectedPlan.name}
          planId={selectedPlan.id}
        />
      )}

      {/* Pause/Activate Confirmation */}
      {selectedPlan && (
        <ConfirmationDialog
          isOpen={isPauseConfirmOpen}
          onClose={() => setIsPauseConfirmOpen(false)}
          onConfirm={() => togglePlanStatus(selectedPlan.id)}
          title={selectedPlan.status === 'Active' ? 'Pause Plan' : 'Activate Plan'}
          description={
            selectedPlan.status === 'Active'
              ? `Are you sure you want to pause the "${selectedPlan.name}" plan? This will prevent new members from subscribing to it.`
              : `Are you sure you want to activate the "${selectedPlan.name}" plan? This will make it available for new subscriptions.`
          }
          confirmLabel={selectedPlan.status === 'Active' ? 'Pause' : 'Activate'}
        />
      )}
    </div>
  );
};

export default Subscriptions;
