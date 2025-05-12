
import React from 'react';
import { Product } from '@/hooks/useProducts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Filter, ArrowUpDown } from 'lucide-react';
import { ShopFilters } from '@/hooks/useShopProducts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from '@/components/ui/skeleton';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from '@/components/ui/slider';

interface ProductSectionProps {
  isLoading: boolean;
  filteredProducts: Product[];
  searchTerm: string;
  error: string | null;
  addToCart: (product: Product) => void;
  onSortChange?: (sortOption: string) => void;
  onPriceFilterChange?: (min: number, max: number) => void;
  currentFilters?: ShopFilters;
  categoryName?: string;
}

const ProductsSection: React.FC<ProductSectionProps> = ({ 
  isLoading, 
  filteredProducts, 
  searchTerm, 
  error, 
  addToCart,
  onSortChange,
  onPriceFilterChange,
  currentFilters,
  categoryName
}) => {
  // For price slider
  const [priceRange, setPriceRange] = React.useState<number[]>([0, 50000]);
  const [showFilters, setShowFilters] = React.useState(false);

  // Get min/max price for all products
  const allPrices = filteredProducts.map(product => product.price);
  const maxPrice = Math.max(...(allPrices.length ? allPrices : [50000]));

  const handleSliderChange = (values: number[]) => {
    setPriceRange(values);
  };

  const applyPriceFilter = () => {
    if (onPriceFilterChange) {
      onPriceFilterChange(priceRange[0], priceRange[1]);
    }
  };

  if (isLoading) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardContent className="p-4">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-4 bg-red-50 text-red-800 rounded-lg">
        <h2 className="text-lg font-medium">Error loading products</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {categoryName ? categoryName : searchTerm ? `Search Results: "${searchTerm}"` : "Products"}
          {filteredProducts.length > 0 && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'})
            </span>
          )}
        </h2>
        <div className="flex gap-2">
          {onPriceFilterChange && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          )}
          {onSortChange && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <ArrowUpDown className="h-4 w-4" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onSortChange('name')}>
                  Name (A-Z)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSortChange('price-asc')}>
                  Price: Low to High
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSortChange('price-desc')}>
                  Price: High to Low
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onSortChange('newest')}>
                  Newest First
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      
      {showFilters && onPriceFilterChange && (
        <div className="mb-6 p-4 border rounded-lg bg-white">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="price">
              <AccordionTrigger>Price Range</AccordionTrigger>
              <AccordionContent>
                <div className="px-2 pt-2 pb-6">
                  <Slider
                    defaultValue={[0, maxPrice]}
                    max={maxPrice}
                    step={500}
                    value={priceRange}
                    onValueChange={handleSliderChange}
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>{priceRange[0]} RWF</span>
                    <span>{priceRange[1]} RWF</span>
                  </div>
                  <Button 
                    className="mt-4 w-full bg-gym-orange hover:bg-gym-orange/90" 
                    size="sm"
                    onClick={applyPriceFilter}
                  >
                    Apply Filter
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            {/* Can add more filter types here */}
          </Accordion>
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="p-8 text-center border rounded-lg bg-white">
          <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-800 mb-1">No Products Found</h3>
          <p className="text-gray-600">
            {searchTerm 
              ? `We couldn't find any products matching "${searchTerm}"`
              : "No products available in this category"
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsSection;
