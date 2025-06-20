
import React from 'react';
import { ShoppingBag, CreditCard, Dumbbell, Plus, Tag } from 'lucide-react';
import PlaceholderSection from '@/components/admin/PlaceholderSection';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AdminShop = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Shop Management</h1>
          <p className="text-gray-500">Manage your store products, orders, and promotions</p>
        </div>
        <Button 
          onClick={() => navigate('/admin/shop/add-product')}
          className="bg-gym-orange hover:bg-gym-orange/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Products Management Card */}
        <PlaceholderSection
          title="Products"
          icon={<ShoppingBag className="h-6 w-6 text-gym-orange" />}
          description="Manage your products catalog for both online and in-store sales."
          ctaText="Manage Products"
          onClick={() => navigate('/admin/shop/products')}
          features={[
            "View all products", 
            "Add/edit products", 
            "Manage inventory", 
            "Set visibility options"
          ]}
          className="hover:scale-[1.02] transition-transform"
        />
      
        {/* Categories Card */}
        <PlaceholderSection
          title="Categories"
          icon={<Tag className="h-6 w-6 text-gym-orange" />}
          description="Organize your products into categories for easier navigation."
          ctaText="Manage Categories"
          onClick={() => navigate('/admin/shop/categories')}
          features={[
            "View all categories", 
            "Create new categories", 
            "Edit category details", 
            "Organize product catalog"
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
