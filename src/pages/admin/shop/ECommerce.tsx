
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Package, Tag, Clock } from 'lucide-react';

const ECommerce = () => {
  const [activeTab, setActiveTab] = useState('products');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">E-Commerce Management</h1>
          <p className="text-gray-500">Manage your online store products, orders, and promotions</p>
        </div>
        <Button
          variant="default"
          className="bg-gym-orange hover:bg-gym-orange/90"
          onClick={() => window.open('/shop', '_blank')}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          Visit Store
        </Button>
      </div>
      
      <Tabs defaultValue="products" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-gym-orange" />
                <span>Product Management</span>
              </CardTitle>
              <CardDescription>Manage your online store products and inventory</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center">
                <p className="text-gray-500">
                  This is a placeholder for the E-Commerce product management interface. 
                  Here you would be able to add, edit, and manage your online store products.
                </p>
                <div className="mt-6 flex justify-center space-x-4">
                  <Button variant="outline">Add New Product</Button>
                  <Button variant="outline">Import Products</Button>
                  <Button variant="outline">Export Products</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-gym-orange" />
                <span>Order Management</span>
              </CardTitle>
              <CardDescription>Track and fulfill customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center">
                <p className="text-gray-500">
                  This is a placeholder for the E-Commerce order management interface.
                  Here you would be able to view, process, and track customer orders.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="promotions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-gym-orange" />
                <span>Promotions & Discounts</span>
              </CardTitle>
              <CardDescription>Create and manage special offers and discount codes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center">
                <p className="text-gray-500">
                  This is a placeholder for the promotions and discounts management interface.
                  Here you would be able to create discount codes, bundle offers, and promotions.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gym-orange" />
                <span>Sales Analytics</span>
              </CardTitle>
              <CardDescription>Track and analyze your store performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center">
                <p className="text-gray-500">
                  This is a placeholder for the E-Commerce analytics interface.
                  Here you would be able to view sales reports, customer metrics, and performance data.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ECommerce;
