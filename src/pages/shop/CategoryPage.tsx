
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ShoppingBag, AlertCircle } from 'lucide-react';
import ProductGrid from '@/components/shop/ProductGrid';
import { Product } from '@/hooks/useProducts';
import { supabase } from '@/integrations/supabase/client';
import { findCategoryById } from '@/utils/categoryUtils';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        if (categoryId) {
          setLoading(true);
          setError(null);
          
          // Get category details using case-insensitive matching
          const categoryDetails = findCategoryById(categoryId);
          
          if (!categoryDetails) {
            setError('Category not found');
            setLoading(false);
            return;
          }
          
          setCategory(categoryDetails);
          
          console.log(`Fetching products for category: ${categoryDetails.dbName}`);
          
          // Get products for this category from the database
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('category', categoryDetails.dbName)
            .eq('is_active', true)
            .eq('is_public', true);
            
          if (error) {
            console.error('Error fetching products:', error);
            setError('Failed to load products');
            setLoading(false);
            return;
          }
          
          console.log(`Fetched ${data?.length || 0} products for category ${categoryDetails.dbName}`);
          setProducts(data || []);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading category data:', err);
        setError('Failed to load category data');
        setLoading(false);
      }
    };
    
    fetchProductsByCategory();
  }, [categoryId]);

  // Function to add products to cart (placeholder)
  const addToCart = (product: Product) => {
    // Show a toast notification using Sonner
    import('sonner').then(({ toast }) => {
      toast(`${product.name} added to cart`, {
        description: "Item added to your shopping cart",
        position: "top-right",
        duration: 2000
      });
    });
  };

  if (loading) {
    return (
      <div className="bg-gym-light min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gym-orange"></div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="bg-gym-light min-h-screen pt-24 pb-16">
        <div className="container-custom">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error || 'Category not found'}</AlertDescription>
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

  return (
    <div className="bg-gym-light min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
          <Link to="/shop" className="hover:text-gym-orange">Shop</Link>
          <ChevronRight size={14} />
          <span className="font-semibold text-gym-orange">{category.name}</span>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gym-dark mb-4">{category.name}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <ProductGrid products={products} addToCart={addToCart} />
        ) : (
          <div className="text-center py-10 bg-white/50 rounded-lg shadow-sm">
            <p className="text-gray-600 mb-6">
              No products available in this category yet.
            </p>
            <Link 
              to="/shop"
              className="inline-flex items-center bg-gym-orange hover:bg-gym-orange/90 text-white px-6 py-3 rounded-md transition-colors"
            >
              <ShoppingBag className="mr-2" size={18} />
              Browse all products
            </Link>
          </div>
        )}

        {/* Back to Shop Button */}
        <div className="mt-12 text-center">
          <Link 
            to="/shop"
            className="inline-flex items-center bg-gym-orange hover:bg-gym-orange/90 text-white px-6 py-3 rounded-md transition-colors"
          >
            <ShoppingBag className="mr-2" size={18} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
