
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
import { PaymentGateway } from '@/types/classTypes';
import { usePaymentGateways } from '@/hooks/usePaymentGateways';

const Methods = () => {
  const { 
    paymentMethods, 
    toggleGatewayStatus, 
    addPaymentGateway, 
    updatePaymentGateway 
  } = usePaymentGateways();
  
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentGateway | null>(null);
  const isMobile = useIsMobile();

  const handleToggleStatus = (id: string) => {
    toggleGatewayStatus(id);
    
    const method = paymentMethods.find(m => m.id === id);
    if (method) {
      toast.success(`${method.name} payment method ${method.status === 'Active' ? 'disabled' : 'enabled'}`);
    }
  };
  
  const handleConfigureMethod = (method: PaymentGateway) => {
    setSelectedMethod(method);
    setIsConfigModalOpen(true);
  };
  
  const handleSaveConfiguration = (data: any) => {
    // Determine if we're adding a new gateway or updating an existing one
    const isNewGateway = selectedMethod === null;
    
    // For a new gateway, create a complete gateway object with all required properties
    if (isNewGateway) {
      const newGateway: PaymentGateway = {
        id: Date.now().toString(), // Generate a unique ID
        name: data.name,
        description: data.description,
        provider: data.provider,
        status: data.isEnabled ? 'Active' : 'Inactive',
        icon: <CreditCard className="h-8 w-8" />, // Default icon
        setupComplete: true, // Mark as complete since user just configured it
        fee: data.fee,
        fees: `${data.fee} per transaction`, // Format fees for display
        isEnabled: data.isEnabled,
        supportedCards: data.supportedCards || []
      };
      
      // Add the new gateway using the custom hook function
      addPaymentGateway(newGateway);
      toast.success(`${data.name} payment gateway added`);
    } else {
      // Update existing gateway
      updatePaymentGateway(selectedMethod!.id, {
        ...data,
        status: data.isEnabled ? 'Active' : 'Inactive',
        fees: `${data.fee} per transaction`, // Format fees for display
        setupComplete: true
      });
      
      toast.success(`${selectedMethod?.name} configuration updated`);
    }
    
    // Close the modal
    setIsConfigModalOpen(false);
    setSelectedMethod(null);
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
        gateway={selectedMethod}
        isNew={selectedMethod === null}
      />
    </div>
  );
};

export default Methods;
