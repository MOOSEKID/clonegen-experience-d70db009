
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingBag, CreditCard } from 'lucide-react';

const MemberPurchases = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Purchase History</h2>
          <p className="text-gray-500">View and manage member purchases</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <CreditCard className="mr-2 h-4 w-4" />
            Settle Tab
          </Button>
          <Button className="bg-gym-orange hover:bg-gym-orange/90">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add Purchase
          </Button>
        </div>
      </div>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between">
            <div className="flex items-center">
              <span>Current Tab</span>
            </div>
            <Badge variant="destructive">5,000 RWF</Badge>
          </CardTitle>
          <CardDescription>Outstanding balance on member account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <div>
                <div className="font-medium">Protein Shake</div>
                <div className="text-sm text-gray-500">2023-05-01 • Charged to Tab</div>
              </div>
              <div className="font-medium">2,500 RWF</div>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <div>
                <div className="font-medium">Gym Towel</div>
                <div className="text-sm text-gray-500">2023-05-01 • Charged to Tab</div>
              </div>
              <div className="font-medium">1,500 RWF</div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Water Bottle</div>
                <div className="text-sm text-gray-500">2023-04-28 • Charged to Tab</div>
              </div>
              <div className="font-medium">1,000 RWF</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="all">All Purchases</TabsTrigger>
          <TabsTrigger value="online">Online Orders</TabsTrigger>
          <TabsTrigger value="instore">In-Store</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-gym-orange" />
                <span>Purchase History</span>
              </CardTitle>
              <CardDescription>Complete record of member purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-4">
                  <div>
                    <div className="font-medium">Gym Gloves</div>
                    <div className="text-sm text-gray-500">2023-04-15 • Paid with Credit Card</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">4,000 RWF</div>
                    <Badge variant="outline" className="bg-green-50">Paid</Badge>
                  </div>
                </div>
                
                <div className="flex justify-between items-center border-b pb-4">
                  <div>
                    <div className="font-medium">Shaker Bottle</div>
                    <div className="text-sm text-gray-500">2023-03-22 • Paid with MTN MoMo</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">3,000 RWF</div>
                    <Badge variant="outline" className="bg-green-50">Paid</Badge>
                  </div>
                </div>
                
                <div className="flex justify-between items-center border-b pb-4">
                  <div>
                    <div className="font-medium">Protein Powder (500g)</div>
                    <div className="text-sm text-gray-500">2023-03-10 • Online Order • Delivered</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">15,000 RWF</div>
                    <Badge variant="outline" className="bg-green-50">Paid</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="online" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Online Orders</CardTitle>
              <CardDescription>Purchases made through the online store</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center">
                <p className="text-gray-500">
                  This tab would display only online orders made by the member.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="instore" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>In-Store Purchases</CardTitle>
              <CardDescription>Purchases made at the physical location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center">
                <p className="text-gray-500">
                  This tab would display only in-store purchases made by the member.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MemberPurchases;
