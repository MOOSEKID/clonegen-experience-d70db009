
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Settings, CreditCard, Tag, Package, Loader2 } from 'lucide-react';
import { useShopSettings, SaveState, ShopSettingsUpdateData } from '@/hooks/admin/useShopSettings';

const ShopSettings = () => {
  const { settings, loading, saveState, updateSettings } = useShopSettings();
  const [generalForm, setGeneralForm] = useState({
    enable_ecommerce: true,
    enable_pos: true,
    enable_guest_checkout: true,
    show_member_discounts: false
  });
  
  const [paymentForm, setPaymentForm] = useState({
    default_currency: 'RWF',
    enable_stripe: true,
    enable_mtn: true,
    enable_member_tab: true,
    credit_limit: 5000
  });
  
  const [inventoryForm, setInventoryForm] = useState({
    enable_inventory: true,
    low_stock_threshold: 10,
    email_low_stock: true,
    hide_out_of_stock: false
  });
  
  // Initialize form data from settings
  useEffect(() => {
    if (settings) {
      setGeneralForm({
        enable_ecommerce: settings.enable_ecommerce,
        enable_pos: settings.enable_pos,
        enable_guest_checkout: settings.enable_guest_checkout,
        show_member_discounts: settings.show_member_discounts
      });
      
      setPaymentForm({
        default_currency: settings.default_currency,
        enable_stripe: settings.enable_stripe,
        enable_mtn: settings.enable_mtn,
        enable_member_tab: settings.enable_member_tab,
        credit_limit: settings.credit_limit
      });
      
      setInventoryForm({
        enable_inventory: settings.enable_inventory,
        low_stock_threshold: settings.low_stock_threshold,
        email_low_stock: settings.email_low_stock,
        hide_out_of_stock: settings.hide_out_of_stock
      });
    }
  }, [settings]);
  
  const handleSaveGeneralSettings = () => {
    updateSettings(generalForm);
  };
  
  const handleSavePaymentSettings = () => {
    updateSettings(paymentForm);
  };
  
  const handleSaveInventorySettings = () => {
    updateSettings(inventoryForm);
  };
  
  if (loading) {
    return (
      <div className="w-full p-12 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-gym-orange animate-spin" />
        <p className="mt-4 text-gray-500">Loading shop settings...</p>
      </div>
    );
  }

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
                  <Switch 
                    id="enable-ecommerce" 
                    checked={generalForm.enable_ecommerce} 
                    onCheckedChange={(checked) => setGeneralForm(prev => ({ ...prev, enable_ecommerce: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-pos" className="text-base font-medium">Enable In-Store POS</Label>
                    <p className="text-sm text-gray-500">Process in-person sales and member tabs</p>
                  </div>
                  <Switch 
                    id="enable-pos" 
                    checked={generalForm.enable_pos} 
                    onCheckedChange={(checked) => setGeneralForm(prev => ({ ...prev, enable_pos: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-guest-checkout" className="text-base font-medium">Allow Guest Checkout</Label>
                    <p className="text-sm text-gray-500">Let non-members purchase without creating an account</p>
                  </div>
                  <Switch 
                    id="enable-guest-checkout" 
                    checked={generalForm.enable_guest_checkout} 
                    onCheckedChange={(checked) => setGeneralForm(prev => ({ ...prev, enable_guest_checkout: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-member-discounts" className="text-base font-medium">Show Member Discounts</Label>
                    <p className="text-sm text-gray-500">Display member pricing to non-members to encourage sign-ups</p>
                  </div>
                  <Switch 
                    id="show-member-discounts" 
                    checked={generalForm.show_member_discounts} 
                    onCheckedChange={(checked) => setGeneralForm(prev => ({ ...prev, show_member_discounts: checked }))}
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    className="bg-gym-orange hover:bg-gym-orange/90"
                    onClick={handleSaveGeneralSettings}
                    disabled={saveState === SaveState.Saving}
                  >
                    {saveState === SaveState.Saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : "Save Settings"}
                  </Button>
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
                    <Input 
                      id="default-currency" 
                      value={paymentForm.default_currency} 
                      onChange={(e) => setPaymentForm(prev => ({ ...prev, default_currency: e.target.value }))}
                      className="max-w-[120px]" 
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-stripe" className="text-base font-medium">Enable Stripe Payments</Label>
                    <p className="text-sm text-gray-500">Accept credit card payments online</p>
                  </div>
                  <Switch 
                    id="enable-stripe" 
                    checked={paymentForm.enable_stripe} 
                    onCheckedChange={(checked) => setPaymentForm(prev => ({ ...prev, enable_stripe: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-mtn" className="text-base font-medium">Enable MTN MoMo</Label>
                    <p className="text-sm text-gray-500">Accept mobile money payments</p>
                  </div>
                  <Switch 
                    id="enable-mtn" 
                    checked={paymentForm.enable_mtn} 
                    onCheckedChange={(checked) => setPaymentForm(prev => ({ ...prev, enable_mtn: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enable-member-tab" className="text-base font-medium">Enable Member Tabs</Label>
                    <p className="text-sm text-gray-500">Allow members to charge purchases to their account</p>
                  </div>
                  <Switch 
                    id="enable-member-tab" 
                    checked={paymentForm.enable_member_tab} 
                    onCheckedChange={(checked) => setPaymentForm(prev => ({ ...prev, enable_member_tab: checked }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="credit-limit" className="text-base font-medium">Default Member Credit Limit</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="credit-limit" 
                      type="number" 
                      value={paymentForm.credit_limit} 
                      onChange={(e) => setPaymentForm(prev => ({ ...prev, credit_limit: parseFloat(e.target.value) }))}
                      className="max-w-[200px]" 
                    />
                    <span className="self-center">RWF</span>
                  </div>
                  <p className="text-sm text-gray-500">Maximum unpaid balance allowed for standard members</p>
                </div>
                
                <div className="pt-4">
                  <Button 
                    className="bg-gym-orange hover:bg-gym-orange/90"
                    onClick={handleSavePaymentSettings}
                    disabled={saveState === SaveState.Saving}
                  >
                    {saveState === SaveState.Saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : "Save Payment Settings"}
                  </Button>
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
                  <Switch 
                    id="enable-inventory" 
                    checked={inventoryForm.enable_inventory} 
                    onCheckedChange={(checked) => setInventoryForm(prev => ({ ...prev, enable_inventory: checked }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="low-stock" className="text-base font-medium">Low Stock Alert Threshold</Label>
                  <Input 
                    id="low-stock" 
                    type="number" 
                    value={inventoryForm.low_stock_threshold} 
                    onChange={(e) => setInventoryForm(prev => ({ ...prev, low_stock_threshold: parseInt(e.target.value) }))}
                    className="max-w-[120px]" 
                  />
                  <p className="text-sm text-gray-500">Items with stock below this number will trigger an alert</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-alerts" className="text-base font-medium">Email Low Stock Alerts</Label>
                    <p className="text-sm text-gray-500">Send email notifications for low stock items</p>
                  </div>
                  <Switch 
                    id="email-alerts" 
                    checked={inventoryForm.email_low_stock} 
                    onCheckedChange={(checked) => setInventoryForm(prev => ({ ...prev, email_low_stock: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="hide-out-of-stock" className="text-base font-medium">Hide Out-of-Stock Items</Label>
                    <p className="text-sm text-gray-500">Remove items from the store when out of stock</p>
                  </div>
                  <Switch 
                    id="hide-out-of-stock" 
                    checked={inventoryForm.hide_out_of_stock} 
                    onCheckedChange={(checked) => setInventoryForm(prev => ({ ...prev, hide_out_of_stock: checked }))}
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    className="bg-gym-orange hover:bg-gym-orange/90"
                    onClick={handleSaveInventorySettings}
                    disabled={saveState === SaveState.Saving}
                  >
                    {saveState === SaveState.Saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : "Save Inventory Settings"}
                  </Button>
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
