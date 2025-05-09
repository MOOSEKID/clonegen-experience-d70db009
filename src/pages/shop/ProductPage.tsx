
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ShoppingCart, ShoppingBag, Share2, Heart, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/hooks/useProducts';
import ProductGrid from '@/components/shop/ProductGrid';
import { supabase } from '@/integrations/supabase/client';

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
  const navigate = useNavigate();
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

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} RWF`;
  };

  // Function to add products to cart (placeholder)
  const addToCart = (productToAdd: Product | null = product) => {
    if (!productToAdd) return;
    
    // Show a toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-gym-orange text-white px-4 py-2 rounded shadow-lg animate-in fade-in slide-in-from-top-4 z-50';
    toast.textContent = `${quantity} x ${productToAdd.name} added to cart`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('animate-out', 'fade-out', 'slide-out-to-top-4');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  };
  
  const handleAddToCartClick = () => {
    addToCart();
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
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{error || 'Product Not Found'}</h2>
            <p className="text-gray-600 mb-6">
              The product you're looking for doesn't exist or couldn't be loaded.
            </p>
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
    );
  }

  // Get the correct category ID for linking
  const categoryId = getCategoryId(product.category);

  return (
    <div className="bg-gym-light min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
          <Link to="/shop" className="hover:text-gym-orange">Shop</Link>
          <ChevronRight size={14} />
          <Link to={`/shop/category/${categoryId}`} className="hover:text-gym-orange">
            {product.category}
          </Link>
          <ChevronRight size={14} />
          <span className="font-semibold text-gym-orange">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="bg-gray-100 p-8 flex items-center justify-center">
              {product.image_url ? (
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="max-h-96 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400?text=Image+Not+Found';
                  }}
                />
              ) : (
                <div className="w-full h-96 flex items-center justify-center bg-gray-200">
                  <ShoppingBag size={64} className="text-gray-400" />
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gym-dark mb-2">{product.name}</h1>
              <p className="text-2xl font-bold text-gym-orange mb-4">{formatPrice(product.price)}</p>
              
              <div className="border-t border-b border-gray-200 py-4 my-4">
                <p className="text-gray-700 leading-relaxed">{product.description || 'No description available'}</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-gray-700">Quantity:</span>
                  <div className="flex border border-gray-300 rounded-md">
                    <button 
                      className="px-3 py-1 border-r border-gray-300"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    >
                      -
                    </button>
                    <input 
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      min={1}
                      className="w-12 text-center focus:outline-none"
                    />
                    <button 
                      className="px-3 py-1 border-l border-gray-300"
                      onClick={() => setQuantity(q => q + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={handleAddToCartClick}
                    className="flex-grow bg-gym-orange hover:bg-gym-orange/90"
                    disabled={product.stock_count <= 0}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {product.stock_count > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                  
                  <Button variant="outline" className="p-2">
                    <Heart className="h-5 w-5" />
                  </Button>
                  
                  <Button variant="outline" className="p-2">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <p>Category: <span className="font-medium text-gym-dark capitalize">{product.category}</span></p>
                <p>SKU: <span className="font-medium text-gym-dark">{product.sku || 'N/A'}</span></p>
                {product.stock_count !== undefined && (
                  <p>Availability: <span className={`font-medium ${product.stock_count > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock_count > 0 ? `In Stock (${product.stock_count})` : 'Out of Stock'}
                  </span></p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gym-dark mb-6">Related Products</h2>
            <ProductGrid products={relatedProducts} addToCart={addToCart} />
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

export default ProductPage;
