
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/hooks/useProducts';
import { useNavigate } from 'react-router-dom';

export type ProductCreateData = Omit<Product, 'id' | 'created_at' | 'updated_at'>;
export type ProductUpdateData = Partial<ProductCreateData>;

export const useProductManagement = (productId?: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*, categories(id, name, slug)')
        .order('name');

      if (fetchError) {
        console.error('Error fetching products:', fetchError);
        setError(new Error(fetchError.message));
        return;
      }
      
      setProducts(data || []);
    } catch (err: any) {
      console.error('Unexpected error fetching products:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single product by ID
  const fetchProduct = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*, categories(id, name, slug)')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error(`Error fetching product ${id}:`, fetchError);
        setError(new Error(fetchError.message));
        return;
      }
      
      setProduct(data);
    } catch (err: any) {
      console.error('Unexpected error fetching product:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Create a new product
  const createProduct = async (productData: ProductCreateData) => {
    setSubmitting(true);
    setError(null);
    
    try {
      const { data, error: createError } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single();

      if (createError) {
        console.error('Error creating product:', createError);
        setError(new Error(createError.message));
        toast.error('Failed to create product');
        return null;
      }

      toast.success('Product created successfully');
      return data;
    } catch (err: any) {
      console.error('Error in createProduct:', err);
      setError(err);
      toast.error('Failed to create product');
      return null;
    } finally {
      setSubmitting(false);
    }
  };
  
  // Update an existing product
  const updateProduct = async (id: string, productData: ProductUpdateData) => {
    setSubmitting(true);
    setError(null);
    
    try {
      const { error: updateError } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id);

      if (updateError) {
        console.error('Error updating product:', updateError);
        setError(new Error(updateError.message));
        toast.error('Failed to update product');
        return false;
      }

      toast.success('Product updated successfully');
      
      // Update local state if we have the product loaded
      if (product && product.id === id) {
        setProduct({...product, ...productData});
      }
      
      return true;
    } catch (err: any) {
      console.error('Error in updateProduct:', err);
      setError(err);
      toast.error('Failed to update product');
      return false;
    } finally {
      setSubmitting(false);
    }
  };
  
  // Delete a product
  const deleteProduct = async (id: string) => {
    setSubmitting(true);
    setError(null);
    
    try {
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (deleteError) {
        console.error('Error deleting product:', deleteError);
        setError(new Error(deleteError.message));
        toast.error('Failed to delete product');
        return false;
      }

      toast.success('Product deleted successfully');
      
      // Update products list if we have it loaded
      if (products.length > 0) {
        setProducts(products.filter(p => p.id !== id));
      }
      
      return true;
    } catch (err: any) {
      console.error('Error in deleteProduct:', err);
      setError(err);
      toast.error('Failed to delete product');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // Load product if ID is provided
  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  return {
    product,
    products,
    loading,
    submitting,
    error,
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    navigate
  };
};
