
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Category } from '@/hooks/useCategories';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Define the form validation schema
const categoryFormSchema = z.object({
  name: z.string().min(2, 'Category name is required'),
  description: z.string().optional(),
  icon: z.string(),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

interface CategoryFormProps {
  initialData?: Category;
  onSubmit: (data: Omit<Category, 'id' | 'created_at' | 'updated_at' | 'productCount'>) => void;
  isLoading?: boolean;
}

// Available icons
const availableIcons = [
  { value: 'Utensils', label: 'Utensils (Supplements)' },
  { value: 'Dumbbell', label: 'Dumbbell (Equipment)' },
  { value: 'Shirt', label: 'Shirt (Apparel)' },
  { value: 'ShoppingBag', label: 'Shopping Bag (General)' },
  { value: 'Heart', label: 'Heart (Health)' },
  { value: 'Star', label: 'Star (Featured)' },
];

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  onSubmit,
  isLoading = false,
}) => {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      icon: initialData?.icon || 'ShoppingBag',
    },
  });

  const handleSubmit = (values: CategoryFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Category name" {...field} />
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
                  placeholder="Describe the category..."
                  className="min-h-[100px]"
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormDescription>
                A short description of the category shown to customers
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || 'ShoppingBag'}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableIcons.map((icon) => (
                    <SelectItem key={icon.value} value={icon.value}>
                      {icon.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Icon to represent this category
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm mr-2"></span>
                Saving...
              </>
            ) : initialData ? (
              'Update Category'
            ) : (
              'Create Category'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CategoryForm;
