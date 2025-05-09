
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ShoppingCart, ShoppingBag, Share2, Heart } from 'lucide-react';
import { getProductById, getProductsByCategory } from '@/data/shopData';
import { Button } from '@/components/ui/button';
import { Product } from '@/hooks/useProducts';
import ProductGrid from '@/components/shop/ProductGrid';

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (productId) {
      // Get product details
      const productDetails = getProductById(productId);
      if (productDetails) {
        setProduct(productDetails);
        
        // Get related products (from same category)
        const related = getProductsByCategory(productDetails.category)
          .filter(p => p.id !== productId)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [productId]);

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} RWF`;
  };

  // Function to add products to cart (placeholder)
  const addToCart = () => {
    if (!product) return;
    
    // Show a toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-gym-orange text-white px-4 py-2 rounded shadow-lg animate-in fade-in slide-in-from-top-4 z-50';
    toast.textContent = `${quantity} x ${product.name} added to cart`;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('animate-out', 'fade-out', 'slide-out-to-top-4');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  };

  if (!product) {
    return (
      <div className="bg-gym-light min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gym-orange"></div>
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
          <Link to={`/shop/category/${product.category}`} className="hover:text-gym-orange">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
          <ChevronRight size={14} />
          <span className="font-semibold text-gym-orange">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="bg-gray-100 p-8 flex items-center justify-center">
              <img 
                src={product.image_url || ''} 
                alt={product.name} 
                className="max-h-96 object-contain"
              />
            </div>
            
            {/* Product Info */}
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gym-dark mb-2">{product.name}</h1>
              <p className="text-2xl font-bold text-gym-orange mb-4">{formatPrice(product.price)}</p>
              
              <div className="border-t border-b border-gray-200 py-4 my-4">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
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
                    onClick={addToCart}
                    className="flex-grow bg-gym-orange hover:bg-gym-orange/90"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
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
                <p>SKU: <span className="font-medium text-gym-dark">{product.id.toUpperCase()}</span></p>
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
