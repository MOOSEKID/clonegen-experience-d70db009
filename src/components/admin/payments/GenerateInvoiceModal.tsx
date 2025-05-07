
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
  FormDescription,
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
import { Search, Plus, Trash, ArrowRight, Calendar, Mail, Download } from 'lucide-react';
import { toast } from 'sonner';
import { exportToPDF } from '@/utils/exportUtils';

// Mock member data for the searchable select
const mockMembers = [
  { id: '1', name: 'John Smith', email: 'john.smith@example.com' },
  { id: '2', name: 'Emily Davis', email: 'emily.davis@example.com' },
  { id: '3', name: 'Michael Brown', email: 'michael.brown@example.com' },
  { id: '4', name: 'Sarah Johnson', email: 'sarah.johnson@example.com' },
  { id: '5', name: 'Robert Wilson', email: 'robert.wilson@example.com' },
];

// Mock company data
const mockCompanies = [
  { id: '1', name: 'Acme Corporation', email: 'billing@acmecorp.com' },
  { id: '2', name: 'Globex Industries', email: 'accounts@globex.com' },
  { id: '3', name: 'Wayne Enterprises', email: 'finance@wayne.com' },
  { id: '4', name: 'Stark Industries', email: 'invoices@stark.com' },
  { id: '5', name: 'Umbrella Corporation', email: 'billing@umbrella.com' },
];

// Mock service items data
const mockServices = [
  { id: '1', name: 'Monthly Membership', price: 50000 },
  { id: '2', name: 'Personal Training Session', price: 65000 },
  { id: '3', name: 'Gym Equipment Rental', price: 15000 },
  { id: '4', name: 'Spa Access', price: 25000 },
  { id: '5', name: 'Nutrition Consultation', price: 40000 },
];

const invoiceFormSchema = z.object({
  invoiceType: z.enum(['individual', 'company']),
  recipient: z.string({ required_error: 'Please select a recipient' }),
  invoiceDate: z.string({ required_error: 'Please select a date' }),
  dueDate: z.string({ required_error: 'Please select a due date' }),
  items: z.array(
    z.object({
      service: z.string({ required_error: 'Please select a service' }),
      description: z.string().optional(),
      quantity: z.coerce.number().min(1, { message: 'Quantity must be 1 or more' }),
      price: z.coerce.number().min(1, { message: 'Price must be greater than 0' }),
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
      invoiceType: 'individual',
      recipient: '',
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
      taxRate: 18, // Default tax rate in Rwanda is 18%
      notes: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const invoiceType = form.watch('invoiceType');
  
  const recipients = invoiceType === 'individual' ? mockMembers : mockCompanies;
  
  const filteredRecipients = recipients.filter(
    recipient => 
      recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const watchItems = form.watch('items');
  const watchTaxRate = form.watch('taxRate');

  // Calculate subtotal, tax amount and total
  const subtotal = watchItems.reduce((sum, item) => {
    return sum + (item.quantity * item.price);
  }, 0);
  
  const taxAmount = subtotal * (watchTaxRate / 100);
  const total = subtotal + taxAmount;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

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
    
    // Find recipient details
    const recipientData = recipients.find(r => r.id === data.recipient);
    
    // Format the data with calculated totals
    const invoiceData = {
      ...data,
      recipientName: recipientData?.name || '',
      recipientEmail: recipientData?.email || '',
      subtotal,
      taxAmount,
      taxRate: data.taxRate,
      total,
      status: 'Pending',
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      createdAt: new Date().toISOString(),
      currency: 'RWF',
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

  const handleSendEmail = () => {
    const data = form.getValues();
    const recipient = recipients.find(r => r.id === data.recipient);
    if (recipient) {
      toast.success(`Email sent to ${recipient.name} at ${recipient.email}`);
    }
  };

  const handleDownloadPDF = () => {
    const data = form.getValues();
    const recipient = recipients.find(r => r.id === data.recipient);
    
    // This would normally call a proper PDF generation service
    // For now we'll just show a success message
    toast.success(`Invoice PDF ready for ${recipient?.name || 'customer'}`);
    
    // In a real app, you'd generate and download the PDF here
    // Using the exportToPDF utility
    const columnsForPDF = [
      { label: 'Item', key: 'description' },
      { label: 'Quantity', key: 'quantity' },
      { label: 'Unit Price (RWF)', key: 'price' },
      { label: 'Total (RWF)', key: 'total' }
    ];
    
    const dataForPDF = watchItems.map(item => ({
      ...item,
      total: item.quantity * item.price
    }));
    
    exportToPDF(`Invoice for ${recipient?.name || 'Customer'}`, dataForPDF, columnsForPDF);
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
                <FormField
                  control={form.control}
                  name="invoiceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invoice Type</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          form.setValue('recipient', '');
                          setSearchTerm('');
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select invoice type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="individual">Individual</SelectItem>
                          <SelectItem value="company">Company</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        {invoiceType === 'individual' ? 'Create invoice for gym member' : 'Create invoice for corporate client'}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Select {invoiceType === 'individual' ? 'Member' : 'Company'}</FormLabel>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder={`Search ${invoiceType === 'individual' ? 'members' : 'companies'}...`}
                      className="pl-10 mb-2"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="max-h-[200px] overflow-y-auto border rounded-md">
                    {filteredRecipients.length > 0 ? (
                      filteredRecipients.map((recipient) => (
                        <div
                          key={recipient.id}
                          className={`flex items-center p-3 border-b cursor-pointer hover:bg-gray-50 ${
                            form.watch('recipient') === recipient.id ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => form.setValue('recipient', recipient.id)}
                        >
                          <div>
                            <p className="font-medium">{recipient.name}</p>
                            <p className="text-sm text-gray-500">{recipient.email}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-center text-gray-500">
                        No {invoiceType === 'individual' ? 'members' : 'companies'} found matching your search.
                      </div>
                    )}
                  </div>
                  
                  {form.formState.errors.recipient && (
                    <p className="text-sm font-medium text-destructive mt-1">
                      {form.formState.errors.recipient.message}
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
                                    {service.name} ({formatCurrency(service.price)})
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
                              <FormLabel>Unit Price (RWF)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  step="1"
                                  min="0"
                                  {...field}
                                />
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
                      <FormDescription className="text-xs">
                        Standard VAT in Rwanda is 18%
                      </FormDescription>
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
                  <h3 className="text-lg font-medium">{invoiceType === 'individual' ? 'Customer' : 'Company'} Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">{invoiceType === 'individual' ? 'Customer' : 'Company'}</p>
                      <p className="font-medium">
                        {form.watch('recipient') 
                          ? recipients.find(r => r.id === form.watch('recipient'))?.name || 'Selected Recipient' 
                          : 'No recipient selected'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">
                        {form.watch('recipient') 
                          ? recipients.find(r => r.id === form.watch('recipient'))?.email || 'recipient@example.com' 
                          : 'No recipient selected'}
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
                              <td className="px-3 py-2 text-sm text-right">{formatCurrency(item.price)}</td>
                              <td className="px-3 py-2 text-sm font-medium text-right">{formatCurrency(itemTotal)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={3}></td>
                          <td className="px-3 py-2 text-sm font-medium text-right">Subtotal</td>
                          <td className="px-3 py-2 text-sm font-medium text-right">{formatCurrency(subtotal)}</td>
                        </tr>
                        <tr>
                          <td colSpan={3}></td>
                          <td className="px-3 py-2 text-sm font-medium text-right">Tax ({watchTaxRate}%)</td>
                          <td className="px-3 py-2 text-sm font-medium text-right">{formatCurrency(taxAmount)}</td>
                        </tr>
                        <tr>
                          <td colSpan={3}></td>
                          <td className="px-3 py-2 text-base font-bold text-right">Total</td>
                          <td className="px-3 py-2 text-base font-bold text-right">{formatCurrency(total)}</td>
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

                <div className="border rounded-md p-4">
                  <h3 className="text-lg font-medium mb-3">Export Options</h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSendEmail}
                      className="flex-1"
                      disabled={!form.watch('recipient')}
                    >
                      <Mail className="mr-2 h-4 w-4" /> Email to Customer
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleDownloadPDF}
                      className="flex-1"
                    >
                      <Download className="mr-2 h-4 w-4" /> Download PDF
                    </Button>
                  </div>
                </div>

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
