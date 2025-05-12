
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/hooks/useProducts';
import { supabase } from '@/integrations/supabase/client';
import ProductBreadcrumb from '@/components/shop/product-page/ProductBreadcrumb';
import ProductImageGallery from '@/components/shop/product-page/ProductImageGallery';
import ProductInfo from '@/components/shop/product-page/ProductInfo';
import ProductErrorState from '@/components/shop/product-page/ProductErrorState';
import RelatedProducts from '@/components/shop/product-page/RelatedProducts';
import LoadingSpinner from '@/components/shop/product-page/LoadingSpinner';
import { toast } from 'sonner';

// Category mapping to ensure consistent IDs across the application
const getCategoryId = (categoryName: string): string => {
  const categoryMap: {[key: string]: string} = {
    'Supplements': 'supplements',
    'Equipment': 'equipment',
    'Apparel': 'apparel'
  };
  
  return categoryMap[categoryName] || categoryName.toLowerCase();
};

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        if (productId) {
          setLoading(true);
          
          // Get product details from database
          const { data: productData, error: productError } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .single();
          
          if (productError) {
            setError('Product not found');
            setLoading(false);
            return;
          }
          
          const typedProduct = productData as Product;
          setProduct(typedProduct);
          
          // Get related products (from same category)
          const { data: relatedData, error: relatedError } = await supabase
            .from('products')
            .select('*')
            .eq('category', typedProduct.category)
            .eq('is_active', true)
            .eq('is_public', true)
            .neq('id', productId)
            .limit(4);
            
          if (relatedError) {
            console.error('Error loading related products:', relatedError);
          } else {
            setRelatedProducts(relatedData || []);
          }
          
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading product data:', err);
        setError('Failed to load product data');
        setLoading(false);
      }
    };
    
    fetchProductAndRelated();
  }, [productId]);

  // Function to add products to cart
  const addToCart = (productToAdd: Product | null = product) => {
    if (!productToAdd) return;
    
    // Show toast notification
    toast(`${quantity} x ${productToAdd.name} added to cart`, {
      description: "Item successfully added to your cart",
      position: "top-right",
      duration: 2000,
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !product) {
    return (
      <div className="bg-gym-light min-h-screen pt-24 pb-16">
        <div className="container-custom">
          <ProductErrorState error={error} />
        </div>
      </div>
    );
  }

  // Get the correct category ID for linking
  const categoryId = getCategoryId(product.category);

  return (
    <div className="bg-gym-light min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Breadcrumb */}
        <ProductBreadcrumb 
          categoryId={categoryId} 
          categoryName={product.category}
          productName={product.name}
        />

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <ProductImageGallery 
              imageUrl={product.image_url} 
              productName={product.name} 
            />
            
            {/* Product Info */}
            <ProductInfo 
              product={product} 
              onAddToCart={() => addToCart(product)} 
            />
          </div>
        </div>
        
        {/* Related Products */}
        <RelatedProducts products={relatedProducts} addToCart={addToCart} />

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

export default ProductPage;
