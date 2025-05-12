
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Role } from '@/hooks/settings/useRolePermissions';

const roleSchema = z.object({
  name: z.string().min(2, 'Role name must have at least 2 characters'),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof roleSchema>;

interface RoleFormProps {
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
  initialValues?: Partial<Role>;
  isSubmitting?: boolean;
}

const RoleForm: React.FC<RoleFormProps> = ({
  onSubmit,
  onCancel,
  initialValues = {},
  isSubmitting = false,
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: initialValues.name || '',
      description: initialValues.description || '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Manager, Trainer, Staff" {...field} />
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
                  placeholder="Describe the purpose and responsibilities of this role"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {initialValues.id ? 'Update Role' : 'Create Role'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RoleForm;
