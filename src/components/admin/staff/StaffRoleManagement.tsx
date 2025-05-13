
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Pencil, Check, X } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { StaffProfile } from '@/hooks/trainers/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useStaffData } from '@/hooks/staff/useStaffData';

type EditingStaff = {
  id: string;
  role: string;
  access_level: string;
};

const roleOptions = [
  { value: 'trainer', label: 'Trainer' },
  { value: 'manager', label: 'Manager' },
  { value: 'reception', label: 'Reception' },
  { value: 'support', label: 'Support' },
  { value: 'wellness', label: 'Wellness' },
  { value: 'admin', label: 'Admin' }
];

const accessLevelOptions = [
  { value: 'staff', label: 'Staff' },
  { value: 'superadmin', label: 'Super Admin' }
];

const StaffRoleManagement: React.FC = () => {
  const { staff, isLoading } = useStaffData();
  const { toast } = useToast();
  const [editing, setEditing] = useState<EditingStaff | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const startEditing = (staffMember: StaffProfile) => {
    setEditing({
      id: staffMember.id,
      role: staffMember.role || 'staff',
      access_level: staffMember.access_level || 'staff'
    });
  };

  const cancelEditing = () => {
    setEditing(null);
  };

  const updateRole = async () => {
    if (!editing) return;
    
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('staff')
        .update({
          role: editing.role,
          access_level: editing.access_level
        })
        .eq('id', editing.id);

      if (error) throw error;
      
      // Log the action in the audit log
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to perform this action.",
          variant: "destructive",
        });
        return;
      }

      const { error: auditError } = await supabase
        .from('admin_audit_logs')
        .insert({
          admin_id: sessionData.session.user.id,
          action: "role_updated",
          details: {
            staff_id: editing.id,
            new_role: editing.role,
            new_access: editing.access_level
          }
        });

      if (auditError) {
        console.error('Error logging audit action:', auditError);
      }

      toast({
        title: "Success",
        description: "Staff role updated successfully",
      });
      
      setEditing(null);
    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update staff role. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-8 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Access Level</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((staffMember) => (
              <TableRow key={staffMember.id}>
                <TableCell className="font-medium">{staffMember.full_name}</TableCell>
                <TableCell>{staffMember.email || 'No email'}</TableCell>
                <TableCell>
                  {editing?.id === staffMember.id ? (
                    <Select
                      value={editing.role}
                      onValueChange={(value) => setEditing({ ...editing, role: value })}
                      disabled={isUpdating}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roleOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge variant="outline">
                      {staffMember.role || 'Not Set'}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {editing?.id === staffMember.id ? (
                    <Select
                      value={editing.access_level}
                      onValueChange={(value) => setEditing({ ...editing, access_level: value })}
                      disabled={isUpdating}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select access level" />
                      </SelectTrigger>
                      <SelectContent>
                        {accessLevelOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Badge
                      variant={staffMember.access_level === 'superadmin' ? 'destructive' : 'secondary'}
                    >
                      {staffMember.access_level || 'Staff'}
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      staffMember.status?.toLowerCase() === 'active' ? 'success' :
                      staffMember.status?.toLowerCase() === 'inactive' ? 'destructive' : 'default'
                    }
                  >
                    {staffMember.status || 'Unknown'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {editing?.id === staffMember.id ? (
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={cancelEditing}
                        disabled={isUpdating}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Cancel</span>
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={updateRole}
                        disabled={isUpdating}
                      >
                        {isUpdating ? (
                          <div className="flex items-center">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-1"></div>
                            Saving...
                          </div>
                        ) : (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Save
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEditing(staffMember)}
                    >
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit Roles
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StaffRoleManagement;
