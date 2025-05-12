
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
import { useCart } from '@/hooks/shop/useCart';

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Use the cart hook
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        if (productId) {
          setLoading(true);
          
          // Get product details from database
          const { data: productData, error: productError } = await supabase
            .from('products')
            .select('*, category:categories(*)')
            .eq('id', productId)
            .single();
          
          if (productError) {
            setError('Product not found');
            setLoading(false);
            return;
          }
          
          const typedProduct = productData as Product;
          setProduct(typedProduct);
          
          // Get related products from same category
          const { data: relatedData, error: relatedError } = await supabase
            .from('products')
            .select('*')
            .eq('category_id', typedProduct.category_id)
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

  // Function to handle adding product to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
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

  // Get the category information safely
  const categoryInfo = product.category || { id: product.category_id, name: '', slug: '' };
  
  // Handle both string and object types for category
  let categoryId = '';
  let categoryName = '';
  
  if (typeof categoryInfo === 'string') {
    categoryId = product.category_id || '';
    categoryName = categoryInfo;
  } else {
    categoryId = categoryInfo.slug || (product.category_id || '').toString();
    categoryName = categoryInfo.name || '';
  }

  return (
    <div className="bg-gym-light min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Breadcrumb */}
        <ProductBreadcrumb 
          categoryId={categoryId} 
          categoryName={categoryName}
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
            
            {/* Product Info with quantity control */}
            <ProductInfo 
              product={product} 
              onAddToCart={handleAddToCart} 
            />
          </div>
        </div>
        
        {/* Related Products */}
        <RelatedProducts 
          products={relatedProducts} 
          addToCart={(product) => addToCart(product, 1)} 
        />

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
