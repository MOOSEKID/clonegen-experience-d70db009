
import React, { useState } from 'react';
import { Product } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Plus, Minus } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface ProductInfoProps {
  product: Product;
  onAddToCart: () => void;
}

// Define a type for the category when it's an object
interface CategoryObject {
  id?: string;
  name?: string;
  slug?: string;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  // Decrease quantity (minimum 1)
  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  // Handle add to cart with current quantity
  const handleAddToCart = () => {
    onAddToCart();
  };

  // Safely get category name, handling both string and object types
  const getCategoryName = () => {
    if (!product.category) return 'Uncategorized';
    
    if (typeof product.category === 'string') {
      return product.category;
    }
    
    // Cast to CategoryObject type to handle the object case
    const categoryObj = product.category as CategoryObject;
    return categoryObj.name || 'Uncategorized';
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
        {product.name}
      </h1>
      
      <div className="mb-4">
        <span className="text-xl font-semibold text-gym-orange">
          {formatCurrency(product.price)}
        </span>
        {product.member_price && (
          <span className="ml-2 text-sm text-gray-500">
            Member price: {formatCurrency(product.member_price)}
          </span>
        )}
      </div>
      
      {product.description && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-600">{product.description}</p>
        </div>
      )}
      
      <div className="border-t border-b border-gray-200 py-4 my-6">
        <div className="flex items-center">
          <span className="mr-4 font-medium">Quantity:</span>
          <div className="flex items-center border rounded-md">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-9 px-2"
              onClick={decreaseQuantity}
            >
              <Minus size={16} />
            </Button>
            <span className="w-12 text-center">{quantity}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-9 px-2"
              onClick={increaseQuantity}
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <Button 
          className="w-full bg-gym-orange hover:bg-gym-orange/90 text-white py-6"
          onClick={handleAddToCart}
        >
          <ShoppingBag className="mr-2" size={18} /> 
          Add to Cart
        </Button>
        
        <div className="text-sm text-gray-600 space-y-1">
          {product.stock_count > 0 ? (
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
              <span>In Stock ({product.stock_count} available)</span>
            </div>
          ) : (
            <div className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
              <span>Out of Stock</span>
            </div>
          )}
          
          {product.sku && (
            <div>SKU: {product.sku}</div>
          )}
          
          <div>Category: {getCategoryName()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
