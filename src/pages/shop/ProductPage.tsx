
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import CartDisplay from '@/components/shop/ShoppingCart'; // Renamed import to avoid conflict
import { Product } from '@/hooks/useProducts';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ShoppingBag } from 'lucide-react';
import { Alert, AlertDescription as AlertDescriptionUi, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react';

// Fixed TypeScript interface to properly extend Product
interface ProductWithCategory extends Omit<Product, 'category'> {
  category?: {
    name: string;
  }
}

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductWithCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        if (productId) {
          const { data, error } = await supabase
            .from('products')
            .select('*, category:categories(name)')
            .eq('id', productId)
            .single();

          if (error) {
            console.error('Error fetching product:', error);
            setError('Failed to load product');
          } else if (data) {
            setProduct(data as ProductWithCategory);
          } else {
            setError('Product not found');
          }
        }
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      // Convert ProductWithCategory to Product before adding to cart
      const productForCart: Product = {
        ...product,
        category: product.category?.name || 'Uncategorized',
      };
      
      addToCart(productForCart);
      toast.success(`${product.name} added to cart`);
    }
  };

  if (loading) {
    return (
      <div className="bg-gym-light min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gym-orange"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-gym-light min-h-screen pt-24 pb-16">
        <div className="container-custom">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescriptionUi>{error || 'Product not found'}</AlertDescriptionUi>
            </Alert>
            <div className="text-center mt-6">
              <Link
                to="/shop"
                className="inline-flex items-center bg-gym-orange hover:bg-gym-orange/90 text-white px-6 py-3 rounded-md transition-colors"
              >
                <ShoppingBag className="mr-2" size={18} />
                Back to Shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const price = user?.role === 'member' && product.member_price ? product.member_price : product.price;
  const categoryName = product.category?.name || 'Uncategorized';

  return (
    <div className="bg-gym-light min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
          <Link to="/shop" className="hover:text-gym-orange">Shop</Link>
          <ChevronRight size={14} />
          <Link to={`/shop/category/${product.category_id}`} className="hover:text-gym-orange">{categoryName}</Link>
          <ChevronRight size={14} />
          <span className="font-semibold text-gym-orange">{product.name}</span>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="flex justify-center items-center">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="max-h-96 max-w-md rounded-md"
                />
              ) : (
                <div className="h-48 w-48 bg-gray-200 flex items-center justify-center">
                  <ShoppingBag className="h-12 w-12 text-gray-500" />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Category: {categoryName}</p>
              <p className="text-gray-600">Price: RWF {price?.toLocaleString()}</p>
              <p className="text-gray-600">Stock: {product.stock_count}</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Button onClick={handleAddToCart} className="bg-gym-orange hover:bg-gym-orange/90 text-white">
              Add to Cart
            </Button>
            <Link to="/shop" className="text-gym-orange hover:underline">
              Back to Shop
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProductPage;
