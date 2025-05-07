
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Check, X, Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const planFormSchema = z.object({
  name: z.string().min(1, { message: 'Plan name is required' }),
  billingCycle: z.string().min(1, { message: 'Billing cycle is required' }),
  price: z.string().min(1, { message: 'Price is required' }),
  planId: z.string().optional(),
  features: z.array(z.string()).min(1, { message: 'At least one feature is required' }),
});

type PlanFormValues = z.infer<typeof planFormSchema>;

interface EditPlanDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PlanFormValues) => void;
  plan?: {
    id: string;
    name: string;
    billingCycle: string;
    price: string;
    planId?: string;
    features: string[];
  };
}

export const EditPlanDialog = ({ isOpen, onClose, onSave, plan }: EditPlanDialogProps) => {
  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      name: plan?.name || '',
      billingCycle: plan?.billingCycle || 'Monthly',
      price: plan?.price || '',
      planId: plan?.planId || '',
      features: plan?.features || [''],
    },
  });

  React.useEffect(() => {
    if (plan) {
      form.reset({
        name: plan.name,
        billingCycle: plan.billingCycle,
        price: plan.price,
        planId: plan.planId,
        features: plan.features,
      });
    }
  }, [form, plan]);

  const addFeature = () => {
    const currentFeatures = form.getValues('features');
    form.setValue('features', [...currentFeatures, '']);
  };

  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues('features');
    if (currentFeatures.length > 1) {
      form.setValue('features', currentFeatures.filter((_, i) => i !== index));
    }
  };

  const onSubmit = (data: PlanFormValues) => {
    // Filter out empty features
    data.features = data.features.filter(feature => feature.trim() !== '');
    
    // Save the plan
    onSave(data);
    
    // Show success toast
    toast.success(`${plan ? 'Updated' : 'Created'} "${data.name}" plan successfully`);
    
    // Close the dialog
    onClose();
  };

  const billingCycleOptions = [
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' },
    { value: '3 Months', label: '3 Months' },
    { value: '6 Months', label: '6 Months' },
    { value: 'Annual', label: 'Annual' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{plan ? 'Edit' : 'Add New'} Subscription Plan</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Premium Membership" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="billingCycle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billing Cycle</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a billing cycle" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {billingCycleOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (RWF)</FormLabel>
                    <FormControl>
                      <Input placeholder="50,000" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Enter amount in Rwandan Francs
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="planId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan ID/Slug (for public page sync)</FormLabel>
                  <FormControl>
                    <Input placeholder="premium-monthly" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Used to sync this plan with the public membership page
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <FormLabel>Features</FormLabel>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={addFeature}
                  className="h-8 gap-1"
                >
                  <Plus className="h-4 w-4" /> Add Feature
                </Button>
              </div>
              
              <div className="space-y-2">
                {form.watch('features').map((_, index) => (
                  <div key={index} className="flex gap-2">
                    <FormField
                      control={form.control}
                      name={`features.${index}`}
                      render={({ field }) => (
                        <FormItem className="flex-grow">
                          <FormControl>
                            <Input placeholder="Feature description" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeFeature(index)}
                      className="shrink-0"
                      disabled={form.watch('features').length <= 1}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove feature</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {plan ? 'Save Changes' : 'Create Plan'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
