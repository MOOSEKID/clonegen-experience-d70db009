
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductFiltersProps {
  maxPrice: number;
  priceRange: number[];
  setPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
  onApplyFilter: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({ 
  maxPrice, 
  priceRange, 
  setPriceRange,
  onApplyFilter
}) => {
  return (
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
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>{priceRange[0]} RWF</span>
                <span>{priceRange[1]} RWF</span>
              </div>
              <Button 
                className="mt-4 w-full bg-gym-orange hover:bg-gym-orange/90" 
                size="sm"
                onClick={onApplyFilter}
              >
                Apply Filter
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        {/* Can add more filter types here */}
      </Accordion>
    </div>
  );
};

export default ProductFilters;
