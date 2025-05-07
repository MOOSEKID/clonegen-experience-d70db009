
import { useState } from 'react';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Plus, CreditCard, Settings, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { GatewayConfigurationModal } from '@/components/admin/payments/GatewayConfigurationModal';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock payment methods data
const mockPaymentMethods = [
  {
    id: '1',
    name: 'Credit Card',
    description: 'Accept credit and debit card payments directly on your site.',
    status: 'Active',
    icon: <CreditCard className="h-8 w-8" />,
    provider: 'Stripe',
    fees: '2.9% + RWF 300 per transaction',
    setupComplete: true,
  },
  {
    id: '2',
    name: 'PayPal',
    description: 'Let customers pay via PayPal.',
    status: 'Inactive',
    icon: <CreditCard className="h-8 w-8" />,
    provider: 'PayPal',
    fees: '3.4% + RWF 400 per transaction',
    setupComplete: false,
  },
  {
    id: '3',
    name: 'Bank Transfer',
    description: 'Allow customers to pay via bank transfer.',
    status: 'Active',
    icon: <CreditCard className="h-8 w-8" />,
    provider: 'Manual',
    fees: 'No fees',
    setupComplete: true,
  },
  {
    id: '4',
    name: 'Mobile Money',
    description: 'Accept payments via MTN Mobile Money and Airtel Money.',
    status: 'Inactive',
    icon: <CreditCard className="h-8 w-8" />,
    provider: 'MTN/Airtel API',
    fees: '1.5% per transaction',
    setupComplete: false,
  },
];

const Methods = () => {
  const [paymentMethods, setPaymentMethods] = useState(mockPaymentMethods);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<any>(null);
  const isMobile = useIsMobile();

  const handleToggleStatus = (id: string) => {
    setPaymentMethods(methods => 
      methods.map(method => 
        method.id === id 
          ? { ...method, status: method.status === 'Active' ? 'Inactive' : 'Active' } 
          : method
      )
    );
    
    const method = paymentMethods.find(m => m.id === id);
    if (method) {
      toast.success(`${method.name} payment method ${method.status === 'Active' ? 'disabled' : 'enabled'}`);
    }
  };
  
  const handleConfigureMethod = (method: any) => {
    setSelectedMethod(method);
    setIsConfigModalOpen(true);
  };
  
  const handleSaveConfiguration = (data: any) => {
    // In a real app, this would update the payment method configuration
    console.log('Saved configuration for', selectedMethod?.name, data);
    
    // Update the payment method
    setPaymentMethods(methods => 
      methods.map(method => 
        method.id === selectedMethod?.id 
          ? { ...method, ...data, setupComplete: true } 
          : method
      )
    );
    
    toast.success(`${selectedMethod?.name} configuration updated`);
  };
  
  const handleAddGateway = () => {
    setSelectedMethod(null);
    setIsConfigModalOpen(true);
  };

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
            <BreadcrumbPage>Payment Methods</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Payment Methods</h1>
        <Button onClick={handleAddGateway}>
          <Plus className="h-4 w-4 mr-2" /> Add Gateway
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentMethods.map((method) => (
          <Card key={method.id} className={method.status === 'Inactive' ? 'opacity-70' : ''}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-full">
                    {method.icon}
                  </div>
                  <div>
                    <CardTitle>{method.name}</CardTitle>
                    <CardDescription>{method.provider}</CardDescription>
                  </div>
                </div>
                <Switch 
                  checked={method.status === 'Active'} 
                  onCheckedChange={() => handleToggleStatus(method.id)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">{method.description}</p>
              <p className="text-xs text-gray-400">Fees: {method.fees}</p>
              <div className="mt-4 flex items-center">
                <Badge className={method.setupComplete ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
                  {method.setupComplete ? (
                    <>
                      <Check className="h-3 w-3 mr-1" /> Configuration Complete
                    </>
                  ) : 'Setup Required'}
                </Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => handleConfigureMethod(method)}
              >
                <Settings className="h-4 w-4 mr-2" /> Configure
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <GatewayConfigurationModal 
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        onSave={handleSaveConfiguration}
        paymentMethod={selectedMethod}
      />
    </div>
  );
};

export default Methods;
