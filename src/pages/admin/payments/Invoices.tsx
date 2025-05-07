import { useState } from 'react';
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  FileText, 
  Search, 
  Plus, 
  Filter, 
  ChevronDown, 
  Eye, 
  Download, 
  Mail 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { GenerateInvoiceModal } from '@/components/admin/payments/GenerateInvoiceModal';
import { InvoiceFilterDialog, FilterValues } from '@/components/admin/payments/InvoiceFilterDialog';
import { ViewInvoiceDialog } from '@/components/admin/payments/ViewInvoiceDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

// Mock invoice data
const mockInvoices = [
  {
    id: 'INV-2023-0001',
    customer: 'John Smith',
    date: '2023-04-15',
    amount: 49990,
    status: 'Paid',
    email: 'john.smith@example.com',
  },
  {
    id: 'INV-2023-0002',
    customer: 'Emily Davis',
    date: '2023-04-18',
    amount: 299990,
    status: 'Pending',
    email: 'emily.davis@example.com',
  },
  {
    id: 'INV-2023-0003',
    customer: 'Michael Brown',
    date: '2023-03-28',
    amount: 149990,
    status: 'Overdue',
    email: 'michael.brown@example.com',
  },
  {
    id: 'INV-2023-0004',
    customer: 'Sarah Johnson',
    date: '2023-04-10',
    amount: 79990,
    status: 'Paid',
    email: 'sarah.johnson@example.com',
  },
  {
    id: 'INV-2023-0005',
    customer: 'Robert Wilson',
    date: '2023-04-05',
    amount: 449990,
    status: 'Pending',
    email: 'robert.wilson@example.com',
  },
];

const Invoices = () => {
  const [invoices, setInvoices] = useState(mockInvoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [filterValues, setFilterValues] = useState<FilterValues>({
    dateFrom: '',
    dateTo: '',
    status: '',
    minAmount: '',
    maxAmount: '',
  });
  const isMobile = useIsMobile();
  
  const filteredInvoices = invoices.filter(
    invoice => 
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApplyFilters = (filters: FilterValues) => {
    console.log('Applied filters:', filters);
    setFilterValues(filters);
    // Here you would apply the filters to your invoice list
    // This is a simplified example - in a real app, this would filter the invoices based on the filter values
  };

  const handleGenerateInvoice = (data: any) => {
    // In a real app this would send the data to your backend
    console.log('Generated invoice:', data);
    
    // Add the new invoice to the list
    const newInvoice = {
      id: data.invoiceNumber,
      customer: data.recipientName,
      date: data.invoiceDate,
      amount: data.total,
      status: 'Pending',
      email: data.recipientEmail,
    };
    
    setInvoices([newInvoice, ...invoices]);
    
    // Show success message
    toast.success('New invoice generated successfully');
  };

  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsViewModalOpen(true);
  };

  const handleSendEmail = (invoice: any) => {
    // In a real app, this would trigger an email sending process
    toast.success(`Invoice ${invoice.id} sent to ${invoice.customer} at ${invoice.email}`);
  };

  const handleDownloadPDF = (invoice: any) => {
    // In a real app, this would generate and download a PDF
    toast.success(`Downloaded invoice ${invoice.id} for ${invoice.customer}`);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-RW', {
      style: 'currency',
      currency: 'RWF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

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

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold">Invoices & Payments</h1>
        <Button onClick={() => setIsGenerateModalOpen(true)} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" /> Generate New Invoice
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by invoice ID or customer..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          onClick={() => setIsFilterDialogOpen(true)}
          className="w-full sm:w-auto"
        >
          <Filter className="h-4 w-4 mr-2" /> Filter
        </Button>
      </div>

      {isMobile ? (
        <div className="space-y-4">
          {filteredInvoices.length > 0 ? (
            filteredInvoices.map((invoice) => (
              <Card key={invoice.id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold">{invoice.id}</p>
                    <p className="text-sm text-gray-500">{invoice.customer}</p>
                  </div>
                  <Badge className={getStatusColor(invoice.status)}>
                    {invoice.status}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-gray-500">Date: {invoice.date}</span>
                  <span className="font-medium">{formatCurrency(invoice.amount)}</span>
                </div>
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleViewInvoice(invoice)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDownloadPDF(invoice)}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleSendEmail(invoice)}>
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-gray-400" />
              <p className="mt-2 text-gray-500">No invoices found</p>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.customer}</TableCell>
                    <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                    <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => handleViewInvoice(invoice)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownloadPDF(invoice)}>
                              <Download className="h-4 w-4 mr-2" />
                              Download PDF
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSendEmail(invoice)}>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <FileText className="h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-gray-500">No invoices found</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <GenerateInvoiceModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        onGenerate={handleGenerateInvoice}
      />

      <InvoiceFilterDialog
        isOpen={isFilterDialogOpen}
        onClose={() => setIsFilterDialogOpen(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filterValues}
      />

      {selectedInvoice && (
        <ViewInvoiceDialog
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          invoice={selectedInvoice}
        />
      )}
    </div>
  );
};

export default Invoices;
