
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface AuditLog {
  id: string;
  admin_id: string;
  action: string;
  details: any;
  timestamp: string;
  admin_name?: string; // If joined with staff/profiles
}

interface AuditLogTableProps {
  logs: AuditLog[];
  isLoading: boolean;
}

const AuditLogTable: React.FC<AuditLogTableProps> = ({ logs, isLoading }) => {
  if (isLoading) {
    return (
      <div className="py-4 text-center text-sm text-muted-foreground">
        Loading audit logs...
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-muted-foreground">
        No audit logs found
      </div>
    );
  }

  const formatTimestamp = (timestamp: string) => {
    try {
      return format(new Date(timestamp), 'MMM d, yyyy HH:mm:ss');
    } catch (e) {
      return timestamp;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Admin ID</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell className="font-medium">
                {log.admin_name || log.admin_id}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {log.action.replace(/_/g, ' ')}
                </Badge>
              </TableCell>
              <TableCell>{formatTimestamp(log.timestamp)}</TableCell>
              <TableCell>
                <pre className="text-xs whitespace-pre-wrap bg-gray-50 p-2 rounded-md max-h-24 overflow-y-auto">
                  {JSON.stringify(log.details, null, 2)}
                </pre>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AuditLogTable;
