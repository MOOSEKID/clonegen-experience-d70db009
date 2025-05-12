
import React from 'react';
import { Product } from '@/hooks/useProducts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface RelatedProductsProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ products, addToCart }) => {
  if (!products.length) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <Link to={`/shop/product/${product.id}`} className="block">
              <div className="aspect-square bg-gray-100 relative">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name} 
                    className="h-full w-full object-cover object-center" 
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-gray-400">
                    No image
                  </div>
                )}
              </div>
            </Link>
            
            <CardContent className="p-4">
              <Link to={`/shop/product/${product.id}`} className="block">
                <h3 className="font-medium text-gray-800 hover:text-gym-orange transition-colors mb-2 line-clamp-2">
                  {product.name}
                </h3>
              </Link>
              
              <div className="flex justify-between items-center mt-2">
                <span className="font-semibold text-gym-orange">
                  {formatCurrency(product.price)}
                </span>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full hover:bg-gym-orange hover:text-white transition-colors"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingBag size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
