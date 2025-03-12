import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlaceholderSection from '@/components/admin/PlaceholderSection';

// This is just a placeholder component
// In a real app, this would be fetching data from an API
const AdminShop = () => {
  const [activeTab, setActiveTab] = useState('products');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Shop Management</h1>
        <p className="text-gray-500">Manage your store products, orders, and promotions</p>
      </div>
      
      <Tabs defaultValue="products" className="w-full" onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="mt-6">
          <PlaceholderSection 
            title="Product Management" 
            description="Here you can manage all your gym products, supplements, and merchandise."
            ctaText="Add New Product"
            features={[
              "Inventory Management",
              "Product Categories",
              "Price Management",
              "Product Images"
            ]}
          />
        </TabsContent>
        
        <TabsContent value="orders" className="mt-6">
          <PlaceholderSection 
            title="Order Management" 
            description="Track and manage customer orders, process refunds, and check delivery status."
            ctaText="View All Orders"
            features={[
              "Order Processing",
              "Payment Status",
              "Shipping Tracking",
              "Order History"
            ]}
          />
        </TabsContent>
        
        <TabsContent value="promotions" className="mt-6">
          <PlaceholderSection 
            title="Promotions & Discounts" 
            description="Create and manage special offers, discount codes, and promotional campaigns."
            ctaText="Create Promotion"
            features={[
              "Discount Codes",
              "Bundle Offers",
              "Seasonal Promotions",
              "Member-only Deals"
            ]}
          />
        </TabsContent>
      </Tabs>
      
      {/* Display different content based on the active tab */}
      {activeTab && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          {activeTab === 'products' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
              {/* Product management content would go here */}
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
              {/* Order management content would go here */}
            </div>
          )}
          
          {activeTab === 'promotions' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Active Promotions</h2>
              {/* Promotions management content would go here */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminShop;
