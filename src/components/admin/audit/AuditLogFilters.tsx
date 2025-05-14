
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';

interface AuditLogFiltersProps {
  filters: {
    action: string;
    adminId: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
  };
  actionOptions: string[];
  adminOptions: { id: string; name: string }[];
  onFilterChange: (
    name: 'action' | 'adminId' | 'startDate' | 'endDate',
    value: any
  ) => void;
  onClearFilters: () => void;
}

const AuditLogFilters: React.FC<AuditLogFiltersProps> = ({
  filters,
  actionOptions,
  adminOptions,
  onFilterChange,
  onClearFilters,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Action Type</label>
          <Select
            value={filters.action}
            onValueChange={(value) => onFilterChange('action', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Actions</SelectItem>
              {actionOptions.map((action) => (
                <SelectItem key={action} value={action}>
                  {action.replace(/_/g, ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Admin User</label>
          <Select
            value={filters.adminId}
            onValueChange={(value) => onFilterChange('adminId', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select admin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Admins</SelectItem>
              {adminOptions.map((admin) => (
                <SelectItem key={admin.id} value={admin.id}>
                  {admin.name || admin.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Start Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !filters.startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.startDate ? format(filters.startDate, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.startDate}
                onSelect={(date) => onFilterChange('startDate', date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">End Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !filters.endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.endDate ? format(filters.endDate, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filters.endDate}
                onSelect={(date) => onFilterChange('endDate', date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="outline" onClick={onClearFilters} className="flex items-center gap-2">
          <X className="h-4 w-4" />
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default AuditLogFilters;
