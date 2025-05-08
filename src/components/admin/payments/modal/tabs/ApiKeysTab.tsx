
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
import { Switch } from '@/components/ui/switch';
import { Eye, EyeOff } from 'lucide-react';

export const ApiKeysTab = () => {
  const form = useFormContext<GatewayFormValues>();
  const [showSecretKey, setShowSecretKey] = React.useState(false);

  const toggleSecretKey = () => {
    setShowSecretKey(prev => !prev);
  };

  return (
    <div className="space-y-4 pt-4">
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
    </div>
  );
};
