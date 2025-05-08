
import React from 'react';

export interface PaymentGateway {
  id: string;
  name: string;
  provider: string;
  fee: string;
  isEnabled: boolean;
  supportedCards: string[];
  description: string;
  apiKey?: string;
  secretKey?: string;
  webhookUrl?: string;
  webhookSecret?: string;
  testMode?: boolean;
  customFields?: Record<string, string>;
}

export interface GatewayConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PaymentGateway) => void;
  gateway?: PaymentGateway | null;
  isNew?: boolean;
}
