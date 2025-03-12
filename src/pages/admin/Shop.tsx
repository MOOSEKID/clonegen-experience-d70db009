
import { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  ChevronDown,
  Edit,
  Trash2,
  Package,
  ShoppingBag,
  Percent,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/Button';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PlaceholderSection from '@/components/admin/PlaceholderSection';

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: 'Premium Whey Protein',
    category: 'Supplements',
    price: 29500,
    stock: 45,
    status: 'In Stock',
  },
  {
    id: 2,
    name: 'Adjustable Dumbbells Set',
    category: 'Equipment',
    price: 175000,
    stock: 12,
    status: 'In Stock',
  },
  {
    id: 3,
    name: 'Compression Workout Shirt',
    category: 'Apparel',
    price: 18000,
    stock: 30,
    status: 'In Stock',
  },
  {
    id: this.id = 4,
    name: 'Pre-Workout Energy Blend',
    category: 'Supplements',
    price: 22000,
    stock: 2,
    status: 'Low Stock',
  },
  {
    id: 5,
    name: 'Yoga Mat - Premium',
    category: 'Equipment',
    price: 27500,
    stock: 0,
    status: 'Out of Stock',
  },
];

// Mock order data
const mockOrders = [
  {
    id: "ORD-001",
    date: "2023-06-15",
    customer: "John Smith",
    total: 74500,
    status: "Completed",
    items: 3
  },
  {
    id: "ORD-002",
    date: "2023-06-14",
    customer: "Sarah Johnson",
    total: 175000,
    status: "Processing",
    items: 1
  },
  {
    id: "ORD-003",
    date: "2023-06-13",
    customer: "Michael Brown",
    total: 40000,
    status: "Completed",
    items: 2
  },
];

// Mock promotions data
const mockPromotions = [
  {
    id: 1,
    code: "SUMMER23",
    discount: "20%",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    status: "Active"
  },
  {
    id: 2,
    code: "WELCOME10",
    discount: "10%",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    status: "Active"
  },
  {
    id: 3,
    code: "FLASH30",
    discount: "30%",
    startDate: "2023-05-15",
    endDate: "2023-05-18",
    status: "Expired"
  }
];

const AdminShop = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Shop Management</h1>
          <p className="text-gray-500">Manage your store products, orders, and promotions</p>
        </div>
      </div>

      <Tabs defaultValue="products" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="products" className="gap-2">
            <Package size={16} />
            <span>Products</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="gap-2">
            <ShoppingBag size={16} />
            <span>Orders</span>
          </TabsTrigger>
          <TabsTrigger value="promotions" className="gap-2">
            <Percent size={16} />
            <span>Promotions</span>
          </TabsTrigger>
        </TabsList>

        {/* Products Tab */}
        <TabsContent value="products">
          <div className="flex justify-between mb-4">
            <Button variant="primary" size="sm" className="gap-2">
              <Plus size={16} />
              <span>Add Product</span>
            </Button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:border-gym-orange"
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter size={16} />
                    <span>Filter</span>
                    <ChevronDown size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>All Products</DropdownMenuItem>
                  <DropdownMenuItem>In Stock</DropdownMenuItem>
                  <DropdownMenuItem>Low Stock</DropdownMenuItem>
                  <DropdownMenuItem>Out of Stock</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Supplements</DropdownMenuItem>
                  <DropdownMenuItem>Equipment</DropdownMenuItem>
                  <DropdownMenuItem>Apparel</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{product.price.toLocaleString()} RWF</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                          ${product.status === 'In Stock' 
                            ? 'bg-green-100 text-green-800' 
                            : product.status === 'Low Stock'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'}`}
                        >
                          {product.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <ChevronDown size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <RotateCcw className="mr-2 h-4 w-4" />
                              <span>Update Stock</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="p-4 border-t border-gray-200 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                Showing 5 of 5 products
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Total Revenue</CardTitle>
                <CardDescription>This month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">289,500 RWF</div>
                <p className="text-sm text-green-600">↑ 12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Orders</CardTitle>
                <CardDescription>This month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-sm text-green-600">↑ 5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Average Order</CardTitle>
                <CardDescription>This month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">19,300 RWF</div>
                <p className="text-sm text-green-600">↑ 7% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:border-gym-orange"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>{order.total.toLocaleString()} RWF</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                          ${order.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'}`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <ChevronDown size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        {/* Promotions Tab */}
        <TabsContent value="promotions">
          <div className="flex justify-between mb-4">
            <Button variant="primary" size="sm" className="gap-2">
              <Plus size={16} />
              <span>Create Promotion</span>
            </Button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPromotions.map((promotion) => (
                    <TableRow key={promotion.id}>
                      <TableCell className="font-medium">{promotion.code}</TableCell>
                      <TableCell>{promotion.discount}</TableCell>
                      <TableCell>{promotion.startDate}</TableCell>
                      <TableCell>{promotion.endDate}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                          ${promotion.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'}`}
                        >
                          {promotion.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <ChevronDown size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminShop;
