
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PaymentGateway } from './GatewayTypes';
import { gatewayFormSchema, GatewayFormValues } from './GatewayFormSchema';
import { GeneralTab } from './tabs/GeneralTab';
import { FeesTab } from './tabs/FeesTab';
import { ApiKeysTab } from './tabs/ApiKeysTab';
import { WebhooksTab } from './tabs/WebhooksTab';
import { DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface GatewayFormProps {
  gateway?: PaymentGateway | null;
  isNew?: boolean;
  onSave: (data: PaymentGateway) => void;
  onClose: () => void;
}

export const GatewayForm = ({ gateway, isNew = false, onSave, onClose }: GatewayFormProps) => {
  const form = useForm<GatewayFormValues>({
    resolver: zodResolver(gatewayFormSchema),
    defaultValues: {
      name: gateway?.name || '',
      provider: gateway?.provider || '',
      fee: gateway?.fee || '',
      description: gateway?.description || '',
      isEnabled: gateway?.isEnabled ?? true,
      supportedCards: gateway?.supportedCards || [],
      apiKey: gateway?.apiKey || '',
      secretKey: gateway?.secretKey || '',
      webhookUrl: gateway?.webhookUrl || '',
      webhookSecret: gateway?.webhookSecret || '',
      testMode: gateway?.testMode ?? false,
      customFields: gateway?.customFields || {},
    },
  });
  
  React.useEffect(() => {
    if (gateway) {
      form.reset({
        name: gateway.name,
        provider: gateway.provider,
        fee: gateway.fee,
        description: gateway.description,
        isEnabled: gateway.isEnabled,
        supportedCards: gateway.supportedCards,
        apiKey: gateway.apiKey || '',
        secretKey: gateway.secretKey || '',
        webhookUrl: gateway.webhookUrl || '',
        webhookSecret: gateway.webhookSecret || '',
        testMode: gateway.testMode ?? false,
        customFields: gateway.customFields || {},
      });
    }
  }, [form, gateway]);

  const onSubmit = (data: GatewayFormValues) => {
    // If we're editing an existing gateway, we need to preserve the ID
    const updatedGateway = {
      id: gateway?.id || Date.now().toString(),
      ...data
    };
    
    // Save the gateway
    onSave(updatedGateway as PaymentGateway);
    
    // Show success toast
    toast.success(`${isNew ? 'Added' : 'Updated'} "${data.name}" payment gateway`);
    
    // Close the dialog
    onClose();
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="fees">Fees</TabsTrigger>
            <TabsTrigger value="api">API Keys</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <GeneralTab />
          </TabsContent>
          
          <TabsContent value="fees">
            <FeesTab />
          </TabsContent>
          
          <TabsContent value="api">
            <ApiKeysTab />
          </TabsContent>
          
          <TabsContent value="webhooks">
            <WebhooksTab />
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {isNew ? 'Add Gateway' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </form>
    </FormProvider>
  );
};
