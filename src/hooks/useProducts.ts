
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export type Product = {
  id: string;
  name: string;
  description: string | null;
  category: string;
  category_id?: string;
  price: number;
  member_price: number | null;
  image_url: string | null;
  sku: string | null;
  stock_count: number;
  is_active: boolean;
  is_public: boolean;
  is_instore: boolean;
  is_member_only: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface ProductFormData {
  id?: string;
  name: string;
  description?: string;
  category: string; // Keep this for backward compatibility
  category_id: string; 
  price: number;
  sku?: string;
  stock_count: number;
  image_url?: string | null;
  is_active: boolean;
  is_public: boolean;
  is_instore: boolean;
  is_member_only?: boolean;
  member_price?: number;
  imageFile?: File | null;
}

export const useProducts = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);

  // Fetch all products
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(name)')
      .order('createdAt', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }
    return data as Product[];
  };

  // Fetch a single product by ID
  const fetchProductById = async (id: string) => {
    const { data, error } = await supabase
      .from('products')
      .select('*, category:categories(id, name)')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data as Product;
  };

  // Upload product image to Supabase Storage
  const uploadProductImage = async (file: File): Promise<string> => {
    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error: any) {
      console.error('Error uploading image:', error.message);
      throw new Error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  // Create a new product
  const createProduct = async (formData: ProductFormData): Promise<Product> => {
    let imageUrl = formData.image_url;

    // Upload image if provided
    if (formData.imageFile) {
      imageUrl = await uploadProductImage(formData.imageFile);
    }

    // Remove imageFile from data to be sent to Supabase
    const { imageFile, ...productData } = formData;
    
    const { data, error } = await supabase
      .from('products')
      .insert({ ...productData, image_url: imageUrl })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }
    
    return data as Product;
  };

  // Update an existing product
  const updateProduct = async (formData: ProductFormData): Promise<Product> => {
    if (!formData.id) throw new Error('Product ID is required for update');
    
    let imageUrl = formData.image_url;

    // Upload image if provided
    if (formData.imageFile) {
      imageUrl = await uploadProductImage(formData.imageFile);
    }

    // Remove imageFile from data to be sent to Supabase
    const { imageFile, id, ...productData } = formData;
    
    const { data, error } = await supabase
      .from('products')
      .update({ ...productData, image_url: imageUrl })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }
    
    return data as Product;
  };

  // Delete a product
  const deleteProduct = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  };

  // React Query hooks
  const useProductsQuery = () => {
    return useQuery({
      queryKey: ['products'],
      queryFn: fetchProducts,
    });
  };

  const useProductQuery = (id: string) => {
    return useQuery({
      queryKey: ['product', id],
      queryFn: () => fetchProductById(id),
      enabled: !!id,
    });
  };

  const useCreateProductMutation = () => {
    return useMutation({
      mutationFn: createProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        toast({
          title: "Product created",
          description: "The product has been successfully created.",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Error creating product",
          description: error.message || "An error occurred while creating the product.",
        });
      }
    });
  };

  const useUpdateProductMutation = () => {
    return useMutation({
      mutationFn: updateProduct,
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        queryClient.invalidateQueries({ queryKey: ['product', data.id] });
        toast({
          title: "Product updated",
          description: "The product has been successfully updated.",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Error updating product",
          description: error.message || "An error occurred while updating the product.",
        });
      }
    });
  };

  const useDeleteProductMutation = () => {
    return useMutation({
      mutationFn: deleteProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
        toast({
          title: "Product deleted",
          description: "The product has been successfully deleted.",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Error deleting product",
          description: error.message || "An error occurred while deleting the product.",
        });
      }
    });
  };

  return {
    isUploading,
    useProductsQuery,
    useProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
  };
};
