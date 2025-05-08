
import React, { useRef, useState, useEffect } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ServiceCategoryProps {
  title: string;
  icon: string;
  services: string[];
}

const ServiceCategory = ({ title, icon, services }: ServiceCategoryProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 min-w-[300px]">
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-3">{icon}</span>
        <h3 className="text-2xl font-bold text-gym-dark">{title}</h3>
      </div>
      <ul className="space-y-2">
        {services.map((service, i) => (
          <li key={i} className="flex items-start">
            <Check className="text-gym-orange mr-2 flex-shrink-0 mt-1" size={18} />
            <span className="text-gray-700">{service}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface ServiceCategoriesGridProps {
  categories: {
    title: string;
    icon: string;
    services: string[];
  }[];
}

const ServiceCategoriesGrid = ({ categories }: ServiceCategoriesGridProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    // Show left arrow if scrolled right
    setShowLeftArrow(scrollLeft > 10);
    // Show right arrow if more content to scroll right
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
      // Check again after content might have loaded/rendered
      setTimeout(checkScroll, 100);
    }
    
    return () => {
      scrollContainer?.removeEventListener('scroll', checkScroll);
    };
  }, []);

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {showLeftArrow && (
        <button 
          onClick={scrollLeft} 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
          aria-label="Scroll left"
        >
          <ChevronLeft className="text-gym-dark" size={24} />
        </button>
      )}
      
      <div 
        ref={scrollContainerRef} 
        className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category, index) => (
          <div key={index} className="snap-center first:ml-0 last:mr-0">
            <ServiceCategory 
              title={category.title} 
              icon={category.icon} 
              services={category.services} 
            />
          </div>
        ))}
      </div>
      
      {showRightArrow && (
        <button 
          onClick={scrollRight} 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
          aria-label="Scroll right"
        >
          <ChevronRight className="text-gym-dark" size={24} />
        </button>
      )}
    </div>
  );
};

export default ServiceCategoriesGrid;
