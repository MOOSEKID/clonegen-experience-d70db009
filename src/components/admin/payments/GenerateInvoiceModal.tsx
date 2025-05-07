
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Plus, Trash, ArrowRight, Calendar } from 'lucide-react';
import { toast } from 'sonner';

// Mock member data for the searchable select
const mockMembers = [
  { id: '1', name: 'John Smith', email: 'john.smith@example.com' },
  { id: '2', name: 'Emily Davis', email: 'emily.davis@example.com' },
  { id: '3', name: 'Michael Brown', email: 'michael.brown@example.com' },
  { id: '4', name: 'Sarah Johnson', email: 'sarah.johnson@example.com' },
  { id: '5', name: 'Robert Wilson', email: 'robert.wilson@example.com' },
];

// Mock service items data
const mockServices = [
  { id: '1', name: 'Monthly Membership', price: 49.99 },
  { id: '2', name: 'Personal Training Session', price: 65.00 },
  { id: '3', name: 'Gym Equipment Rental', price: 15.00 },
  { id: '4', name: 'Spa Access', price: 25.00 },
  { id: '5', name: 'Nutrition Consultation', price: 40.00 },
];

const invoiceFormSchema = z.object({
  member: z.string({ required_error: 'Please select a member' }),
  invoiceDate: z.string({ required_error: 'Please select a date' }),
  dueDate: z.string({ required_error: 'Please select a due date' }),
  items: z.array(
    z.object({
      service: z.string({ required_error: 'Please select a service' }),
      description: z.string().optional(),
      quantity: z.coerce.number().min(1, { message: 'Quantity must be 1 or more' }),
      price: z.coerce.number().min(0.01, { message: 'Price must be greater than 0' }),
    })
  ).min(1, { message: 'At least one item is required' }),
  taxRate: z.coerce.number().min(0, { message: 'Tax rate cannot be negative' }).max(100, { message: 'Tax rate cannot exceed 100%' }),
  notes: z.string().optional(),
});

type InvoiceFormValues = z.infer<typeof invoiceFormSchema>;

interface GenerateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (data: any) => void;
}

export const GenerateInvoiceModal = ({ isOpen, onClose, onGenerate }: GenerateInvoiceModalProps) => {
  const [activeTab, setActiveTab] = useState('details');
  const [searchTerm, setSearchTerm] = useState('');
  
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      member: '',
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
      items: [
        {
          service: '',
          description: '',
          quantity: 1,
          price: 0,
        },
      ],
      taxRate: 10, // Default tax rate (10%)
      notes: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const filteredMembers = mockMembers.filter(
    member => 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const watchItems = form.watch('items');
  const watchTaxRate = form.watch('taxRate');

  // Calculate subtotal, tax amount and total
  const subtotal = watchItems.reduce((sum, item) => {
    return sum + (item.quantity * item.price);
  }, 0);
  
  const taxAmount = subtotal * (watchTaxRate / 100);
  const total = subtotal + taxAmount;

  const onServiceChange = (serviceId: string, index: number) => {
    const selectedService = mockServices.find(service => service.id === serviceId);
    
    if (selectedService) {
      const updatedItems = [...form.getValues('items')];
      updatedItems[index] = {
        ...updatedItems[index],
        service: serviceId,
        description: selectedService.name,
        price: selectedService.price,
      };
      
      form.setValue('items', updatedItems);
    }
  };

  const onSubmit = (data: InvoiceFormValues) => {
    // Calculate final amounts
    const subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const taxAmount = subtotal * (data.taxRate / 100);
    const total = subtotal + taxAmount;
    
    // Format the data with calculated totals
    const invoiceData = {
      ...data,
      subtotal,
      taxAmount,
      taxRate: data.taxRate,
      total,
      status: 'Pending',
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      createdAt: new Date().toISOString(),
    };
    
    // Send the data to the parent component
    onGenerate(invoiceData);
    
    // Show success toast
    toast.success('Invoice generated successfully');
    
    // Close the dialog
    onClose();
  };

  const addItem = () => {
    append({
      service: '',
      description: '',
      quantity: 1,
      price: 0,
    });
  };

  const goToNextTab = () => {
    if (activeTab === 'details') setActiveTab('items');
    else if (activeTab === 'items') setActiveTab('review');
  };

  const goToPreviousTab = () => {
    if (activeTab === 'review') setActiveTab('items');
    else if (activeTab === 'items') setActiveTab('details');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Generate New Invoice</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="details">Customer Details</TabsTrigger>
                <TabsTrigger value="items">Invoice Items</TabsTrigger>
                <TabsTrigger value="review">Review & Generate</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div>
                  <FormLabel>Select Member</FormLabel>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search members..."
                      className="pl-10 mb-2"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="max-h-[200px] overflow-y-auto border rounded-md">
                    {filteredMembers.length > 0 ? (
                      filteredMembers.map((member) => (
                        <div
                          key={member.id}
                          className={`flex items-center p-3 border-b cursor-pointer hover:bg-gray-50 ${
                            form.watch('member') === member.id ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => form.setValue('member', member.id)}
                        >
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.email}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-center text-gray-500">
                        No members found matching your search.
                      </div>
                    )}
                  </div>
                  
                  {form.formState.errors.member && (
                    <p className="text-sm font-medium text-destructive mt-1">
                      {form.formState.errors.member.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="invoiceDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice Date</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Due Date</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="button" onClick={goToNextTab}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="items" className="space-y-4">
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="border rounded-md p-4 space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Item {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => fields.length > 1 && remove(index)}
                          disabled={fields.length <= 1}
                        >
                          <Trash className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>

                      <FormField
                        control={form.control}
                        name={`items.${index}.service`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={(value) => onServiceChange(value, index)}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {mockServices.map((service) => (
                                  <SelectItem key={service.id} value={service.id}>
                                    {service.name} (${service.price.toFixed(2)})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`items.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quantity</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="1"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`items.${index}.price`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Unit Price ($)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`items.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description (optional)</FormLabel>
                            <FormControl>
                              <Textarea rows={2} placeholder="Additional details about this item..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addItem}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Another Item
                  </Button>
                </div>

                <FormField
                  control={form.control}
                  name="taxRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tax Rate (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          max="100"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={goToPreviousTab}>
                    Back
                  </Button>
                  <Button type="button" onClick={goToNextTab}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="review" className="space-y-6">
                {/* Customer Details Summary */}
                <div className="border rounded-md p-4 space-y-2">
                  <h3 className="text-lg font-medium">Customer Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Customer</p>
                      <p className="font-medium">
                        {form.watch('member') 
                          ? mockMembers.find(m => m.id === form.watch('member'))?.name || 'Selected Customer' 
                          : 'No customer selected'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">
                        {form.watch('member') 
                          ? mockMembers.find(m => m.id === form.watch('member'))?.email || 'customer@example.com' 
                          : 'No customer selected'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Invoice Date</p>
                      <p className="font-medium">{form.watch('invoiceDate')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Due Date</p>
                      <p className="font-medium">{form.watch('dueDate')}</p>
                    </div>
                  </div>
                </div>

                {/* Items Summary */}
                <div className="border rounded-md p-4">
                  <h3 className="text-lg font-medium mb-3">Invoice Items</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                          <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                          <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {watchItems.map((item, index) => {
                          const serviceName = mockServices.find(s => s.id === item.service)?.name || 'Custom Service';
                          const itemTotal = (item.quantity || 0) * (item.price || 0);
                          
                          return (
                            <tr key={index}>
                              <td className="px-3 py-2 text-sm">{serviceName}</td>
                              <td className="px-3 py-2 text-sm">{item.description || '-'}</td>
                              <td className="px-3 py-2 text-sm text-right">{item.quantity}</td>
                              <td className="px-3 py-2 text-sm text-right">${item.price?.toFixed(2)}</td>
                              <td className="px-3 py-2 text-sm font-medium text-right">${itemTotal.toFixed(2)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={3}></td>
                          <td className="px-3 py-2 text-sm font-medium text-right">Subtotal</td>
                          <td className="px-3 py-2 text-sm font-medium text-right">${subtotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td colSpan={3}></td>
                          <td className="px-3 py-2 text-sm font-medium text-right">Tax ({watchTaxRate}%)</td>
                          <td className="px-3 py-2 text-sm font-medium text-right">${taxAmount.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td colSpan={3}></td>
                          <td className="px-3 py-2 text-base font-bold text-right">Total</td>
                          <td className="px-3 py-2 text-base font-bold text-right">${total.toFixed(2)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={3} 
                          placeholder="Additional notes to display on the invoice..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter className="flex justify-between">
                  <Button type="button" variant="outline" onClick={goToPreviousTab}>
                    Back
                  </Button>
                  <Button type="submit">Generate Invoice</Button>
                </DialogFooter>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
