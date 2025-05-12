
import React from 'react';
import ProductForm from '@/components/admin/shop/ProductForm';

const AddProduct = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
        <p className="text-gray-500">Create a new product for your online store</p>
      </div>
      
      <ProductForm mode="create" />
    </div>
  );
};

export default AddProduct;
