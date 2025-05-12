
import React from 'react';
import { ImageOff } from 'lucide-react';

interface ProductImageGalleryProps {
  imageUrl: string | null;
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ 
  imageUrl, 
  productName 
}) => {
  return (
    <div className="relative bg-gray-100 flex items-center justify-center p-8">
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={productName} 
          className="max-h-[400px] object-contain" 
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
          <ImageOff size={48} className="mb-2" />
          <span>No image available</span>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
