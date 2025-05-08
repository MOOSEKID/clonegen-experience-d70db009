
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface DateRangeFilterProps {
  onDateRangeChange: (from: Date | undefined, to: Date | undefined) => void;
}

const DateRangeFilter = ({ onDateRangeChange }: DateRangeFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date()
  });

  const handleDateRangeChange = (
    newDateRange: { from: Date | undefined; to: Date | undefined }
  ) => {
    setDateRange(newDateRange);
    if (newDateRange.from) {
      onDateRangeChange(newDateRange.from, newDateRange.to);
      // Only close when both dates are selected
      if (newDateRange.from && newDateRange.to) {
        setIsOpen(false);
      }
    }
  };

  const predefinedRanges = [
    { label: 'This Week', days: 7 },
    { label: 'This Month', days: 30 },
    { label: 'Last 3 Months', days: 90 },
    { label: 'Last 6 Months', days: 180 },
    { label: 'Year to Date', days: 365 },
  ];

  const selectPredefinedRange = (days: number) => {
    const to = new Date();
    const from = new Date();
    from.setDate(from.getDate() - days);
    
    const newRange = { from, to };
    setDateRange(newRange);
    onDateRangeChange(from, to);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center justify-between w-[240px] px-3"
        >
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span className="text-sm">
              {dateRange.from ? format(dateRange.from, 'PPP') : 'Select'} - 
              {dateRange.to ? format(dateRange.to, 'PPP') : 'Select'}
            </span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 border-r">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Quick Select</h4>
              <div className="flex flex-col space-y-1">
                {predefinedRanges.map((range) => (
                  <Button 
                    key={range.label}
                    variant="ghost" 
                    size="sm" 
                    onClick={() => selectPredefinedRange(range.days)}
                    className="justify-start text-sm h-8"
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={(range) => handleDateRangeChange(range || { from: undefined, to: undefined })}
              numberOfMonths={1}
              disabled={(date) => date > new Date()}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateRangeFilter;
