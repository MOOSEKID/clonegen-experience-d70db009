
import React, { useState } from 'react';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/hooks/useProducts';

interface ProductInfoProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} RWF`;
  };

  return (
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
            onClick={onAddToCart}
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
  );
};

export default ProductInfo;
