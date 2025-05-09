
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';

interface AddHolidayDialogProps {
  onAddHoliday: (name: string, date: Date) => void;
}

const AddHolidayDialog = ({ onAddHoliday }: AddHolidayDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newHoliday, setNewHoliday] = useState<{ name: string, date: Date | undefined }>({
    name: '',
    date: undefined
  });

  const handleAddHoliday = () => {
    if (!newHoliday.name || !newHoliday.date) {
      toast.error('Please provide both a name and date for the holiday');
      return;
    }
    
    onAddHoliday(newHoliday.name, newHoliday.date);
    setNewHoliday({ name: '', date: undefined });
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Holiday
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Holiday</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="holiday-name">Holiday Name</Label>
            <Input
              id="holiday-name"
              placeholder="e.g. Christmas Day"
              value={newHoliday.name}
              onChange={(e) => setNewHoliday({ ...newHoliday, name: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Holiday Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {newHoliday.date ? format(newHoliday.date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={newHoliday.date}
                  onSelect={(date) => setNewHoliday({ ...newHoliday, date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button onClick={handleAddHoliday}>
              Add Holiday
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddHolidayDialog;
