
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Pencil, Check, X, Info } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { StaffProfile } from '@/hooks/trainers/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useStaffData } from '@/hooks/staff/useStaffData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type EditingStaff = {
  id: string;
  role: string;
  access_level: string;
};

const roleOptions = [
  { value: 'trainer', label: 'Trainer', color: 'text-emerald-600' },
  { value: 'manager', label: 'Manager', color: 'text-blue-600' },
  { value: 'reception', label: 'Reception', color: 'text-amber-600' },
  { value: 'support', label: 'Support', color: 'text-gray-600' },
  { value: 'wellness', label: 'Wellness', color: 'text-teal-600' },
  { value: 'admin', label: 'Admin', color: 'text-purple-600' }
];

const accessLevelOptions = [
  { value: 'staff', label: 'Staff', description: 'Regular staff access' },
  { value: 'superadmin', label: 'Super Admin', description: 'Full system access' }
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

  const getRoleTextColor = (role: string) => {
    const option = roleOptions.find(opt => opt.value === role);
    return option?.color || 'text-gray-600';
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Staff Role Management</CardTitle>
          <CardDescription>Loading staff roles and permissions...</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-16 w-full rounded-md" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Staff Role Management</CardTitle>
        <CardDescription>Manage staff roles and access levels across the organization</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-medium">Full Name</TableHead>
                <TableHead className="font-medium">Email</TableHead>
                <TableHead className="font-medium">
                  <div className="flex items-center gap-1">
                    Role
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-60">Determines the staff member's function and capabilities in the system</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>
                <TableHead className="font-medium">
                  <div className="flex items-center gap-1">
                    Access Level
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-60">Controls what areas and features this staff member can access</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableHead>
                <TableHead className="font-medium">Status</TableHead>
                <TableHead className="text-right font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.map((staffMember) => (
                <TableRow key={staffMember.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{staffMember.full_name}</TableCell>
                  <TableCell className="text-muted-foreground">{staffMember.email || 'No email'}</TableCell>
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
                              <div className="flex items-center">
                                <span className={option.color}>{option.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge variant="outline" className={`${getRoleTextColor(staffMember.role || '')}`}>
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
                              <div className="flex flex-col">
                                <span>{option.label}</span>
                                <span className="text-xs text-muted-foreground">{option.description}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Badge
                        variant={staffMember.access_level === 'superadmin' ? 'destructive' : 'secondary'}
                        className="font-medium"
                      >
                        {staffMember.access_level || 'Staff'}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        staffMember.status?.toLowerCase() === 'active' ? 'secondary' :
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
                          aria-label="Cancel"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Cancel</span>
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={updateRole}
                          disabled={isUpdating}
                          aria-label="Save changes"
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
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => startEditing(staffMember)}
                              aria-label="Edit roles for this staff member"
                            >
                              <Pencil className="h-4 w-4 mr-1" />
                              Edit Roles
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Change role and access level</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffRoleManagement;
