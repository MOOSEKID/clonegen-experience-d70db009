
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Settings, CreditCard, Tag, Package } from 'lucide-react';

const ShopSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Shop Settings</h1>
        <p className="text-gray-500">Configure your shop features, inventory alerts, and payment options</p>
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-gym-orange" />
                <span>General Settings</span>
              </CardTitle>
              <CardDescription>Configure shop modules and basic settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-ecommerce" className="text-base font-medium">Enable E-Commerce Store</Label>
                    <p className="text-sm text-gray-500">Allow online shopping through your public website</p>
                  </div>
                  <Switch id="enable-ecommerce" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-pos" className="text-base font-medium">Enable In-Store POS</Label>
                    <p className="text-sm text-gray-500">Process in-person sales and member tabs</p>
                  </div>
                  <Switch id="enable-pos" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-guest-checkout" className="text-base font-medium">Allow Guest Checkout</Label>
                    <p className="text-sm text-gray-500">Let non-members purchase without creating an account</p>
                  </div>
                  <Switch id="enable-guest-checkout" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-member-discounts" className="text-base font-medium">Show Member Discounts</Label>
                    <p className="text-sm text-gray-500">Display member pricing to non-members to encourage sign-ups</p>
                  </div>
                  <Switch id="show-member-discounts" />
                </div>
                
                <div className="pt-4">
                  <Button className="bg-gym-orange hover:bg-gym-orange/90">Save Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-gym-orange" />
                <span>Payment Settings</span>
              </CardTitle>
              <CardDescription>Configure payment methods and member credit limits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="default-currency" className="text-base font-medium">Default Currency</Label>
                  <div className="flex gap-2">
                    <Input id="default-currency" defaultValue="RWF" className="max-w-[120px]" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-stripe" className="text-base font-medium">Enable Stripe Payments</Label>
                    <p className="text-sm text-gray-500">Accept credit card payments online</p>
                  </div>
                  <Switch id="enable-stripe" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-mtn" className="text-base font-medium">Enable MTN MoMo</Label>
                    <p className="text-sm text-gray-500">Accept mobile money payments</p>
                  </div>
                  <Switch id="enable-mtn" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-member-tab" className="text-base font-medium">Enable Member Tabs</Label>
                    <p className="text-sm text-gray-500">Allow members to charge purchases to their account</p>
                  </div>
                  <Switch id="enable-member-tab" defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="credit-limit" className="text-base font-medium">Default Member Credit Limit</Label>
                  <div className="flex gap-2">
                    <Input id="credit-limit" type="number" defaultValue="5000" className="max-w-[200px]" />
                    <span className="self-center">RWF</span>
                  </div>
                  <p className="text-sm text-gray-500">Maximum unpaid balance allowed for standard members</p>
                </div>
                
                <div className="pt-4">
                  <Button className="bg-gym-orange hover:bg-gym-orange/90">Save Payment Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-gym-orange" />
                <span>Inventory Settings</span>
              </CardTitle>
              <CardDescription>Configure inventory alerts and stock management</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-inventory" className="text-base font-medium">Enable Inventory Tracking</Label>
                    <p className="text-sm text-gray-500">Keep track of product stock levels</p>
                  </div>
                  <Switch id="enable-inventory" defaultChecked />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="low-stock" className="text-base font-medium">Low Stock Alert Threshold</Label>
                  <Input id="low-stock" type="number" defaultValue="10" className="max-w-[120px]" />
                  <p className="text-sm text-gray-500">Items with stock below this number will trigger an alert</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-alerts" className="text-base font-medium">Email Low Stock Alerts</Label>
                    <p className="text-sm text-gray-500">Send email notifications for low stock items</p>
                  </div>
                  <Switch id="email-alerts" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="hide-out-of-stock" className="text-base font-medium">Hide Out-of-Stock Items</Label>
                    <p className="text-sm text-gray-500">Remove items from the store when out of stock</p>
                  </div>
                  <Switch id="hide-out-of-stock" />
                </div>
                
                <div className="pt-4">
                  <Button className="bg-gym-orange hover:bg-gym-orange/90">Save Inventory Settings</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShopSettings;
