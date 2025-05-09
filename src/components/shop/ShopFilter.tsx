
import React, { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { Category } from '@/hooks/useCategories';

interface ShopFilterProps {
  categories: Category[];
  onApplyFilters: (filters: ShopFiltersType) => void;
  initialFilters: ShopFiltersType;
}

export interface ShopFiltersType {
  priceRange: [number, number];
  categories: string[];
  sort: string;
}

const ShopFilter: React.FC<ShopFilterProps> = ({ categories, onApplyFilters, initialFilters }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<ShopFiltersType>(initialFilters);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500000);
  
  // Update filters when initial filters change
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  // Handle category checkbox change
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setFilters(prev => {
      if (checked) {
        return {
          ...prev,
          categories: [...prev.categories, categoryId]
        };
      } else {
        return {
          ...prev,
          categories: prev.categories.filter(id => id !== categoryId)
        };
      }
    });
  };
  
  // Handle price slider change
  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [value[0], value[1]] as [number, number]
    }));
  };
  
  // Handle sort change
  const handleSortChange = (sortOption: string) => {
    setFilters(prev => ({
      ...prev,
      sort: sortOption
    }));
  };
  
  // Apply filters
  const applyFilters = () => {
    onApplyFilters(filters);
  };
  
  // Reset filters
  const resetFilters = () => {
    const resetFilters = {
      priceRange: [0, maxPrice] as [number, number],
      categories: [],
      sort: 'newest'
    };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  // Format price
  const formatPrice = (price: number) => {
    return `RWF ${price.toLocaleString()}`;
  };

  return (
    <div className="mb-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        {/* Mobile filter toggle */}
        <div className="block lg:hidden">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-between"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filters &amp; Sort
            </div>
            {isFilterOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        {/* Filter content - always visible on desktop, toggleable on mobile */}
        <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block mt-4 lg:mt-0`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Price range filter */}
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-4">Price Range</h3>
              <div className="mt-6 px-2">
                <Slider 
                  min={0}
                  max={maxPrice}
                  step={1000}
                  value={filters.priceRange}
                  onValueChange={handlePriceChange}
                  className="mb-6"
                />
                <div className="flex items-center justify-between text-sm mt-2">
                  <span>{formatPrice(filters.priceRange[0])}</span>
                  <span>{formatPrice(filters.priceRange[1])}</span>
                </div>
              </div>
            </div>
            
            {/* Categories filter */}
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <Checkbox 
                      id={`category-${category.id}`}
                      checked={filters.categories.includes(category.id)}
                      onCheckedChange={(checked) => 
                        handleCategoryChange(category.id, checked === true)
                      }
                      className="mr-2"
                    />
                    <label 
                      htmlFor={`category-${category.id}`}
                      className="text-sm cursor-pointer flex items-center justify-between w-full"
                    >
                      {category.name}
                      <span className="text-xs text-gray-500">
                        ({category.productCount || 0})
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Sort options */}
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-4">Sort By</h3>
              <div className="space-y-2">
                {[
                  { value: 'newest', label: 'Newest' },
                  { value: 'price-asc', label: 'Price: Low to High' },
                  { value: 'price-desc', label: 'Price: High to Low' }
                ].map((option) => (
                  <div 
                    key={option.value}
                    className={`p-2 rounded cursor-pointer flex items-center justify-between ${
                      filters.sort === option.value ? 'bg-gym-orange/10 text-gym-orange' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleSortChange(option.value)}
                  >
                    {option.label}
                    {filters.sort === option.value && (
                      <Check className="h-4 w-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Filter actions */}
          <div className="flex justify-end mt-6 gap-2">
            <Button 
              variant="outline" 
              onClick={resetFilters}
              className="gap-1"
            >
              <X className="h-4 w-4" />
              Reset
            </Button>
            <Button 
              onClick={applyFilters}
              className="bg-gym-orange hover:bg-gym-orange/90 gap-1"
            >
              <Filter className="h-4 w-4" />
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopFilter;
