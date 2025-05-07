
import { useState } from 'react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, CheckCircle, XCircle, CreditCard, Plus } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { GatewayConfigurationModal } from '@/components/admin/payments/GatewayConfigurationModal';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { ConfirmationDialog } from '@/components/admin/payments/ConfirmationDialog';

// Mock payment gateway data
const paymentGatewaysData = [
  {
    id: '1',
    name: 'Credit Card Processing',
    provider: 'Stripe',
    fee: '2.9% + $0.30 per transaction',
    isEnabled: true,
    supportedCards: ['Visa', 'Mastercard', 'American Express', 'Discover'],
    description: 'Process all major credit cards with our primary payment gateway.',
    apiKey: 'pk_test_51MERKfD2EFZ',
    secretKey: 'sk_test_51MERKfD2EFZ',
    webhookUrl: 'https://uptowngym.rw/api/webhooks/stripe',
    webhookSecret: 'whsec_12345',
    testMode: false
  },
  {
    id: '2',
    name: 'Direct Debit / ACH',
    provider: 'Plaid',
    fee: '0.8% per transaction (capped at $5)',
    isEnabled: true,
    supportedCards: [],
    description: 'Allow members to connect their bank accounts for direct payments.',
    apiKey: 'client_id_12345',
    secretKey: 'secret_67890',
    webhookUrl: 'https://uptowngym.rw/api/webhooks/plaid',
    webhookSecret: 'webhook_secret_12345',
    testMode: true
  },
  {
    id: '3',
    name: 'Mobile Payments',
    provider: 'Apple Pay / Google Pay',
    fee: '2.5% per transaction',
    isEnabled: true,
    supportedCards: [],
    description: 'Enable contactless payments using mobile devices.',
    apiKey: 'merchant_id_12345',
    secretKey: 'merchant_secret_67890',
    webhookUrl: '',
    webhookSecret: '',
    testMode: false
  },
  {
    id: '4',
    name: 'PayPal',
    provider: 'PayPal',
    fee: '3.49% + $0.49 per transaction',
    isEnabled: false,
    supportedCards: [],
    description: 'Allow members to pay using their PayPal account.',
    apiKey: 'client_id_12345',
    secretKey: 'client_secret_67890',
    webhookUrl: 'https://uptowngym.rw/api/webhooks/paypal',
    webhookSecret: 'webhook_id_12345',
    testMode: false
  },
  {
    id: '5',
    name: 'In-Person Terminal',
    provider: 'Square',
    fee: '2.6% + $0.10 per transaction',
    isEnabled: true,
    supportedCards: ['Visa', 'Mastercard', 'American Express', 'Discover'],
    description: 'Process payments at the front desk using our card terminals.',
    apiKey: 'square_app_id_12345',
    secretKey: 'square_app_secret_67890',
    webhookUrl: '',
    webhookSecret: '',
    testMode: false
  },
  {
    id: '6',
    name: 'Cryptocurrency',
    provider: 'Coinbase Commerce',
    fee: '1% per transaction',
    isEnabled: false,
    supportedCards: [],
    description: 'Accept payments in Bitcoin, Ethereum, and other cryptocurrencies.',
    apiKey: 'api_key_12345',
    secretKey: 'api_secret_67890',
    webhookUrl: 'https://uptowngym.rw/api/webhooks/coinbase',
    webhookSecret: 'webhook_secret_12345',
    testMode: true
  }
];

const PaymentMethods = () => {
  const isMobile = useIsMobile();
  const [gateways, setGateways] = useState(paymentGatewaysData);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState<any>(null);

  const toggleGateway = (id: string) => {
    setGateways(gateways.map(gateway => 
      gateway.id === id 
        ? { ...gateway, isEnabled: !gateway.isEnabled } 
        : gateway
    ));

    const gateway = gateways.find(g => g.id === id);
    if (gateway) {
      toast.success(
        `${gateway.name} has been ${gateway.isEnabled ? 'disabled' : 'enabled'}`,
        { id: `toggle-gateway-${id}` }
      );
    }
  };

  const openConfigModal = (gateway: any) => {
    setSelectedGateway(gateway);
    setIsConfigModalOpen(true);
  };

  const openAddModal = () => {
    setSelectedGateway(null);
    setIsAddModalOpen(true);
  };

  const confirmDelete = (gateway: any) => {
    setSelectedGateway(gateway);
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteGateway = () => {
    if (selectedGateway) {
      setGateways(gateways.filter(gateway => gateway.id !== selectedGateway.id));
      toast.success(`${selectedGateway.name} has been deleted`);
      setIsDeleteConfirmOpen(false);
    }
  };

  const handleSaveGateway = (updatedGateway: any) => {
    const existingIndex = gateways.findIndex(gateway => gateway.id === updatedGateway.id);
    
    if (existingIndex !== -1) {
      // Update existing gateway
      const updatedGateways = [...gateways];
      updatedGateways[existingIndex] = updatedGateway;
      setGateways(updatedGateways);
    } else {
      // Add new gateway
      setGateways([...gateways, updatedGateway]);
    }
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
        <Button variant="default" onClick={openAddModal}>
          <Plus className="mr-2 h-4 w-4" /> Add Payment Gateway
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {gateways.map((gateway) => (
          <Card key={gateway.id} className={gateway.isEnabled ? "" : "opacity-75"}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-gym-orange" />
                    {gateway.name}
                  </CardTitle>
                  <p className="text-sm text-gray-500">Provider: {gateway.provider}</p>
                </div>
                <Switch
                  checked={gateway.isEnabled}
                  onCheckedChange={() => toggleGateway(gateway.id)}
                  aria-label={`${gateway.isEnabled ? 'Disable' : 'Enable'} ${gateway.name}`}
                />
              </div>
              
              {gateway.isEnabled && gateway.testMode && (
                <div className="mt-2">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                    Test Mode
                  </span>
                </div>
              )}
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm mb-1">Transaction Fee:</p>
                  <p className="font-medium">{gateway.fee}</p>
                </div>
                
                {gateway.supportedCards.length > 0 && (
                  <div>
                    <p className="text-sm mb-1">Supported Cards:</p>
                    <div className="flex flex-wrap gap-2">
                      {gateway.supportedCards.map((card, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          {card}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <p className="text-sm text-gray-600">{gateway.description}</p>
                
                <div className="flex items-center justify-between pt-2">
                  {gateway.isEnabled ? (
                    <span className="text-green-600 text-sm flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" /> Active
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm flex items-center">
                      <XCircle className="h-4 w-4 mr-1" /> Disabled
                    </span>
                  )}
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="gap-2"
                      onClick={() => confirmDelete(gateway)}
                    >
                      Delete
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="gap-2"
                      onClick={() => openConfigModal(gateway)}
                    >
                      <Pencil className="h-4 w-4" /> Configure
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Configuration Modal */}
      <GatewayConfigurationModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        onSave={handleSaveGateway}
        gateway={selectedGateway}
      />

      {/* Add Gateway Modal */}
      <GatewayConfigurationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveGateway}
        isNew={true}
      />

      {/* Delete Confirmation */}
      <ConfirmationDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDeleteGateway}
        title="Delete Payment Gateway"
        description={`Are you sure you want to delete "${selectedGateway?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="destructive"
      />
    </div>
  );
};

export default PaymentMethods;
