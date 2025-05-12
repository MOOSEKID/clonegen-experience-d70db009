
import React, { useEffect } from 'react';
import ProductForm from '@/components/admin/shop/ProductForm';
import { useParams } from 'react-router-dom';
import { useProductManagement } from '@/hooks/admin/useProductManagement';
import { Loader2 } from 'lucide-react';

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error, fetchProduct } = useProductManagement(id);
  
  useEffect(() => {
    if (id && !product) {
      fetchProduct(id);
    }
  }, [id]);
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 text-gym-orange animate-spin" />
        <p className="mt-4 text-gray-500">Loading product data...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-700 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Error Loading Product</h2>
        <p>{error.message}</p>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="p-6 bg-yellow-50 text-yellow-700 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Product Not Found</h2>
        <p>The product you're trying to edit could not be found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
        <p className="text-gray-500">Update product details and inventory</p>
      </div>
      
      <ProductForm 
        initialData={{
          name: product.name,
          description: product.description || '',
          price: product.price,
          member_price: product.member_price,
          stock_count: product.stock_count,
          category_id: product.category_id || '',
          sku: product.sku || '',
          image_url: product.image_url || '',
          is_active: product.is_active,
          is_public: product.is_public,
          is_instore: product.is_instore || true,
          is_member_only: product.is_member_only || false
        }}
        productId={id}
        mode="edit" 
      />
    </div>
  );
};

export default EditProduct;
