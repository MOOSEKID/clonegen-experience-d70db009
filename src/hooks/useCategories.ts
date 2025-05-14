
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { CategoryWithChildren } from './shop/shopTypes';

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  is_active: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  parent_id: string | null;
  productCount?: number;
};

export const useCategories = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all categories with product count
  const fetchCategories = async () => {
    // First fetch all categories
    const { data: categories, error: categoryError } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (categoryError) {
      throw new Error(categoryError.message);
    }

    // Then fetch product counts for each category
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('category_id');

    if (productsError) {
      throw new Error(productsError.message);
    }

    // Count products by category
    const productCountByCategory: Record<string, number> = {};
    products.forEach(product => {
      if (product.category_id) {
        productCountByCategory[product.category_id] = (productCountByCategory[product.category_id] || 0) + 1;
      }
    });

    // Add product counts to categories
    const categoriesWithCounts = categories.map((category: Category) => ({
      ...category,
      productCount: productCountByCategory[category.id] || 0
    }));
    
    return categoriesWithCounts as Category[];
  };

  // Create a new category
  const createCategory = async (formData: Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'productCount'>) => {
    // If slug is empty, generate it from the name
    if (!formData.slug) {
      formData.slug = formData.name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    const { data, error } = await supabase
      .from('categories')
      .insert(formData)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }
    
    return data;
  };

  // Update an existing category
  const updateCategory = async ({ 
    id, 
    data 
  }: { 
    id: string; 
    data: Partial<Omit<Category, 'id' | 'createdAt' | 'updatedAt' | 'productCount'>> 
  }) => {
    // If slug is empty, generate it from the name
    if (data.name && !data.slug) {
      data.slug = data.name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const { data: updatedData, error } = await supabase
      .from('categories')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }
    
    return updatedData;
  };

  // Delete a category
  const deleteCategory = async (id: string) => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }
  };

  // Toggle category active status
  const toggleCategoryStatus = async ({
    id,
    is_active
  }: {
    id: string;
    is_active: boolean;
  }) => {
    const { data, error } = await supabase
      .from('categories')
      .update({ is_active })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }
    
    return data;
  };

  // Toggle category featured status
  const toggleCategoryFeature = async ({
    id,
    featured
  }: {
    id: string;
    featured: boolean;
  }) => {
    const { data, error } = await supabase
      .from('categories')
      .update({ featured })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }
    
    return data;
  };

  // React Query hooks
  const useCategoriesQuery = () => {
    return useQuery({
      queryKey: ['categories'],
      queryFn: fetchCategories,
    });
  };

  const useCreateCategoryMutation = () => {
    return useMutation({
      mutationFn: createCategory,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
        toast({
          title: "Category created",
          description: "The category has been successfully created.",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Error creating category",
          description: error.message || "An error occurred while creating the category.",
          variant: "destructive"
        });
      }
    });
  };

  const useUpdateCategoryMutation = () => {
    return useMutation({
      mutationFn: updateCategory,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
        toast({
          title: "Category updated",
          description: "The category has been successfully updated.",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Error updating category",
          description: error.message || "An error occurred while updating the category.",
          variant: "destructive"
        });
      }
    });
  };

  const useDeleteCategoryMutation = () => {
    return useMutation({
      mutationFn: deleteCategory,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
        toast({
          title: "Category deleted",
          description: "The category has been successfully deleted.",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Error deleting category",
          description: error.message || "An error occurred while deleting the category.",
          variant: "destructive"
        });
      }
    });
  };

  const useToggleCategoryStatusMutation = () => {
    return useMutation({
      mutationFn: toggleCategoryStatus,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
      },
      onError: (error: any) => {
        toast({
          title: "Error updating category status",
          description: error.message || "An error occurred while updating the category status.",
          variant: "destructive"
        });
      }
    });
  };

  const useToggleCategoryFeatureMutation = () => {
    return useMutation({
      mutationFn: toggleCategoryFeature,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
      },
      onError: (error: any) => {
        toast({
          title: "Error updating category featured status",
          description: error.message || "An error occurred while updating the category featured status.",
          variant: "destructive"
        });
      }
    });
  };

  return {
    useCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useToggleCategoryStatusMutation,
    useToggleCategoryFeatureMutation,
  };
};
