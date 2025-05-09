
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProducts, ProductFormData } from '@/hooks/useProducts';
import ProductForm from '@/components/admin/shop/ProductForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { useProductQuery, useUpdateProductMutation, isUploading } = useProducts();
  
  const { data: product, isLoading, error } = useProductQuery(id || '');
  const updateMutation = useUpdateProductMutation();

  const handleSubmit = async (data: ProductFormData) => {
    if (!id) return;
    await updateMutation.mutateAsync({ ...data, id });
    navigate('/admin/shop/products');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="space-y-4">
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/admin/shop/products')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
        <div className="p-6 text-center">
          <h3 className="text-lg font-medium">Product not found</h3>
          <p className="text-gray-500 mt-2">
            The product you're looking for doesn't exist or you don't have permission to view it.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/admin/shop/products')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <p className="text-gray-500">Update product details</p>
      </div>

      <ProductForm
        product={product}
        onSubmit={handleSubmit}
        isLoading={updateMutation.isPending || isUploading}
        mode="edit"
      />
    </div>
  );
};

export default EditProduct;
