
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type Category = {
  id: string;
  name: string;
  description: string;
  icon: string | null;
  created_at: string;
  updated_at: string;
  productCount?: number;
};

export const useCategories = () => {
  const queryClient = useQueryClient();
  
  // Fetch all categories
  const fetchCategories = async (): Promise<Category[]> => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
      
    if (error) {
      throw new Error(error.message);
    }
    
    return data as Category[];
  };

  // Fetch a single category by ID
  const fetchCategoryById = async (id: string): Promise<Category> => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      throw new Error(error.message);
    }
    
    return data as Category;
  };

  // Create a new category
  const createCategory = async (category: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Promise<Category> => {
    const { data, error } = await supabase
      .from('categories')
      .insert([category])
      .select()
      .single();
      
    if (error) {
      throw new Error(error.message);
    }
    
    return data as Category;
  };

  // Update an existing category
  const updateCategory = async (id: string, category: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>): Promise<Category> => {
    const { data, error } = await supabase
      .from('categories')
      .update(category)
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      throw new Error(error.message);
    }
    
    return data as Category;
  };

  // Delete a category
  const deleteCategory = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
      
    if (error) {
      throw new Error(error.message);
    }
  };

  // Hooks
  const useCategoriesQuery = () => {
    return useQuery({
      queryKey: ['categories'],
      queryFn: fetchCategories
    });
  };

  const useCategoryQuery = (id: string) => {
    return useQuery({
      queryKey: ['category', id],
      queryFn: () => fetchCategoryById(id),
      enabled: !!id
    });
  };

  const useCreateCategoryMutation = () => {
    return useMutation({
      mutationFn: createCategory,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
        toast('Category created successfully');
      },
      onError: (error: Error) => {
        toast(`Failed to create category: ${error.message}`, {
          variant: 'destructive'
        });
      }
    });
  };

  const useUpdateCategoryMutation = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>>}) => 
        updateCategory(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
        toast('Category updated successfully');
      },
      onError: (error: Error) => {
        toast(`Failed to update category: ${error.message}`, {
          variant: 'destructive'
        });
      }
    });
  };

  const useDeleteCategoryMutation = () => {
    return useMutation({
      mutationFn: deleteCategory,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
        toast('Category deleted successfully');
      },
      onError: (error: Error) => {
        toast(`Failed to delete category: ${error.message}`, {
          variant: 'destructive'
        });
      }
    });
  };

  return {
    useCategoriesQuery,
    useCategoryQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
  };
};
