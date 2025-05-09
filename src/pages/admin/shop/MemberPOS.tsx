
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Search, User, BarChart } from 'lucide-react';
import { Input } from '@/components/ui/input';

const MemberPOS = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">In-Store POS System</h1>
          <p className="text-gray-500">Process in-person sales and manage member tabs</p>
        </div>
        <Button
          variant="default"
          className="bg-gym-orange hover:bg-gym-orange/90"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          New Sale
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-gym-orange" />
            <span>Member Lookup</span>
          </CardTitle>
          <CardDescription>Search for a member to charge items to their tab</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or scan card..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline">Scan Card</Button>
            <Button variant="default" className="bg-gym-orange hover:bg-gym-orange/90">Search</Button>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="today">Today's Sales</TabsTrigger>
          <TabsTrigger value="unpaid">Unpaid Tabs</TabsTrigger>
          <TabsTrigger value="summary">Daily Summary</TabsTrigger>
        </TabsList>
        
        <TabsContent value="today" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-gym-orange" />
                <span>Today's Sales</span>
              </CardTitle>
              <CardDescription>All sales processed today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center">
                <p className="text-gray-500">
                  This is a placeholder for today's sales records.
                  Here you would see a list of all transactions processed today.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="unpaid" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-gym-orange" />
                <span>Unpaid Member Tabs</span>
              </CardTitle>
              <CardDescription>Members with outstanding balances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center">
                <p className="text-gray-500">
                  This is a placeholder for the unpaid member tabs.
                  Here you would see a list of members with outstanding balances.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="summary" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-gym-orange" />
                <span>Daily Sales Summary</span>
              </CardTitle>
              <CardDescription>Overview of today's sales performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center">
                <p className="text-gray-500">
                  This is a placeholder for the daily sales summary.
                  Here you would see charts and metrics about today's sales performance.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MemberPOS;
