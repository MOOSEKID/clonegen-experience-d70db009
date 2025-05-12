
import React from 'react';
import { Product } from '@/hooks/useProducts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  return (
    <Card key={product.id} className="overflow-hidden transition-all hover:shadow-lg">
      <div className="h-48 overflow-hidden bg-gray-100">
        {product.image_url ? (
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="h-full w-full object-cover object-center"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'https://placehold.co/400x300?text=No+Image';
            }} 
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <ShoppingCart className="h-12 w-12 text-gray-300" />
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 h-10 mb-3">
          {product.description || 'No description available'}
        </p>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-semibold">{product.price} RWF</p>
            {product.member_price && (
              <p className="text-xs text-gym-orange">
                Member: {product.member_price} RWF
              </p>
            )}
          </div>
          <Button 
            onClick={() => addToCart(product)}
            size="sm"
            className="bg-gym-orange hover:bg-gym-orange/90"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
