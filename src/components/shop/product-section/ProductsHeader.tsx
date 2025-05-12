
import React from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProductsHeaderProps {
  categoryName?: string;
  searchTerm: string; 
  productsCount: number;
  onSortChange?: (sortOption: string) => void;
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  onPriceFilterChange?: (min: number, max: number) => void;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({ 
  categoryName,
  searchTerm, 
  productsCount,
  onSortChange,
  showFilters,
  setShowFilters,
  onPriceFilterChange
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">
        {categoryName ? categoryName : searchTerm ? `Search Results: "${searchTerm}"` : "Products"}
        {productsCount > 0 && (
          <span className="text-sm font-normal text-gray-500 ml-2">
            ({productsCount} {productsCount === 1 ? 'product' : 'products'})
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
  );
};

export default ProductsHeader;
