
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

export const FeesTab = () => {
  const form = useFormContext<GatewayFormValues>();
  
  return (
    <div className="space-y-4 pt-4">
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
    </div>
  );
};
