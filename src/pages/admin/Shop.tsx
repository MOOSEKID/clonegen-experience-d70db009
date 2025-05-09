
import React from 'react';
import { ShoppingBag, CreditCard, Dumbbell } from 'lucide-react';
import PlaceholderSection from '@/components/admin/PlaceholderSection';
import { useNavigate } from 'react-router-dom';

const AdminShop = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Shop Management</h1>
        <p className="text-gray-500">Manage your store products, orders, and promotions</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* E-Commerce Store Card */}
        <PlaceholderSection
          title="E-Commerce Store"
          icon={<ShoppingBag className="h-6 w-6 text-gym-orange" />}
          description="Sell your gym products online to the public and logged-in members."
          ctaText="Manage E-Commerce"
          onClick={() => navigate('/admin/shop/ecommerce')}
          features={[
            "Product catalog management", 
            "Online checkout with Stripe/MTN MoMo", 
            "Delivery options", 
            "Promo code support"
          ]}
          className="hover:scale-[1.02] transition-transform"
        />
        
        {/* In-Store POS Card */}
        <PlaceholderSection
          title="In-Store Sales / Member Tab"
          icon={
            <div className="flex items-center space-x-1">
              <CreditCard className="h-6 w-6 text-gym-orange" />
              <Dumbbell className="h-5 w-5 text-gym-orange/70" />
            </div>
          }
          description="Track in-gym purchases and let staff charge items to member accounts."
          ctaText="Launch POS System"
          onClick={() => navigate('/admin/shop/member-pos')}
          features={[
            "Member search/scan", 
            "Charge to member tab", 
            "Track unpaid balances", 
            "Daily sales summary"
          ]}
          className="hover:scale-[1.02] transition-transform"
        />
      </div>
      
      {/* Settings Card */}
      <div className="mt-8">
        <PlaceholderSection
          title="Shop Settings"
          icon={<ShoppingBag className="h-6 w-6 text-gym-orange" />}
          description="Configure your shop settings, discounts, and inventory alerts."
          ctaText="Manage Settings"
          onClick={() => navigate('/admin/shop/settings')}
          features={[
            "Enable/disable features", 
            "Set credit limits by membership", 
            "Configure discounts", 
            "Inventory management"
          ]}
          className="max-w-xl"
        />
      </div>
    </div>
  );
};

export default AdminShop;
