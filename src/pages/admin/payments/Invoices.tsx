
import { useState, useEffect } from 'react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download, Mail, Eye, Filter, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { GenerateInvoiceModal } from '@/components/admin/payments/GenerateInvoiceModal';
import { InvoiceFilterDialog, FilterValues } from '@/components/admin/payments/InvoiceFilterDialog';
import { ViewInvoiceDialog } from '@/components/admin/payments/ViewInvoiceDialog';
import { toast } from 'sonner';

// Mock invoice data
const initialInvoicesData = [
  { 
    id: '1', 
    invoiceNumber: 'INV-2023-0001', 
    member: 'John Smith',
    memberEmail: 'john.smith@example.com', 
    date: '2023-05-10', 
    amount: 49.99, 
    status: 'Paid',
    items: [
      { service: 'Monthly Membership', description: 'Basic Plan', quantity: 1, price: 49.99 }
    ],
    subtotal: 49.99,
    taxRate: 0,
    taxAmount: 0,
    total: 49.99
  },
  { 
    id: '2', 
    invoiceNumber: 'INV-2023-0002', 
    member: 'Sarah Johnson',
    memberEmail: 'sarah.johnson@example.com', 
    date: '2023-05-12', 
    amount: 89.99, 
    status: 'Paid',
    items: [
      { service: 'Premium Membership', description: 'Premium quarterly plan', quantity: 1, price: 89.99 }
    ],
    subtotal: 89.99,
    taxRate: 0,
    taxAmount: 0,
    total: 89.99
  },
  { 
    id: '3', 
    invoiceNumber: 'INV-2023-0003', 
    member: 'Michael Brown',
    memberEmail: 'michael.brown@example.com', 
    date: '2023-05-15', 
    amount: 129.99, 
    status: 'Pending',
    dueDate: '2023-05-29',
    items: [
      { service: 'Personal Training', description: '2 sessions', quantity: 2, price: 60.00 },
      { service: 'Nutrition Plan', description: 'Custom meal plan', quantity: 1, price: 9.99 }
    ],
    subtotal: 129.99,
    taxRate: 0,
    taxAmount: 0,
    total: 129.99
  },
  { 
    id: '4', 
    invoiceNumber: 'INV-2023-0004', 
    member: 'Emily Davis',
    memberEmail: 'emily.davis@example.com', 
    date: '2023-05-18', 
    amount: 49.99, 
    status: 'Paid',
    items: [
      { service: 'Monthly Membership', description: 'Basic Plan', quantity: 1, price: 49.99 }
    ],
    subtotal: 49.99,
    taxRate: 0,
    taxAmount: 0,
    total: 49.99
  },
  { 
    id: '5', 
    invoiceNumber: 'INV-2023-0005', 
    member: 'Robert Wilson',
    memberEmail: 'robert.wilson@example.com', 
    date: '2023-05-20', 
    amount: 199.99, 
    status: 'Overdue',
    dueDate: '2023-05-27',
    notes: 'Second reminder sent on June 1st.',
    items: [
      { service: 'Annual Membership', description: 'Basic annual plan', quantity: 1, price: 179.99 },
      { service: 'Locker Rental', description: '1 month', quantity: 1, price: 20.00 }
    ],
    subtotal: 199.99,
    taxRate: 0,
    taxAmount: 0,
    total: 199.99
  },
  { 
    id: '6', 
    invoiceNumber: 'INV-2023-0006', 
    member: 'Jennifer Taylor',
    memberEmail: 'jennifer.taylor@example.com', 
    date: '2023-05-22', 
    amount: 29.99, 
    status: 'Paid',
    items: [
      { service: 'Day Pass', description: 'Single day access', quantity: 1, price: 29.99 }
    ],
    subtotal: 29.99,
    taxRate: 0,
    taxAmount: 0,
    total: 29.99
  },
  { 
    id: '7', 
    invoiceNumber: 'INV-2023-0007', 
    member: 'William Moore',
    memberEmail: 'william.moore@example.com', 
    date: '2023-05-25', 
    amount: 89.99, 
    status: 'Pending',
    dueDate: '2023-06-08',
    items: [
      { service: 'Premium Membership', description: 'Premium quarterly plan', quantity: 1, price: 89.99 }
    ],
    subtotal: 89.99,
    taxRate: 0,
    taxAmount: 0,
    total: 89.99
  },
  { 
    id: '8', 
    invoiceNumber: 'INV-2023-0008', 
    member: 'Jessica Anderson',
    memberEmail: 'jessica.anderson@example.com', 
    date: '2023-05-28', 
    amount: 149.99, 
    status: 'Paid',
    items: [
      { service: 'Family Membership', description: '2 adults, monthly plan', quantity: 1, price: 149.99 }
    ],
    subtotal: 149.99,
    taxRate: 0,
    taxAmount: 0,
    total: 149.99
  },
  { 
    id: '9', 
    invoiceNumber: 'INV-2023-0009', 
    member: 'David Thomas',
    memberEmail: 'david.thomas@example.com', 
    date: '2023-06-01', 
    amount: 29.99, 
    status: 'Pending',
    dueDate: '2023-06-15',
    items: [
      { service: 'Gym Equipment Rental', description: 'Weights set - 1 week', quantity: 1, price: 29.99 }
    ],
    subtotal: 29.99,
    taxRate: 0,
    taxAmount: 0,
    total: 29.99
  },
  { 
    id: '10', 
    invoiceNumber: 'INV-2023-0010', 
    member: 'Lisa Jackson',
    memberEmail: 'lisa.jackson@example.com', 
    date: '2023-06-05', 
    amount: 99.99, 
    status: 'Overdue',
    dueDate: '2023-06-12',
    items: [
      { service: 'Personal Training', description: '3 sessions package', quantity: 3, price: 33.33 }
    ],
    subtotal: 99.99,
    taxRate: 0,
    taxAmount: 0,
    total: 99.99
  }
];

const Invoices = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [invoices, setInvoices] = useState(initialInvoicesData);
  const [filteredInvoices, setFilteredInvoices] = useState(initialInvoicesData);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [isViewInvoiceOpen, setIsViewInvoiceOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    dateFrom: '',
    dateTo: '',
    status: '',
    minAmount: '',
    maxAmount: '',
  });

  // Apply filters and search term
  useEffect(() => {
    let filtered = [...invoices];
    
    // Apply search term
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(invoice => 
        invoice.invoiceNumber.toLowerCase().includes(lowerCaseSearch) || 
        invoice.member.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    // Apply date range filter
    if (filters.dateFrom) {
      filtered = filtered.filter(invoice => 
        new Date(invoice.date) >= new Date(filters.dateFrom)
      );
    }
    
    if (filters.dateTo) {
      filtered = filtered.filter(invoice => 
        new Date(invoice.date) <= new Date(filters.dateTo)
      );
    }
    
    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(invoice => 
        invoice.status === filters.status
      );
    }
    
    // Apply amount range filter
    if (filters.minAmount) {
      filtered = filtered.filter(invoice => 
        invoice.amount >= parseFloat(filters.minAmount)
      );
    }
    
    if (filters.maxAmount) {
      filtered = filtered.filter(invoice => 
        invoice.amount <= parseFloat(filters.maxAmount)
      );
    }
    
    setFilteredInvoices(filtered);
  }, [searchTerm, invoices, filters]);

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'Paid':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleGenerateInvoice = (data: any) => {
    // In a real app, this would send the data to an API
    // For now, we'll just add it to our local state
    const newInvoice = {
      id: (invoices.length + 1).toString(),
      invoiceNumber: data.invoiceNumber,
      member: data.member,
      memberEmail: data.memberEmail,
      date: data.invoiceDate,
      dueDate: data.dueDate,
      amount: data.total,
      status: 'Pending',
      items: data.items,
      subtotal: data.subtotal,
      taxRate: data.taxRate,
      taxAmount: data.taxAmount,
      total: data.total,
      notes: data.notes
    };
    
    setInvoices([newInvoice, ...invoices]);
    toast.success(`Invoice ${data.invoiceNumber} created successfully`);
  };

  const handleApplyFilters = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsViewInvoiceOpen(true);
  };

  const handleDownloadInvoice = (invoice: any) => {
    // In a real app, this would generate and download a PDF
    toast.success(`Invoice ${invoice.invoiceNumber} downloaded successfully`);
  };

  const handleSendReminderEmail = (invoice: any) => {
    // In a real app, this would send an email
    toast.success(`Reminder email sent to ${invoice.member} for invoice ${invoice.invoiceNumber}`);
  };

  // Check if any filters are active
  const hasActiveFilters = 
    filters.dateFrom !== '' || 
    filters.dateTo !== '' || 
    filters.status !== '' || 
    filters.minAmount !== '' || 
    filters.maxAmount !== '';

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/payments">Payments</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Invoices & Payments</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Invoices & Payments</h1>
        <Button 
          variant="default"
          onClick={() => setIsGenerateModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Generate New Invoice
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search invoices by ID or member name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button 
          variant={hasActiveFilters ? "default" : "outline"} 
          size="sm"
          onClick={() => setIsFilterDialogOpen(true)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" /> 
          {hasActiveFilters ? 'Filters Applied' : 'Filter'}
        </Button>
      </div>

      {isMobile ? (
        // Mobile card view
        <div className="space-y-4">
          {filteredInvoices.map((invoice) => (
            <Card key={invoice.id}>
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-gray-500">{invoice.member}</p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">{invoice.date}</span>
                  <span className="font-bold">${invoice.amount.toFixed(2)}</span>
                </div>
                
                <div className="flex space-x-2 justify-end">
                  <Button variant="ghost" size="sm" onClick={() => handleViewInvoice(invoice)}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDownloadInvoice(invoice)}>
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    disabled={invoice.status !== 'Pending' && invoice.status !== 'Overdue'}
                    onClick={() => handleSendReminderEmail(invoice)}
                  >
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Send reminder</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        // Desktop table view
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Member Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                    <TableCell>{invoice.member}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" onClick={() => handleViewInvoice(invoice)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleDownloadInvoice(invoice)}>
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          disabled={invoice.status !== 'Pending' && invoice.status !== 'Overdue'}
                          onClick={() => handleSendReminderEmail(invoice)}
                        >
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">Send reminder</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      
      {filteredInvoices.length === 0 && (
        <div className="flex items-center justify-center h-32 border rounded-md bg-gray-50">
          <p className="text-gray-500">No invoices found matching your search.</p>
        </div>
      )}

      {/* Modals and Dialogs */}
      <GenerateInvoiceModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        onGenerate={handleGenerateInvoice}
      />

      <InvoiceFilterDialog
        isOpen={isFilterDialogOpen}
        onClose={() => setIsFilterDialogOpen(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
      />

      <ViewInvoiceDialog
        isOpen={isViewInvoiceOpen}
        onClose={() => setIsViewInvoiceOpen(false)}
        invoice={selectedInvoice}
      />
    </div>
  );
};

export default Invoices;
