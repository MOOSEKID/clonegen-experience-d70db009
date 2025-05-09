
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts, ProductFormData } from '@/hooks/useProducts';
import ProductForm from '@/components/admin/shop/ProductForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const AddProduct = () => {
  const navigate = useNavigate();
  const { useCreateProductMutation, isUploading } = useProducts();
  const createMutation = useCreateProductMutation();

  const handleSubmit = async (data: ProductFormData) => {
    await createMutation.mutateAsync(data);
    navigate('/admin/shop/products');
  };

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
        <h1 className="text-2xl font-bold">Add New Product</h1>
        <p className="text-gray-500">Create a new product for the shop</p>
      </div>

      <ProductForm
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending || isUploading}
        mode="add"
      />
    </div>
  );
};

export default AddProduct;
