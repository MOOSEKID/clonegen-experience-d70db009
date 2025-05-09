
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ShoppingBag } from 'lucide-react';
import { Product } from '@/hooks/useProducts';
import { Badge } from '@/components/ui/badge';

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  // Format price
  const formatPrice = (price: number) => {
    return `RWF ${price?.toLocaleString() || 0}`;
  };

  // Handle click safely
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    onAddToCart(product);
  };

  // Get category name (handle both old and new structure)
  const getCategoryName = () => {
    if (typeof product.category === 'object' && product.category !== null) {
      // @ts-ignore - We know category might be an object now
      return product.category.name || 'Uncategorized';
    }
    return product.category || 'Uncategorized';
  };

  if (!product) {
    return null; // Don't render anything if product is missing
  }

  return (
    <Link to={`/shop/product/${product.id}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg h-full flex flex-col">
        <div className="h-48 overflow-hidden relative">
          {product.image_url ? (
            <img 
              src={product.image_url} 
              alt={product.name || 'Product image'} 
              className="w-full h-full object-cover transition-transform hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400?text=No+Image';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <ShoppingBag size={32} className="text-gray-400" />
            </div>
          )}
          
          {/* Out of stock badge */}
          {(product.stock_count !== undefined && product.stock_count <= 0) && (
            <div className="absolute top-2 right-2">
              <Badge variant="destructive" className="bg-red-500">
                Out of stock
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          {getCategoryName() && (
            <span className="inline-block px-2 py-1 text-xs font-semibold bg-gray-100 rounded-full mb-2">
              {getCategoryName()}
            </span>
          )}
          
          <h3 className="font-semibold text-lg mb-1 text-gray-800">{product.name || 'Unnamed Product'}</h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
            {product.description || 'No description available'}
          </p>
          
          <div className="flex items-center justify-between mt-auto">
            <span className="text-gym-orange font-bold">{formatPrice(product.price || 0)}</span>
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              className="bg-gym-orange hover:bg-gym-orange/90"
              disabled={product.stock_count <= 0}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
