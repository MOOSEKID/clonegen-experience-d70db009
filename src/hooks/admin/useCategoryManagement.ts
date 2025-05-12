
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Category } from '@/hooks/useCategories';

export const useCategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch categories from Supabase
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (fetchError) {
        console.error('Error fetching categories:', fetchError);
        setError(new Error(fetchError.message));
        return;
      }
      
      setCategories(data || []);
    } catch (err: any) {
      console.error('Unexpected error fetching categories:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Create a new category
  const createCategory = async (categoryData: Omit<Category, 'id' | 'created_at' | 'updated_at' | 'productCount'>) => {
    setSubmitting(true);
    setError(null);
    
    try {
      // Generate slug from name if not provided
      if (!categoryData.slug) {
        categoryData.slug = categoryData.name
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '');
      }
      
      // Get current user ID for creator tracking
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      
      const finalData = {
        ...categoryData,
        created_by: userId
      };
      
      const { data, error: createError } = await supabase
        .from('categories')
        .insert(finalData)
        .select()
        .single();

      if (createError) {
        console.error('Error creating category:', createError);
        setError(new Error(createError.message));
        toast.error('Failed to create category');
        return null;
      }

      toast.success('Category created successfully');
      await fetchCategories(); // Refresh categories
      return data;
    } catch (err: any) {
      console.error('Error in createCategory:', err);
      setError(err);
      toast.error('Failed to create category');
      return null;
    } finally {
      setSubmitting(false);
    }
  };
  
  // Update an existing category
  const updateCategory = async (id: string, categoryData: Partial<Omit<Category, 'id' | 'created_at' | 'updated_at' | 'productCount'>>) => {
    setSubmitting(true);
    setError(null);
    
    try {
      // If changing name and slug not explicitly provided, update slug too
      if (categoryData.name && !categoryData.slug) {
        categoryData.slug = categoryData.name
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '');
      }
      
      // Get current user ID for tracking who updated
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      
      const finalData = {
        ...categoryData,
        updated_by: userId
      };
      
      const { error: updateError } = await supabase
        .from('categories')
        .update(finalData)
        .eq('id', id);

      if (updateError) {
        console.error('Error updating category:', updateError);
        setError(new Error(updateError.message));
        toast.error('Failed to update category');
        return false;
      }

      toast.success('Category updated successfully');
      await fetchCategories(); // Refresh categories
      return true;
    } catch (err: any) {
      console.error('Error in updateCategory:', err);
      setError(err);
      toast.error('Failed to update category');
      return false;
    } finally {
      setSubmitting(false);
    }
  };
  
  // Delete a category
  const deleteCategory = async (id: string) => {
    setSubmitting(true);
    setError(null);
    
    try {
      // Check if category is used in any products
      const { count, error: countError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', id);

      if (countError) {
        console.error('Error checking products:', countError);
        setError(new Error(countError.message));
        toast.error('Failed to check if category is in use');
        return false;
      }
      
      if (count && count > 0) {
        toast.error(`Cannot delete category that is used by ${count} product${count > 1 ? 's' : ''}. Please reassign products first.`);
        return false;
      }

      const { error: deleteError } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (deleteError) {
        console.error('Error deleting category:', deleteError);
        setError(new Error(deleteError.message));
        toast.error('Failed to delete category');
        return false;
      }

      toast.success('Category deleted successfully');
      await fetchCategories(); // Refresh categories
      return true;
    } catch (err: any) {
      console.error('Error in deleteCategory:', err);
      setError(err);
      toast.error('Failed to delete category');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle category active status
  const toggleCategoryStatus = async (id: string, isActive: boolean) => {
    return updateCategory(id, { is_active: isActive });
  };

  // Toggle category featured status
  const toggleCategoryFeatured = async (id: string, isFeatured: boolean) => {
    return updateCategory(id, { featured: isFeatured });
  };
  
  // Load categories on component mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    submitting,
    error,
    createCategory,
    updateCategory,
    deleteCategory,
    toggleCategoryStatus,
    toggleCategoryFeatured,
    refresh: fetchCategories
  };
};
