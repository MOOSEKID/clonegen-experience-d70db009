
import { ShoppingBag, Package, Tag } from 'lucide-react';
import PlaceholderSection from '@/components/admin/PlaceholderSection';

const AdminShop = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Shop</h1>
        <p className="text-gray-500">Manage your gym's e-commerce store</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PlaceholderSection
          title="Products"
          icon={<ShoppingBag className="h-6 w-6 text-gym-orange" />}
          description="Manage products, categories, pricing, and inventory for your online store."
        />
        
        <PlaceholderSection
          title="Orders"
          icon={<Package className="h-6 w-6 text-gym-orange" />}
          description="Process and fulfill orders, track shipping, and manage returns."
        />
        
        <PlaceholderSection
          title="Promotions"
          icon={<Tag className="h-6 w-6 text-gym-orange" />}
          description="Create and manage discounts, coupons, and special offers for products."
        />
      </div>
    </div>
  );
};

export default AdminShop;
