
import { Receipt, CreditCard, DollarSign } from 'lucide-react';
import PlaceholderSection from '@/components/admin/PlaceholderSection';
import { useNavigate } from 'react-router-dom';

const AdminPayments = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Payments</h1>
        <p className="text-gray-500">Manage subscriptions, invoices, and payment processing</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PlaceholderSection
          title="Subscriptions"
          icon={<Receipt className="h-6 w-6 text-gym-orange" />}
          description="Manage recurring membership plans, payment cycles, and subscription status."
          onClick={() => navigate('/admin/payments/subscriptions')}
        />
        
        <PlaceholderSection
          title="Invoices & Payments"
          icon={<DollarSign className="h-6 w-6 text-gym-orange" />}
          description="Process payments, generate invoices, and view payment history."
          onClick={() => navigate('/admin/payments/invoices')}
        />
        
        <PlaceholderSection
          title="Payment Methods"
          icon={<CreditCard className="h-6 w-6 text-gym-orange" />}
          description="Configure payment gateways, processing fees, and supported payment methods."
          onClick={() => navigate('/admin/payments/methods')}
        />
      </div>
    </div>
  );
};

export default AdminPayments;
