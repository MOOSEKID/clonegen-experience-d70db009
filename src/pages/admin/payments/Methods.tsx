
import { useState } from 'react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, CheckCircle, XCircle } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

// Mock payment gateway data
const paymentGatewaysData = [
  {
    id: '1',
    name: 'Credit Card Processing',
    provider: 'Stripe',
    fee: '2.9% + $0.30 per transaction',
    isEnabled: true,
    supportedCards: ['Visa', 'Mastercard', 'American Express', 'Discover'],
    description: 'Process all major credit cards with our primary payment gateway.'
  },
  {
    id: '2',
    name: 'Direct Debit / ACH',
    provider: 'Plaid',
    fee: '0.8% per transaction (capped at $5)',
    isEnabled: true,
    supportedCards: [],
    description: 'Allow members to connect their bank accounts for direct payments.'
  },
  {
    id: '3',
    name: 'Mobile Payments',
    provider: 'Apple Pay / Google Pay',
    fee: '2.5% per transaction',
    isEnabled: true,
    supportedCards: [],
    description: 'Enable contactless payments using mobile devices.'
  },
  {
    id: '4',
    name: 'PayPal',
    provider: 'PayPal',
    fee: '3.49% + $0.49 per transaction',
    isEnabled: false,
    supportedCards: [],
    description: 'Allow members to pay using their PayPal account.'
  },
  {
    id: '5',
    name: 'In-Person Terminal',
    provider: 'Square',
    fee: '2.6% + $0.10 per transaction',
    isEnabled: true,
    supportedCards: ['Visa', 'Mastercard', 'American Express', 'Discover'],
    description: 'Process payments at the front desk using our card terminals.'
  },
  {
    id: '6',
    name: 'Cryptocurrency',
    provider: 'Coinbase Commerce',
    fee: '1% per transaction',
    isEnabled: false,
    supportedCards: [],
    description: 'Accept payments in Bitcoin, Ethereum, and other cryptocurrencies.'
  }
];

const PaymentMethods = () => {
  const [gateways, setGateways] = useState(paymentGatewaysData);

  const toggleGateway = (id: string) => {
    setGateways(gateways.map(gateway => 
      gateway.id === id 
        ? { ...gateway, isEnabled: !gateway.isEnabled } 
        : gateway
    ));
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
        <Button variant="default">
          Add Payment Gateway
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {gateways.map((gateway) => (
          <Card key={gateway.id} className={gateway.isEnabled ? "" : "opacity-75"}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{gateway.name}</CardTitle>
                <Switch
                  checked={gateway.isEnabled}
                  onCheckedChange={() => toggleGateway(gateway.id)}
                />
              </div>
              <p className="text-sm text-gray-500">Provider: {gateway.provider}</p>
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
                
                <div className="flex items-center pt-2">
                  {gateway.isEnabled ? (
                    <span className="text-green-600 text-sm flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" /> Active
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm flex items-center">
                      <XCircle className="h-4 w-4 mr-1" /> Disabled
                    </span>
                  )}
                  <Button className="ml-auto" size="sm" variant="outline">
                    <Pencil className="h-4 w-4 mr-1" /> Configure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
