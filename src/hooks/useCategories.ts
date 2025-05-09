
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export type Category = {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  created_at: string;
  updated_at: string;
  productCount?: number;
};

export const useCategories = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all categories
  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      throw new Error(error.message);
    }
    
    return data as Category[];
  };

  // Create a new category
  const createCategory = async (formData: Omit<Category, 'id' | 'created_at' | 'updated_at'>) => {
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
    data: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at'>> 
  }) => {
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

  return {
    useCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
  };
};
