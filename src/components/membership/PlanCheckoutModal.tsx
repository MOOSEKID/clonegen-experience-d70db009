
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/Button';
import { SubscriptionPlan } from '@/hooks/useSubscriptionPlans';
import { Separator } from '@/components/ui/separator';

interface PlanCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (paymentMethod: string) => void;
  plan: SubscriptionPlan | undefined;
  isLoading: boolean;
}

const PlanCheckoutModal = ({ 
  isOpen, 
  onClose, 
  onComplete, 
  plan,
  isLoading
}: PlanCheckoutModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<string>('momo');
  
  if (!plan) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(paymentMethod);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Complete Your Subscription
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="font-bold text-lg mb-2">{plan.name}</h3>
            <p className="text-gray-500 mb-3">{plan.billingCycle} Plan</p>
            
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium">Price:</span>
              <span className="font-bold text-lg">
                {plan.price.startsWith('RWF') ? plan.price : `RWF ${plan.price}`}
              </span>
            </div>

            <Separator className="my-4" />
            
            <h4 className="font-medium mb-2">Features:</h4>
            <ul className="space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <Check className="text-gym-orange mr-2 flex-shrink-0 mt-1" size={16} />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleSubmit}>
            <h4 className="font-medium mb-3">Select Payment Method:</h4>
            
            <div className="space-y-3 mb-6">
              <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="momo"
                  checked={paymentMethod === 'momo'}
                  onChange={() => setPaymentMethod('momo')}
                  className="mr-3"
                />
                <div>
                  <p className="font-medium">Mobile Money</p>
                  <p className="text-sm text-gray-500">Pay using MTN or Airtel mobile money</p>
                </div>
              </label>
              
              <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mr-3"
                />
                <div>
                  <p className="font-medium">Credit/Debit Card</p>
                  <p className="text-sm text-gray-500">Pay with Visa, Mastercard, or other card</p>
                </div>
              </label>
              
              <label className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={paymentMethod === 'bank'}
                  onChange={() => setPaymentMethod('bank')}
                  className="mr-3"
                />
                <div>
                  <p className="font-medium">Bank Transfer</p>
                  <p className="text-sm text-gray-500">Pay directly from your bank account</p>
                </div>
              </label>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="flex-1"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Complete Subscription'}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlanCheckoutModal;
