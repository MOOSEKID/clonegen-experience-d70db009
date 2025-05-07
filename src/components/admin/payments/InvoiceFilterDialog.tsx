
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from 'lucide-react';

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterValues) => void;
  currentFilters: FilterValues;
}

export interface FilterValues {
  dateFrom: string;
  dateTo: string;
  status: string;
  minAmount: string;
  maxAmount: string;
}

export const InvoiceFilterDialog = ({ 
  isOpen, 
  onClose, 
  onApplyFilters,
  currentFilters
}: FilterDialogProps) => {
  const { register, handleSubmit, reset, setValue } = useForm<FilterValues>({
    defaultValues: currentFilters
  });

  React.useEffect(() => {
    // Update form when filters change
    reset(currentFilters);
  }, [currentFilters, reset]);

  const onSubmit = (data: FilterValues) => {
    onApplyFilters(data);
    onClose();
  };

  const clearFilters = () => {
    const emptyFilters = {
      dateFrom: '',
      dateTo: '',
      status: '',
      minAmount: '',
      maxAmount: '',
    };
    
    reset(emptyFilters);
    onApplyFilters(emptyFilters);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Filter Invoices</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={currentFilters.status} 
              onValueChange={(value) => setValue('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateFrom">Date From</Label>
              <div className="relative">
                <Input 
                  id="dateFrom"
                  type="date"
                  {...register('dateFrom')}
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dateTo">Date To</Label>
              <div className="relative">
                <Input 
                  id="dateTo"
                  type="date"
                  {...register('dateTo')}
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minAmount">Min Amount ($)</Label>
              <Input 
                id="minAmount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                {...register('minAmount')}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxAmount">Max Amount ($)</Label>
              <Input 
                id="maxAmount"
                type="number"
                step="0.01"
                min="0"
                placeholder="Any"
                {...register('maxAmount')}
              />
            </div>
          </div>
          
          <DialogFooter className="pt-4 flex gap-2 justify-between sm:justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
            <div className="space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit">Apply Filters</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
