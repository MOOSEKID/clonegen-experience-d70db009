
import React, { useState, useEffect } from 'react';
import { 
  Receipt, 
  CreditCard, 
  DollarSign, 
  Plus, 
  Search, 
  Calendar,
  MoreVertical,
  Download,
  Mail,
  Eye,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Payment {
  id: string;
  amount: number;
  currency: string;
  payment_type: string;
  payment_method: string;
  status: string;
  created_at: string;
  transaction_id: string;
  member?: {
    name: string;
    email: string;
  };
  company?: {
    companyname: string;
    companyemail: string;
  };
}

const AdminPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Fetch payments data
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('payments')
          .select(`
            *,
            member:member_id (name, email),
            company:company_id (companyname, companyemail)
          `)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        setPayments(data || []);
      } catch (error) {
        console.error('Error fetching payments:', error);
        toast.error('Failed to load payment data');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPayments();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('payments-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'payments' }, 
        () => {
          console.log('Payments table change detected');
          fetchPayments();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
  // Filter and sort payments
  const filteredPayments = payments
    .filter(payment => {
      const matchesSearch = 
        (payment.member?.name && payment.member.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (payment.member?.email && payment.member.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (payment.company?.companyname && payment.company.companyname.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (payment.transaction_id && payment.transaction_id.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter ? payment.status === statusFilter : true;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
  
  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };
  
  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'Failed':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'Refunded':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Payments</h1>
          <p className="text-gray-500">Manage subscriptions, invoices, and payment processing</p>
        </div>
        <Button 
          className="bg-gym-orange hover:bg-gym-orange/90"
          onClick={() => toast.info('Create payment functionality coming soon')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Payment Transactions</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name, email..." 
                  className="pl-8" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    {statusFilter || "All Statuses"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                    All Statuses
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Completed')}>
                    Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Pending')}>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Failed')}>
                    Failed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Refunded')}>
                    Refunded
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Payment Type</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>
                      <Button 
                        variant="ghost" 
                        className="p-0 h-8"
                        onClick={toggleSortDirection}
                      >
                        Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No payments found. Try changing your search criteria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {payment.member?.name || payment.company?.companyname || 'Unknown'}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {payment.member?.email || payment.company?.companyemail || 'No email'}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {payment.payment_type || 'Unknown'}
                        </TableCell>
                        <TableCell>
                          {payment.payment_method || 'Unknown'}
                        </TableCell>
                        <TableCell>
                          {payment.created_at ? format(new Date(payment.created_at), 'MMM d, yyyy') : 'Unknown'}
                        </TableCell>
                        <TableCell className="font-medium">
                          {formatCurrency(payment.amount, payment.currency)}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(payment.status)}>
                            {payment.status || 'Unknown'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => toast.info('View details functionality coming soon')}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.info('Download receipt functionality coming soon')}>
                                <Download className="mr-2 h-4 w-4" />
                                Download Receipt
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.info('Send receipt functionality coming soon')}>
                                <Mail className="mr-2 h-4 w-4" />
                                Send Receipt
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Receipt className="h-5 w-5 text-gym-orange mr-2" />
              Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Manage recurring membership plans, payment cycles, and subscription status.
            </p>
            <div className="mt-4">
              <Button variant="outline" className="w-full" onClick={() => toast.info('Feature coming soon')}>
                Manage Subscriptions
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 text-gym-orange mr-2" />
              Invoices & Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Process payments, generate invoices, and view payment history.
            </p>
            <div className="mt-4">
              <Button variant="outline" className="w-full" onClick={() => toast.info('Feature coming soon')}>
                View Invoices
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 text-gym-orange mr-2" />
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Configure payment gateways, processing fees, and supported payment methods.
            </p>
            <div className="mt-4">
              <Button variant="outline" className="w-full" onClick={() => toast.info('Feature coming soon')}>
                Configure Payments
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPayments;
