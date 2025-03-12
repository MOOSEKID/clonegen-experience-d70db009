
import { useState } from 'react';
import { 
  ShoppingBag, 
  Package, 
  Tag, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  ChevronDown,
  ArrowUpDown,
  ImageIcon,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { toast } from 'sonner';
import PlaceholderSection from '@/components/admin/PlaceholderSection';

// Mock product data
const mockProducts = [
  { 
    id: 1, 
    name: 'Premium Whey Protein',
    image: '/placeholder.svg',
    category: 'Supplements',
    price: 35000,
    stock: 78,
    status: 'In Stock',
    lastUpdated: '2023-06-15',
  },
  { 
    id: 2, 
    name: 'Neoprene Dumbbell Set',
    image: '/placeholder.svg',
    category: 'Equipment',
    price: 45000,
    stock: 23,
    status: 'In Stock',
    lastUpdated: '2023-06-10',
  },
  { 
    id: 3, 
    name: 'Compression Shorts',
    image: '/placeholder.svg',
    category: 'Apparel',
    price: 18000,
    stock: 45,
    status: 'In Stock',
    lastUpdated: '2023-06-12',
  },
  { 
    id: 4, 
    name: 'Fitness Resistance Bands',
    image: '/placeholder.svg',
    category: 'Equipment',
    price: 15000,
    stock: 0,
    status: 'Out of Stock',
    lastUpdated: '2023-06-08',
  },
  { 
    id: 5, 
    name: 'BCAA Supplement',
    image: '/placeholder.svg',
    category: 'Supplements',
    price: 25000,
    stock: 15,
    status: 'Low Stock',
    lastUpdated: '2023-06-14',
  },
];

// Convert number to formatted currency (RWF)
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const AdminShop = () => {
  const [currentTab, setCurrentTab] = useState('products');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(mockProducts);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (productId: number, newStatus: string) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, status: newStatus } : product
    ));
    toast.success(`Product status updated to ${newStatus}`);
  };

  const handleDelete = (productId: number) => {
    setProducts(products.filter(product => product.id !== productId));
    toast.success('Product deleted successfully');
  };

  const toggleProductSelection = (productId: number) => {
    setSelectedProducts(prevSelected => 
      prevSelected.includes(productId)
        ? prevSelected.filter(id => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const selectAllProducts = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(product => product.id));
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Shop</h1>
          <p className="text-gray-500">Manage your gym's e-commerce store</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="default" 
            size="sm" 
            className={`gap-2 ${currentTab === 'products' ? 'bg-gym-orange' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setCurrentTab('products')}
          >
            <ShoppingBag size={16} />
            <span>Products</span>
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className={`gap-2 ${currentTab === 'orders' ? 'bg-gym-orange' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setCurrentTab('orders')}
          >
            <Package size={16} />
            <span>Orders</span>
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className={`gap-2 ${currentTab === 'promotions' ? 'bg-gym-orange' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setCurrentTab('promotions')}
          >
            <Tag size={16} />
            <span>Promotions</span>
          </Button>
        </div>
      </div>
      
      {currentTab === 'products' ? (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:border-gym-orange"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex gap-2">
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
                  <DropdownMenuItem>Out of Stock</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Supplements</DropdownMenuItem>
                  <DropdownMenuItem>Equipment</DropdownMenuItem>
                  <DropdownMenuItem>Apparel</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button size="sm" className="gap-2">
                <Plus size={16} />
                <span>Add Product</span>
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 text-gym-orange focus:ring-gym-orange"
                      checked={selectedProducts.length === products.length && products.length > 0}
                      onChange={selectAllProducts}
                    />
                  </TableHead>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <span>Price</span>
                      <ArrowUpDown size={14} className="text-gray-500" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-1">
                      <span>Stock</span>
                      <ArrowUpDown size={14} className="text-gray-500" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-gym-orange focus:ring-gym-orange"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => toggleProductSelection(product.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center">
                          <ImageIcon size={18} className="text-gray-400" />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>{formatCurrency(product.price)}</TableCell>
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
                      <TableCell>{product.lastUpdated}</TableCell>
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
                            {product.status === 'In Stock' || product.status === 'Low Stock' ? (
                              <DropdownMenuItem onClick={() => handleStatusChange(product.id, 'Out of Stock')}>
                                <Tag className="mr-2 h-4 w-4" />
                                <span>Mark Out of Stock</span>
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => handleStatusChange(product.id, 'In Stock')}>
                                <Tag className="mr-2 h-4 w-4" />
                                <span>Mark In Stock</span>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDelete(product.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No products found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="p-4 border-t border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {filteredProducts.length} of {products.length} products
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
      ) : currentTab === 'orders' ? (
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Manage customer orders and fulfillment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                <div className="text-center py-8">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Orders will appear here once customers start making purchases.
                  </p>
                  <div className="mt-6">
                    <Button size="sm">Create Test Order</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Total Orders</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Completed</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Processing</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Cancelled</span>
                    <span className="font-medium">0</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-24">
                  <DollarSign className="h-8 w-8 text-gym-orange mb-2" />
                  <div className="text-2xl font-bold">{formatCurrency(0)}</div>
                  <div className="text-sm text-gray-500">Total Revenue</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500">
                    No data available yet
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PlaceholderSection
            title="Discounts"
            icon={<Tag className="h-6 w-6 text-gym-orange" />}
            description="Create percentage or fixed amount discounts on products or categories."
          />
          
          <PlaceholderSection
            title="Coupon Codes"
            icon={<Tag className="h-6 w-6 text-gym-orange" />}
            description="Generate and manage coupon codes for special promotions and campaigns."
          />
          
          <PlaceholderSection
            title="Bundle Offers"
            icon={<Package className="h-6 w-6 text-gym-orange" />}
            description="Create product bundles with special pricing to increase average order value."
          />
        </div>
      )}
    </div>
  );
};

export default AdminShop;
