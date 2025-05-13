
import React, { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import AuditLogTable from '@/components/admin/audit/AuditLogTable';
import AuditLogFilters from '@/components/admin/audit/AuditLogFilters';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface AuditLog {
  id: string;
  admin_id: string;
  action: string;
  details: any;
  timestamp: string;
  admin_name?: string;
}

interface AdminInfo {
  id: string;
  name: string;
}

const AuditLogPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [actionOptions, setActionOptions] = useState<string[]>([]);
  const [adminOptions, setAdminOptions] = useState<AdminInfo[]>([]);
  const [filters, setFilters] = useState({
    action: '',
    adminId: '',
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
  });
  
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        if (!user) {
          setIsSuperAdmin(false);
          return;
        }

        const { data: staffData, error: staffError } = await supabase
          .from('staff')
          .select('access_level')
          .eq('id', user.id)
          .maybeSingle();

        if (staffError) throw staffError;
        
        setIsSuperAdmin(staffData?.access_level === 'superadmin');
      } catch (error) {
        console.error('Error checking admin access:', error);
        setIsSuperAdmin(false);
      }
    };

    checkAdminAccess();
  }, [user]);

  useEffect(() => {
    if (!isSuperAdmin) return;
    
    const fetchAuditLogs = async () => {
      setIsLoading(true);
      try {
        let query = supabase
          .from('admin_audit_logs')
          .select('*')
          .order('timestamp', { ascending: false });
        
        // Apply filters
        if (filters.action) {
          query = query.eq('action', filters.action);
        }
        
        if (filters.adminId) {
          query = query.eq('admin_id', filters.adminId);
        }
        
        if (filters.startDate) {
          const startDateStr = filters.startDate.toISOString();
          query = query.gte('timestamp', startDateStr);
        }
        
        if (filters.endDate) {
          const endDate = new Date(filters.endDate);
          endDate.setDate(endDate.getDate() + 1); // Add one day to include the whole day
          const endDateStr = endDate.toISOString();
          query = query.lt('timestamp', endDateStr);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        // Fetch unique action types for filter options
        if (!filters.action && !filters.adminId && !filters.startDate && !filters.endDate) {
          const { data: actionsData } = await supabase
            .from('admin_audit_logs')
            .select('action')
            .limit(100);
          
          if (actionsData) {
            const uniqueActions = [...new Set(actionsData.map(item => item.action))];
            setActionOptions(uniqueActions);
          }
          
          // Fetch admins for filter options
          const { data: adminsData } = await supabase
            .from('staff')
            .select('id, full_name')
            .in('access_level', ['superadmin', 'admin'])
            .limit(100);
          
          if (adminsData) {
            setAdminOptions(adminsData.map(admin => ({
              id: admin.id,
              name: admin.full_name
            })));
          }
        }
        
        // Enhance logs with admin names
        if (data) {
          const adminIds = [...new Set(data.map(log => log.admin_id))];
          
          if (adminIds.length > 0) {
            const { data: adminsData } = await supabase
              .from('staff')
              .select('id, full_name')
              .in('id', adminIds);
            
            const adminMap = new Map();
            if (adminsData) {
              adminsData.forEach(admin => {
                adminMap.set(admin.id, admin.full_name);
              });
            }
            
            const enhancedLogs = data.map(log => ({
              ...log,
              admin_name: adminMap.get(log.admin_id) || log.admin_id
            }));
            
            setLogs(enhancedLogs);
          } else {
            setLogs(data);
          }
        }
      } catch (error) {
        console.error('Error fetching audit logs:', error);
        toast({
          title: "Error",
          description: "Failed to load audit logs. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuditLogs();
  }, [isSuperAdmin, filters, toast]);

  const handleFilterChange = (name: 'action' | 'adminId' | 'startDate' | 'endDate', value: any) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      action: '',
      adminId: '',
      startDate: undefined,
      endDate: undefined
    });
  };

  if (!isSuperAdmin) {
    return (
      <Card className="mx-auto max-w-lg mt-12">
        <CardHeader>
          <CardTitle className="text-center text-red-500">Access Denied</CardTitle>
          <CardDescription className="text-center">
            You don't have permission to view this page. Only superadmins can access the audit logs.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Admin Audit Logs</h1>
        <p className="text-gray-500">View and filter system activity logs</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Narrow down the audit logs by specific criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <AuditLogFilters
            filters={filters}
            actionOptions={actionOptions}
            adminOptions={adminOptions}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audit Log Entries</CardTitle>
          <CardDescription>
            {isLoading ? 'Loading...' : `Showing ${logs.length} log entries`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <AuditLogTable logs={logs} isLoading={isLoading} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogPage;
