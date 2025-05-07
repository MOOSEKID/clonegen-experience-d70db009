
import { useState } from 'react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download, Mail, Eye, Filter } from 'lucide-react';

// Mock invoice data
const invoicesData = [
  { id: 'INV-2023-0001', member: 'John Smith', date: '2023-05-10', amount: '$49.99', status: 'Paid' },
  { id: 'INV-2023-0002', member: 'Sarah Johnson', date: '2023-05-12', amount: '$89.99', status: 'Paid' },
  { id: 'INV-2023-0003', member: 'Michael Brown', date: '2023-05-15', amount: '$129.99', status: 'Pending' },
  { id: 'INV-2023-0004', member: 'Emily Davis', date: '2023-05-18', amount: '$49.99', status: 'Paid' },
  { id: 'INV-2023-0005', member: 'Robert Wilson', date: '2023-05-20', amount: '$199.99', status: 'Overdue' },
  { id: 'INV-2023-0006', member: 'Jennifer Taylor', date: '2023-05-22', amount: '$29.99', status: 'Paid' },
  { id: 'INV-2023-0007', member: 'William Moore', date: '2023-05-25', amount: '$89.99', status: 'Pending' },
  { id: 'INV-2023-0008', member: 'Jessica Anderson', date: '2023-05-28', amount: '$149.99', status: 'Paid' },
  { id: 'INV-2023-0009', member: 'David Thomas', date: '2023-06-01', amount: '$29.99', status: 'Pending' },
  { id: 'INV-2023-0010', member: 'Lisa Jackson', date: '2023-06-05', amount: '$99.99', status: 'Overdue' }
];

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [invoices, setInvoices] = useState(invoicesData);
  
  // Filter invoices based on search term
  const filteredInvoices = invoices.filter(invoice => 
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    invoice.member.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Button variant="default">Generate New Invoice</Button>
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
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" /> Filter
        </Button>
      </div>

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
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.member}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                      <Button size="sm" variant="ghost" disabled={invoice.status !== 'Pending' && invoice.status !== 'Overdue'}>
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
      
      {filteredInvoices.length === 0 && (
        <div className="flex items-center justify-center h-32 border rounded-md bg-gray-50">
          <p className="text-gray-500">No invoices found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Invoices;
