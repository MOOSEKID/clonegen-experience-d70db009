
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useProducts, ProductFormData, Product } from '@/hooks/useProducts';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required and must be at least 2 characters'),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  category_id: z.string().min(1, 'Category ID is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  member_price: z.number().nullable().optional(),
  sku: z.string().optional(),
  stock_count: z.number().min(0, 'Stock count must be a positive number'),
  is_active: z.boolean().default(true),
  is_public: z.boolean().default(true),
  is_instore: z.boolean().default(true),
  is_member_only: z.boolean().default(false),
});

interface ProductFormProps {
  product?: Product;
  mode: 'add' | 'edit';
}

const ProductForm: React.FC<ProductFormProps> = ({ product, mode }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);
  
  const { 
    useCreateProductMutation, 
    useUpdateProductMutation,
    isUploading
  } = useProducts();
  
  const createProductMutation = useCreateProductMutation();
  const updateProductMutation = useUpdateProductMutation();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name');
        
      if (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: 'Error fetching categories',
          description: 'Please try again later',
          variant: 'destructive',
        });
        return;
      }
      
      if (data) {
        setCategories(data);
      }
    };
    
    fetchCategories();
  }, []);
  
  // Initialize form with product data if in edit mode
  const form = useForm<ProductFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      category: product?.category || '',
      category_id: product?.category_id || '',
      price: product?.price || 0,
      member_price: product?.member_price || null,
      sku: product?.sku || '',
      stock_count: typeof product?.stock_count === 'number' ? product.stock_count : 0,
      is_active: product?.is_active ?? true,
      is_public: product?.is_public ?? true,
      is_instore: product?.is_instore ?? true,
      is_member_only: product?.is_member_only ?? false,
      image_url: product?.image_url || null,
    },
  });
  
  // Set image preview from existing product
  useEffect(() => {
    if (product?.image_url) {
      setImagePreview(product.image_url);
    }
  }, [product]);

  // Handle image file selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImageFile(file);
    
    // Create a preview URL
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
    
    // Clean up preview URL when component unmounts
    return () => URL.revokeObjectURL(objectUrl);
  };

  // Handle form submission
  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsSubmitting(true);
      
      // Convert string values to numbers if needed
      const formData: ProductFormData = {
        ...data,
        price: Number(data.price),
        member_price: data.member_price ? Number(data.member_price) : null,
        stock_count: Number(data.stock_count),
      };
      
      if (imageFile) {
        formData.imageFile = imageFile;
      }
      
      if (mode === 'add') {
        if (!formData.image_url && !formData.imageFile) {
          formData.image_url = null;
        }
        
        await createProductMutation.mutateAsync(formData);
        navigate('/admin/shop/products');
      } else if (mode === 'edit' && product) {
        formData.id = product.id;
        formData.image_url = formData.imageFile ? undefined : product.image_url;
        
        await updateProductMutation.mutateAsync(formData);
        navigate('/admin/shop/products');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error saving product',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Product description" 
                      className="min-h-32" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        // Also set the category name
                        const selectedCategory = categories.find(cat => cat.id === value);
                        if (selectedCategory) {
                          form.setValue('category', selectedCategory.name);
                        }
                      }}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="SKU" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (RWF)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        min="0" 
                        step="100" 
                        {...field} 
                        onChange={(e) => field.onChange(parseFloat(e.target.value))} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="member_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Member Price (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Member price" 
                        min="0" 
                        step="100" 
                        value={field.value || ""}
                        onChange={(e) => {
                          const value = e.target.value === "" ? null : parseFloat(e.target.value);
                          field.onChange(value);
                        }} 
                      />
                    </FormControl>
                    <FormDescription>
                      Special price for gym members. Leave empty to use regular price.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="stock_count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Count</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      min="0" 
                      step="1" 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <FormLabel className="block mb-2">Product Image</FormLabel>
              <div className="border rounded-lg p-4 text-center">
                {imagePreview ? (
                  <div className="mb-4">
                    <img 
                      src={imagePreview} 
                      alt="Product preview" 
                      className="mx-auto max-h-56 object-contain"
                    />
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-lg p-6 mb-4">
                    <div className="text-gray-400">No image selected</div>
                  </div>
                )}
                
                <Input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange} 
                  className="max-w-full"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Recommended size: 800x800px, max 2MB
                </p>
              </div>
            </div>
            
            <div className="space-y-4 border rounded-lg p-4">
              <h3 className="font-medium">Visibility Settings</h3>
              
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="is_active"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div>
                        <FormLabel className="cursor-pointer">Active</FormLabel>
                        <FormDescription>
                          Show this product in the shop
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="is_public"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div>
                        <FormLabel className="cursor-pointer">Show Online</FormLabel>
                        <FormDescription>
                          Display in the online store
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="is_instore"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div>
                        <FormLabel className="cursor-pointer">Show In-store</FormLabel>
                        <FormDescription>
                          Available for in-store purchases
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="is_member_only"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div>
                        <FormLabel className="cursor-pointer">Member Only</FormLabel>
                        <FormDescription>
                          Only visible to gym members
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/admin/shop/products')}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-gym-orange hover:bg-gym-orange/90"
            disabled={isSubmitting || isUploading}
          >
            {isSubmitting || isUploading ? 'Saving...' : mode === 'add' ? 'Create Product' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
