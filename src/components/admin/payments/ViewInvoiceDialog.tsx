
import React, { forwardRef, useRef } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, Printer, Send } from 'lucide-react';
import { toast } from 'sonner';

interface InvoiceItem {
  service: string;
  description: string;
  quantity: number;
  price: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  member: string;
  memberEmail?: string;
  date: string;
  dueDate?: string;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  status: string;
  notes?: string;
}

interface ViewInvoiceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
}

export const ViewInvoiceDialog = forwardRef<HTMLDivElement, ViewInvoiceDialogProps>(
  ({ isOpen, onClose, invoice }, ref) => {
    const printRef = useRef<HTMLDivElement>(null);

    if (!invoice) return null;

    const handlePrint = () => {
      const printContent = printRef.current;
      if (!printContent) return;
      
      const originalContents = document.body.innerHTML;
      const printContents = printContent.innerHTML;
      
      document.body.innerHTML = `
        <div style="padding: 20px;">
          ${printContents}
        </div>
      `;
      
      window.print();
      document.body.innerHTML = originalContents;
      // Need to reopen the dialog after printing
      window.location.reload();
    };

    const handleDownload = () => {
      // In a real implementation, you would generate and download a PDF
      toast.success('Invoice downloaded successfully');
    };

    const handleSendEmail = () => {
      // In a real implementation, you would send an email with the invoice
      toast.success(`Invoice sent to ${invoice.memberEmail || invoice.member}`);
    };

    const getStatusColor = (status: string) => {
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

    const formatDate = (dateString: string) => {
      try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        }).format(date);
      } catch (e) {
        return dateString;
      }
    };

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[850px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>Invoice #{invoice.invoiceNumber}</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                {invoice.status}
              </span>
            </DialogTitle>
          </DialogHeader>

          <div className="flex justify-end gap-2 my-4">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
            <Button variant="outline" size="sm" onClick={handleSendEmail}>
              <Send className="mr-2 h-4 w-4" /> Send Email
            </Button>
          </div>

          <div ref={printRef} className="border rounded-md p-6 bg-white">
            <div className="flex justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">INVOICE</h2>
                <p className="text-gray-600">{invoice.invoiceNumber}</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl text-gym-orange">Uptown Gym</div>
                <p className="text-gray-600">123 Fitness Street</p>
                <p className="text-gray-600">Rwanda</p>
                <p className="text-gray-600">info@uptowngym.rw</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Bill To:</h3>
                <p className="font-medium">{invoice.member}</p>
                <p className="text-gray-600">{invoice.memberEmail || 'N/A'}</p>
              </div>
              <div className="md:text-right">
                <div className="mb-2">
                  <span className="font-bold text-gray-800">Invoice Date: </span>
                  <span>{formatDate(invoice.date)}</span>
                </div>
                {invoice.dueDate && (
                  <div className="mb-2">
                    <span className="font-bold text-gray-800">Due Date: </span>
                    <span>{formatDate(invoice.dueDate)}</span>
                  </div>
                )}
                <div>
                  <span className="font-bold text-gray-800">Status: </span>
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto mb-8">
              <table className="min-w-full border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-3 px-4 text-left font-semibold text-gray-700">Item</th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-700">Description</th>
                    <th className="py-3 px-4 text-center font-semibold text-gray-700">Qty</th>
                    <th className="py-3 px-4 text-right font-semibold text-gray-700">Price</th>
                    <th className="py-3 px-4 text-right font-semibold text-gray-700">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {invoice.items.map((item, index) => (
                    <tr key={index}>
                      <td className="py-3 px-4">{item.service}</td>
                      <td className="py-3 px-4">{item.description || '-'}</td>
                      <td className="py-3 px-4 text-center">{item.quantity}</td>
                      <td className="py-3 px-4 text-right">${item.price.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right">${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end mb-8">
              <div className="w-full max-w-xs">
                <div className="flex justify-between py-2">
                  <span className="font-medium">Subtotal:</span>
                  <span>${invoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Tax ({invoice.taxRate}%):</span>
                  <span>${invoice.taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 font-bold text-lg">
                  <span>Total:</span>
                  <span>${invoice.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {invoice.notes && (
              <div className="border-t pt-4">
                <h3 className="font-bold text-gray-800 mb-2">Notes:</h3>
                <p className="text-gray-600">{invoice.notes}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

ViewInvoiceDialog.displayName = 'ViewInvoiceDialog';
