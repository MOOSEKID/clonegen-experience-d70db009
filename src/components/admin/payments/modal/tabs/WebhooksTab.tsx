
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { GatewayFormValues } from '../GatewayFormSchema';
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export const WebhooksTab = () => {
  const form = useFormContext<GatewayFormValues>();
  const [showWebhookSecret, setShowWebhookSecret] = React.useState(false);

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
    <div className="space-y-4 pt-4">
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
    </div>
  );
};
