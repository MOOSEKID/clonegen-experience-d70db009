
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts, Product } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  PenLine, 
  Trash2, 
  Loader2,
  Filter,
  ShoppingBag,
  Store,
  Eye,
  EyeOff
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const Products = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const { useProductsQuery, useDeleteProductMutation } = useProducts();
  const { data: products = [], isLoading } = useProductsQuery();
  const deleteMutation = useDeleteProductMutation();

  const handleDeleteProduct = async (id: string, productName: string) => {
    if (window.confirm(`Are you sure you want to delete the product "${productName}"?`)) {
      try {
        await deleteMutation.mutateAsync(id);
        toast({
          title: "Product deleted",
          description: `"${productName}" has been successfully deleted.`,
        });
      } catch (error) {
        toast({
          title: "Error deleting product",
          description: "There was a problem deleting the product. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  // Filter products based on search query and active tab
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (product.description?.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
                          
    if (activeTab === 'all') {
      return matchesSearch;
    } else if (activeTab === 'ecommerce') {
      return matchesSearch && product.is_public;
    } else if (activeTab === 'instore') {
      return matchesSearch && product.is_instore;
    } else if (activeTab === 'inactive') {
      return matchesSearch && !product.is_active;
    }
    
    return matchesSearch;
  });

  // Format price to RWF
  const formatPrice = (price: number) => {
    return `RWF ${price.toLocaleString()}`;
  };

  // Function to get visibility status badges
  const getVisibilityBadges = (product: Product) => {
    const badges = [];
    
    if (product.is_public) {
      badges.push(
        <Badge key="public" variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
          <Eye className="h-3 w-3 mr-1" /> E-commerce
        </Badge>
      );
    }
    
    if (product.is_instore) {
      badges.push(
        <Badge key="instore" variant="outline" className="border-green-200 bg-green-50 text-green-700">
          <Store className="h-3 w-3 mr-1" /> In-store
        </Badge>
      );
    }
    
    if (!product.is_public && !product.is_instore) {
      badges.push(
        <Badge key="hidden" variant="outline" className="border-gray-200 bg-gray-50 text-gray-500">
          <EyeOff className="h-3 w-3 mr-1" /> Hidden
        </Badge>
      );
    }
    
    return badges;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-gray-500">Manage products for online store and in-gym sales</p>
        </div>
        <Button 
          onClick={() => navigate('/admin/shop/add-product')}
          className="bg-gym-orange hover:bg-gym-orange/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search products..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter size={16} />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="ecommerce" className="flex items-center gap-1">
            <ShoppingBag className="h-4 w-4" />
            E-Commerce
          </TabsTrigger>
          <TabsTrigger value="instore" className="flex items-center gap-1">
            <Store className="h-4 w-4" />
            In-Store
          </TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Product List</CardTitle>
              <CardDescription>
                {activeTab === 'all' && 'All products in your inventory'}
                {activeTab === 'ecommerce' && 'Products visible in e-commerce store'}
                {activeTab === 'instore' && 'Products visible in in-store POS'}
                {activeTab === 'inactive' && 'Inactive products hidden from all stores'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Visibility</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                          <span className="mt-2 text-sm text-gray-500">Loading products...</span>
                        </TableCell>
                      </TableRow>
                    ) : filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          <p className="text-gray-500">No products found</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded bg-gray-100 p-1">
                                {product.image_url ? (
                                  <img 
                                    src={product.image_url} 
                                    alt={product.name} 
                                    className="h-full w-full rounded object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=No+Image';
                                    }}
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                                    <ShoppingBag size={16} />
                                  </div>
                                )}
                              </div>
                              <div>
                                <div className="font-medium">{product.name}</div>
                                <div className="text-xs text-gray-500 truncate max-w-xs">
                                  {product.sku ? `SKU: ${product.sku}` : 'No SKU'}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{formatPrice(product.price)}</TableCell>
                          <TableCell>
                            {product.stock_count > 0 ? (
                              <span className={product.stock_count < 10 ? 'text-amber-600' : ''}>
                                {product.stock_count}
                              </span>
                            ) : (
                              <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                                Out of stock
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {getVisibilityBadges(product)}
                            </div>
                          </TableCell>
                          <TableCell>
                            {product.is_active ? (
                              <Badge variant="default" className="bg-green-500">Active</Badge>
                            ) : (
                              <Badge variant="secondary">Inactive</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => navigate(`/admin/shop/edit-product/${product.id}`)}>
                                  <PenLine className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteProduct(product.id, product.name)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Products;
