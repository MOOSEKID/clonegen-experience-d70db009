
import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  addToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} RWF`;
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200">
      <div className="relative group">
        <Link to={`/shop/product/${product.id}`} className="block overflow-hidden">
          <div className="aspect-square overflow-hidden bg-gray-100">
            <img 
              src={product.image} 
              alt={product.name} 
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button variant="secondary" size="sm" className="bg-white hover:bg-gym-orange hover:text-white">
                <Eye className="h-4 w-4 mr-1" />
                View Details
              </Button>
            </div>
          </div>
        </Link>
      </div>
      <CardContent className="p-3 flex-grow">
        <Link to={`/shop/product/${product.id}`} className="hover:text-gym-orange">
          <h3 className="font-semibold text-md mb-1 line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-gray-600 text-xs line-clamp-2 mb-1">{product.description}</p>
        <p className="font-bold text-gym-orange text-sm">{formatPrice(product.price)}</p>
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <Button 
          onClick={() => addToCart && addToCart(product)} 
          variant="default" 
          className="w-full bg-gym-orange hover:bg-gym-orange/90 text-xs h-8"
        >
          <ShoppingCart className="mr-1 h-3 w-3" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
