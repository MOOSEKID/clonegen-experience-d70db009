
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { StaffProfile } from '@/hooks/trainers/types';
import StaffSpecialtiesField from './StaffSpecialtiesField';

// Define the form schema
const staffProfileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }).optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  role: z.enum(['trainer', 'manager', 'reception', 'sales', 'support']),
  status: z.enum(['Active', 'Inactive']),
  bio: z.string().optional().or(z.literal('')),
  specialties: z.array(z.string()).optional(),
  photo_url: z.string().optional().or(z.literal('')),
  access_level: z.enum(['admin', 'staff', 'read-only']).default('staff'),
});

type StaffProfileFormValues = z.infer<typeof staffProfileSchema>;

interface StaffProfileFormProps {
  staffMember?: StaffProfile;
  onSubmit: (data: StaffProfileFormValues) => void;
  isSubmitting?: boolean;
}

const StaffProfileForm: React.FC<StaffProfileFormProps> = ({
  staffMember,
  onSubmit,
  isSubmitting = false,
}) => {
  const form = useForm<StaffProfileFormValues>({
    resolver: zodResolver(staffProfileSchema),
    defaultValues: {
      name: staffMember?.name || '',
      email: staffMember?.email || '',
      phone: staffMember?.phone || '',
      role: (staffMember?.role as any) || 'trainer',
      status: staffMember?.status || 'Active',
      bio: staffMember?.bio || '',
      specialties: staffMember?.specialization || [],
      photo_url: staffMember?.profile_picture || '',
      access_level: (staffMember?.access_level as any) || 'staff',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            {form.watch('photo_url') ? (
              <img src={form.watch('photo_url')} alt={form.watch('name')} />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted text-xl font-semibold uppercase text-muted-foreground">
                {form.watch('name').charAt(0)}
              </div>
            )}
          </Avatar>
          
          <FormField
            control={form.control}
            name="photo_url"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Profile picture URL" {...field} />
                </FormControl>
                <FormDescription>
                  Enter a URL for the profile picture
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+250 789 123 456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role *</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="trainer">Trainer</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="reception">Reception</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="support">Support Staff</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="access_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Access Level</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select access level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">Admin (Full Access)</SelectItem>
                    <SelectItem value="staff">Staff (Limited Access)</SelectItem>
                    <SelectItem value="read-only">Read Only</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Determines what actions this staff member can perform
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-md border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Active Status</FormLabel>
                  <FormDescription>
                    {field.value === 'Active' 
                      ? 'Staff member is currently active' 
                      : 'Staff member is currently inactive'}
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value === 'Active'}
                    onCheckedChange={(checked) => field.onChange(checked ? 'Active' : 'Inactive')}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        {form.watch('role') === 'trainer' && (
          <FormField
            control={form.control}
            name="specialties"
            render={({ field }) => (
              <StaffSpecialtiesField
                value={field.value || []}
                onChange={field.onChange}
              />
            )}
          />
        )}
        
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biography</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief description of the staff member's background and experience"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : staffMember ? 'Update Profile' : 'Create Profile'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StaffProfileForm;
