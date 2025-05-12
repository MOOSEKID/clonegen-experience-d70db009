
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2, Upload } from 'lucide-react';
import { Category } from '@/hooks/useCategories';
import { useNavigate } from 'react-router-dom';
import { useCategoryManagement } from '@/hooks/admin/useCategoryManagement';
import { useProductManagement } from '@/hooks/admin/useProductManagement';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Form validation schema
const productFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  member_price: z.coerce.number().min(0, "Member price must be a positive number").optional(),
  stock_count: z.coerce.number().min(0, "Stock count must be a positive number"),
  category_id: z.string().min(1, "Category is required"),
  sku: z.string().optional(),
  image_url: z.string().optional(),
  is_active: z.boolean().default(true),
  is_public: z.boolean().default(true),
  is_instore: z.boolean().default(true),
  is_member_only: z.boolean().default(false)
});

type ProductFormValues = z.infer<typeof productFormSchema>;

type ProductFormProps = {
  initialData?: ProductFormValues;
  productId?: string;
  mode?: 'create' | 'edit';
};

export const ProductForm = ({ initialData, productId, mode = 'create' }: ProductFormProps) => {
  const navigate = useNavigate();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategoryManagement();
  const { createProduct, updateProduct, submitting, error } = useProductManagement();
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image_url || null);
  
  // Set up form with validation
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      price: 0,
      member_price: undefined,
      stock_count: 0,
      category_id: '',
      sku: '',
      image_url: '',
      is_active: true,
      is_public: true,
      is_instore: true,
      is_member_only: false
    }
  });
  
  // Handle image upload
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    setImageFile(file);
    
    // Create image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null;
    
    setUploading(true);
    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `product-images/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, imageFile);
        
      if (uploadError) {
        throw uploadError;
      }
      
      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);
        
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload product image');
      return null;
    } finally {
      setUploading(false);
    }
  };
  
  async function onSubmit(values: ProductFormValues) {
    // First upload image if there's a new one
    let finalImageUrl = values.image_url;
    if (imageFile) {
      const uploadedUrl = await uploadImage();
      if (uploadedUrl) {
        finalImageUrl = uploadedUrl;
      }
    }
    
    if (mode === 'create') {
      // Make sure name is explicitly defined as non-optional when creating product data
      const productData = {
        ...values,
        image_url: finalImageUrl,
        name: values.name, // Explicitly include name to satisfy TypeScript
        price: values.price, // Explicitly include required fields
        stock_count: values.stock_count, // Explicitly include required fields
        is_active: values.is_active,
        is_public: values.is_public, 
        is_instore: values.is_instore,
        category: categories.find(c => c.id === values.category_id)?.name || '',
        created_by: (await supabase.auth.getSession())?.data?.session?.user?.id
      };
      
      const result = await createProduct(productData);
      if (result) {
        toast.success('Product created successfully!');
        navigate('/admin/shop/products');
      }
    } else if (mode === 'edit' && productId) {
      // When updating, also include the category field
      const updateData = {
        ...values,
        image_url: finalImageUrl,
        name: values.name, // Explicitly include name to satisfy TypeScript
        category: categories.find(c => c.id === values.category_id)?.name || '',
        updated_by: (await supabase.auth.getSession())?.data?.session?.user?.id
      };
      
      const success = await updateProduct(productId, updateData);
      if (success) {
        toast.success('Product updated successfully!');
        navigate('/admin/shop/products');
      }
    }
  }

  if (categoriesError) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error loading categories: {categoriesError.message}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{mode === 'create' ? 'Add New Product' : 'Edit Product'}</CardTitle>
        <CardDescription>
          {mode === 'create' 
            ? 'Create a new product for your shop' 
            : 'Update this product in your shop'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error.message || 'An error occurred. Please try again.'}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
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
                      <Input placeholder="Product SKU" {...field} />
                    </FormControl>
                    <FormDescription>Unique product identifier</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Product description" 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
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
                        min="0" 
                        step="0.01" 
                        placeholder="Discounted price for members"
                        value={field.value ?? ''} 
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                      />
                    </FormControl>
                    <FormDescription>Special price for members</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="stock_count"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Count</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoriesLoading ? (
                          <div className="flex items-center justify-center p-4">
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            <span>Loading categories...</span>
                          </div>
                        ) : categories.length === 0 ? (
                          <div className="p-4 text-center">
                            <p className="text-sm text-muted-foreground">No categories found</p>
                            <Button 
                              variant="link" 
                              className="p-0 h-auto text-xs mt-1"
                              onClick={() => navigate('/admin/shop/categories')}
                            >
                              Create a category first
                            </Button>
                          </div>
                        ) : (
                          categories
                            .filter(c => c.is_active)
                            .map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <div className="flex flex-col space-y-3">
                        <Input 
                          type="file" 
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                          id="product-image"
                        />
                        <label 
                          htmlFor="product-image"
                          className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-md cursor-pointer w-fit"
                        >
                          <Upload size={16} />
                          <span>Upload Image</span>
                        </label>
                        <Input 
                          placeholder="Or enter image URL" 
                          {...field}
                          className="mt-2" 
                        />
                        {(imagePreview || field.value) && (
                          <div className="mt-3 relative w-32 h-32 border rounded overflow-hidden">
                            <img 
                              src={imagePreview || field.value} 
                              alt="Product preview" 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/200x200?text=No+Image';
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <FormDescription>Image for displaying the product</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between p-3 border rounded-md">
                    <div className="space-y-0.5">
                      <FormLabel>Active Product</FormLabel>
                      <FormDescription>Product is available for sale</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="is_public"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between p-3 border rounded-md">
                    <div className="space-y-0.5">
                      <FormLabel>Public Product</FormLabel>
                      <FormDescription>Visible on your online store</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="is_instore"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between p-3 border rounded-md">
                    <div className="space-y-0.5">
                      <FormLabel>In-Store</FormLabel>
                      <FormDescription>Available in physical store POS</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="is_member_only"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between p-3 border rounded-md">
                    <div className="space-y-0.5">
                      <FormLabel>Member Only</FormLabel>
                      <FormDescription>Only members can purchase</FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/admin/shop/products')}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={submitting || uploading}
              >
                {(submitting || uploading) ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {uploading ? 'Uploading...' : mode === 'create' ? 'Creating...' : 'Updating...'}
                  </>
                ) : (
                  mode === 'create' ? 'Create Product' : 'Update Product'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
