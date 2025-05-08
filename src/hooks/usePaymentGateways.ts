
import { useState, useEffect } from 'react';
import { PaymentGateway } from '@/types/classTypes';
import { CreditCard } from 'lucide-react';
import React from 'react';

// Mock payment methods data for initial state
const initialPaymentMethods: PaymentGateway[] = [
  {
    id: '1',
    name: 'Credit Card',
    description: 'Accept credit and debit card payments directly on your site.',
    status: 'Active',
    icon: React.createElement(CreditCard, { className: "h-8 w-8" }),
    provider: 'Stripe',
    fees: '2.9% + RWF 300 per transaction',
    setupComplete: true,
    fee: '2.9% + RWF 300',
    isEnabled: true,
    supportedCards: ['visa', 'mastercard', 'amex']
  },
  {
    id: '2',
    name: 'PayPal',
    description: 'Let customers pay via PayPal.',
    status: 'Inactive',
    icon: React.createElement(CreditCard, { className: "h-8 w-8" }),
    provider: 'PayPal',
    fees: '3.4% + RWF 400 per transaction',
    setupComplete: false,
    fee: '3.4% + RWF 400',
    isEnabled: false,
    supportedCards: ['paypal']
  },
  {
    id: '3',
    name: 'Bank Transfer',
    description: 'Allow customers to pay via bank transfer.',
    status: 'Active',
    icon: React.createElement(CreditCard, { className: "h-8 w-8" }),
    provider: 'Manual',
    fees: 'No fees',
    setupComplete: true,
    fee: 'No fees',
    isEnabled: true,
    supportedCards: []
  },
  {
    id: '4',
    name: 'Mobile Money',
    description: 'Accept payments via MTN Mobile Money and Airtel Money.',
    status: 'Inactive',
    icon: React.createElement(CreditCard, { className: "h-8 w-8" }),
    provider: 'MTN/Airtel API',
    fees: '1.5% per transaction',
    setupComplete: false,
    fee: '1.5%',
    isEnabled: false,
    supportedCards: []
  },
];

// Serialize PaymentGateway objects for localStorage
const serializeGateways = (gateways: PaymentGateway[]): string => {
  const serializable = gateways.map(gateway => ({
    ...gateway,
    // Convert React elements to string indicators
    icon: 'CreditCard', // We'll recreate the icon when deserializing
  }));
  return JSON.stringify(serializable);
};

// Deserialize PaymentGateway objects from localStorage
const deserializeGateways = (data: string): PaymentGateway[] => {
  try {
    const parsed = JSON.parse(data);
    return parsed.map((gateway: any) => ({
      ...gateway,
      // Recreate the React element icons
      icon: React.createElement(CreditCard, { className: "h-8 w-8" }),
    }));
  } catch (e) {
    console.error('Error deserializing payment gateways', e);
    return initialPaymentMethods;
  }
};

export const usePaymentGateways = () => {
  // Initialize state with data from localStorage or default to initialPaymentMethods
  const [paymentMethods, setPaymentMethods] = useState<PaymentGateway[]>(() => {
    const saved = localStorage.getItem('paymentGateways');
    if (saved) {
      return deserializeGateways(saved);
    }
    return initialPaymentMethods;
  });

  // Update localStorage whenever paymentMethods changes
  useEffect(() => {
    localStorage.setItem('paymentGateways', serializeGateways(paymentMethods));
  }, [paymentMethods]);

  // Function to add a new payment gateway
  const addPaymentGateway = (gateway: PaymentGateway) => {
    setPaymentMethods(prev => [...prev, gateway]);
  };

  // Function to update an existing payment gateway
  const updatePaymentGateway = (id: string, updates: Partial<PaymentGateway>) => {
    setPaymentMethods(prev => 
      prev.map(gateway => 
        gateway.id === id ? { ...gateway, ...updates } : gateway
      )
    );
  };

  // Function to toggle gateway status
  const toggleGatewayStatus = (id: string) => {
    setPaymentMethods(prev => 
      prev.map(gateway => 
        gateway.id === id 
          ? { 
              ...gateway, 
              status: gateway.status === 'Active' ? 'Inactive' : 'Active',
              isEnabled: gateway.status !== 'Active'
            } 
          : gateway
      )
    );
  };

  return { 
    paymentMethods, 
    setPaymentMethods, 
    addPaymentGateway, 
    updatePaymentGateway,
    toggleGatewayStatus
  };
};
