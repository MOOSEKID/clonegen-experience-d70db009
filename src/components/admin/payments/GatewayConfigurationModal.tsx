
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { GatewayForm } from './modal/GatewayForm';
import { GatewayConfigurationModalProps } from './modal/GatewayTypes';

export const GatewayConfigurationModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  gateway, 
  isNew = false 
}: GatewayConfigurationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isNew ? 'Add Payment Gateway' : 'Configure Payment Gateway'}</DialogTitle>
        </DialogHeader>
        
        <GatewayForm 
          gateway={gateway}
          isNew={isNew}
          onSave={onSave}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};
