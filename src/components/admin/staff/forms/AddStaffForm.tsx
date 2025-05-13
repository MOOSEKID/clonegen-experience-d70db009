
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StaffProfile } from '@/hooks/trainers/types';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import StaffSpecialtiesField from '@/components/admin/staff/StaffSpecialtiesField';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form';

const addStaffSchema = z.object({
  full_name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal('')),
  phone: z.string().optional(),
  role: z.enum(['trainer', 'manager', 'reception', 'sales', 'support']),
  bio: z.string().optional(),
  photo_url: z.string().optional(),
  access_level: z.string(),
  status: z.string(),
  hire_date: z.string(),
  specialties: z.array(z.string()).optional(),
});

export type AddStaffFormValues = z.infer<typeof addStaffSchema>;

interface AddStaffFormProps {
  onSubmit: (data: Omit<StaffProfile, 'id' | 'certifications' | 'availability'>) => Promise<void>;
}

const AddStaffForm: React.FC<AddStaffFormProps> = ({ onSubmit }) => {
  const form = useForm<AddStaffFormValues>({
    resolver: zodResolver(addStaffSchema),
    defaultValues: {
      full_name: '',
      email: '',
      phone: '',
      role: undefined,
      bio: '',
      photo_url: '',
      access_level: 'staff',
      status: 'Active',
      hire_date: new Date().toISOString().split('T')[0],
      specialties: [],
    },
  });

  const handleFormSubmit = async (data: AddStaffFormValues) => {
    // Ensure we're passing a complete StaffProfile object with required fields
    const staffData: Omit<StaffProfile, 'id' | 'certifications' | 'availability'> = {
      full_name: data.full_name,
      email: data.email || undefined,
      phone: data.phone || undefined,
      role: data.role,
      bio: data.bio || undefined,
      photo_url: data.photo_url || undefined,
      access_level: data.access_level,
      status: data.status,
      hire_date: data.hire_date,
      specialties: data.specialties || [],
    };
    
    await onSubmit(staffData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter full name" {...field} />
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
                <FormLabel>Role*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="trainer">Trainer</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="reception">Reception</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
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
                  <Input type="email" placeholder="Enter email address" {...field} />
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
                  <Input placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select access level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="read-only">Read Only</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hire_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hire Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="photo_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photo URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter photo URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="specialties"
          render={({ field }) => (
            <FormItem>
              <StaffSpecialtiesField 
                value={field.value || []} 
                onChange={field.onChange}
                role={form.watch('role')}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biography</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter staff biography"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit">Add Staff Member</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddStaffForm;
