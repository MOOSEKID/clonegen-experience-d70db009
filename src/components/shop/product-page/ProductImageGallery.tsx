
import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface ProductImageGalleryProps {
  imageUrl: string | null;
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ imageUrl, productName }) => {
  return (
    <div className="bg-gray-100 p-8 flex items-center justify-center">
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={productName} 
          className="max-h-96 object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400?text=Image+Not+Found';
          }}
        />
      ) : (
        <div className="w-full h-96 flex items-center justify-center bg-gray-200">
          <ShoppingBag size={64} className="text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
