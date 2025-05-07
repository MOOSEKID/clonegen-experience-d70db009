
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';

interface PaymentGateway {
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

interface GatewayConfigurationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PaymentGateway) => void;
  gateway?: PaymentGateway;
  isNew?: boolean;
}

const gatewayFormSchema = z.object({
  name: z.string().min(1, { message: 'Gateway name is required' }),
  provider: z.string().min(1, { message: 'Provider name is required' }),
  fee: z.string().min(1, { message: 'Transaction fee information is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  isEnabled: z.boolean().default(true),
  supportedCards: z.array(z.string()).optional(),
  apiKey: z.string().optional(),
  secretKey: z.string().optional(),
  webhookUrl: z.string().optional(),
  webhookSecret: z.string().optional(),
  testMode: z.boolean().default(false),
  customFields: z.record(z.string()).optional(),
});

type GatewayFormValues = z.infer<typeof gatewayFormSchema>;

export const GatewayConfigurationModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  gateway, 
  isNew = false 
}: GatewayConfigurationModalProps) => {
  const [showSecretKey, setShowSecretKey] = React.useState(false);
  const [showWebhookSecret, setShowWebhookSecret] = React.useState(false);

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

  const toggleSecretKey = () => {
    setShowSecretKey(prev => !prev);
  };

  const toggleWebhookSecret = () => {
    setShowWebhookSecret(prev => !prev);
  };

  const generateTestWebhook = () => {
    const webhookUrl = form.getValues('webhookUrl');
    if (!webhookUrl) {
      toast.error('Please enter a webhook URL first');
      return;
    }
    
    // In a real app, this would send a test webhook
    toast.success('Test webhook sent successfully');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isNew ? 'Add Payment Gateway' : 'Configure Payment Gateway'}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="fees">Fees</TabsTrigger>
                <TabsTrigger value="api">API Keys</TabsTrigger>
                <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gateway Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Credit Card Processing" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="provider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provider</FormLabel>
                      <FormControl>
                        <Input placeholder="Stripe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Process all major credit cards with our primary payment gateway." 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Enabled</FormLabel>
                        <FormDescription>
                          Turn on or off this payment gateway.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="fees" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="fee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transaction Fee</FormLabel>
                      <FormControl>
                        <Input placeholder="2.9% + $0.30 per transaction" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter the fee structure (e.g., percentage, flat fee, or both).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="border rounded-lg p-4">
                  <FormLabel className="text-base">Supported Cards</FormLabel>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="visa" 
                        className="w-4 h-4"
                        checked={form.watch('supportedCards')?.includes('Visa')}
                        onChange={(e) => {
                          const currentCards = form.watch('supportedCards') || [];
                          if (e.target.checked) {
                            form.setValue('supportedCards', [...currentCards, 'Visa']);
                          } else {
                            form.setValue('supportedCards', currentCards.filter(card => card !== 'Visa'));
                          }
                        }}
                      />
                      <label htmlFor="visa">Visa</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="mastercard" 
                        className="w-4 h-4"
                        checked={form.watch('supportedCards')?.includes('Mastercard')}
                        onChange={(e) => {
                          const currentCards = form.watch('supportedCards') || [];
                          if (e.target.checked) {
                            form.setValue('supportedCards', [...currentCards, 'Mastercard']);
                          } else {
                            form.setValue('supportedCards', currentCards.filter(card => card !== 'Mastercard'));
                          }
                        }}
                      />
                      <label htmlFor="mastercard">Mastercard</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="amex" 
                        className="w-4 h-4"
                        checked={form.watch('supportedCards')?.includes('American Express')}
                        onChange={(e) => {
                          const currentCards = form.watch('supportedCards') || [];
                          if (e.target.checked) {
                            form.setValue('supportedCards', [...currentCards, 'American Express']);
                          } else {
                            form.setValue('supportedCards', currentCards.filter(card => card !== 'American Express'));
                          }
                        }}
                      />
                      <label htmlFor="amex">American Express</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="discover" 
                        className="w-4 h-4"
                        checked={form.watch('supportedCards')?.includes('Discover')}
                        onChange={(e) => {
                          const currentCards = form.watch('supportedCards') || [];
                          if (e.target.checked) {
                            form.setValue('supportedCards', [...currentCards, 'Discover']);
                          } else {
                            form.setValue('supportedCards', currentCards.filter(card => card !== 'Discover'));
                          }
                        }}
                      />
                      <label htmlFor="discover">Discover</label>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="api" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <FormControl>
                        <Input placeholder="pk_test_..." {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your publishable API key.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="secretKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secret Key</FormLabel>
                      <div className="flex">
                        <FormControl>
                          <Input 
                            type={showSecretKey ? "text" : "password"} 
                            placeholder="sk_test_..." 
                            {...field} 
                            className="rounded-r-none"
                          />
                        </FormControl>
                        <Button 
                          type="button"
                          variant="outline"
                          className="rounded-l-none"
                          onClick={toggleSecretKey}
                        >
                          {showSecretKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <FormDescription>
                        Keep this key secure. It should never be exposed in your frontend code.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="testMode"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Test Mode</FormLabel>
                        <FormDescription>
                          Enable test mode to use sandbox credentials without processing real payments.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="webhooks" className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="webhookUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Webhook URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://yourdomain.com/api/webhooks/payment" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        The URL that will receive webhook events from the payment provider.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="webhookSecret"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Webhook Secret</FormLabel>
                      <div className="flex">
                        <FormControl>
                          <Input 
                            type={showWebhookSecret ? "text" : "password"} 
                            placeholder="whsec_..." 
                            {...field} 
                            className="rounded-r-none"
                          />
                        </FormControl>
                        <Button 
                          type="button"
                          variant="outline"
                          className="rounded-l-none"
                          onClick={toggleWebhookSecret}
                        >
                          {showWebhookSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <FormDescription>
                        Used to verify that webhooks are sent by your payment provider.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="border rounded-lg p-4">
                  <h3 className="text-base font-medium mb-2">Webhook Testing</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Send a test webhook to verify your endpoint is configured correctly.
                  </p>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={generateTestWebhook}
                  >
                    Send Test Webhook
                  </Button>
                </div>
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
        </Form>
      </DialogContent>
    </Dialog>
  );
};
