
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from 'date-fns';
import { StaffProfile } from '@/hooks/trainers/types';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import StaffSpecialtiesField from './StaffSpecialtiesField';

const staffProfileSchema = z.object({
  full_name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal('')),
  phone: z.string().optional(),
  bio: z.string().optional(),
  photo_url: z.string().optional(),
  status: z.string(),
  role: z.enum(['trainer', 'manager', 'reception', 'sales', 'support']),
  access_level: z.string(),
  hire_date: z.string().optional(),
  specialties: z.array(z.string()).optional(),
});

export type StaffProfileFormValues = z.infer<typeof staffProfileSchema>;

interface StaffProfileFormProps {
  staffMember: StaffProfile;
  onSubmit: (data: Partial<StaffProfile>) => Promise<void>;
}

const StaffProfileForm: React.FC<StaffProfileFormProps> = ({ staffMember, onSubmit }) => {
  const form = useForm<StaffProfileFormValues>({
    resolver: zodResolver(staffProfileSchema),
    defaultValues: {
      full_name: staffMember.full_name,
      email: staffMember.email || '',
      phone: staffMember.phone || '',
      bio: staffMember.bio || '',
      photo_url: staffMember.photo_url || '',
      status: staffMember.status || 'Active',
      role: staffMember.role,
      access_level: staffMember.access_level || 'staff',
      hire_date: staffMember.hire_date 
        ? format(new Date(staffMember.hire_date), 'yyyy-MM-dd') 
        : format(new Date(), 'yyyy-MM-dd'),
      specialties: staffMember.specialties || [],
    },
  });

  const handleFormSubmit = async (data: StaffProfileFormValues) => {
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form id="staff-form" onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form.Field
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Full Name*</Form.Label>
                <Form.Control>
                  <Input placeholder="Enter full name" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={form.control}
            name="email"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Email</Form.Label>
                <Form.Control>
                  <Input type="email" placeholder="Enter email address" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={form.control}
            name="phone"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Phone</Form.Label>
                <Form.Control>
                  <Input placeholder="Enter phone number" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={form.control}
            name="role"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Role*</Form.Label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <Form.Control>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </Form.Control>
                  <SelectContent>
                    <SelectItem value="trainer">Trainer</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="reception">Reception</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={form.control}
            name="status"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Status</Form.Label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <Form.Control>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </Form.Control>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                  </SelectContent>
                </Select>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={form.control}
            name="access_level"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Access Level</Form.Label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <Form.Control>
                    <SelectTrigger>
                      <SelectValue placeholder="Select access level" />
                    </SelectTrigger>
                  </Form.Control>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="read-only">Read Only</SelectItem>
                  </SelectContent>
                </Select>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={form.control}
            name="hire_date"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Hire Date</Form.Label>
                <Form.Control>
                  <Input type="date" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />

          <Form.Field
            control={form.control}
            name="photo_url"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Photo URL</Form.Label>
                <Form.Control>
                  <Input placeholder="Enter photo URL" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
        </div>

        <StaffSpecialtiesField form={form} />

        <Form.Field
          control={form.control}
          name="bio"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Biography</Form.Label>
              <Form.Control>
                <Textarea
                  placeholder="Enter staff biography"
                  className="min-h-[120px]"
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
      </form>
    </Form>
  );
};

export default StaffProfileForm;
