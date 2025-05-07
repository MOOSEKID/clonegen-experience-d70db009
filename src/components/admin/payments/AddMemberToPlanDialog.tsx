
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getAvailableMembers } from '@/services/memberService';

const newMemberSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 characters' }).optional(),
});

type NewMemberFormValues = z.infer<typeof newMemberSchema>;

interface AddMemberToPlanDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (data: any) => void;
  planName: string;
  planId: string;
}

export const AddMemberToPlanDialog = ({ isOpen, onClose, onAddMember, planName, planId }: AddMemberToPlanDialogProps) => {
  const [activeTab, setActiveTab] = useState<string>('existing');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [availableMembers, setAvailableMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);

  // Form for creating a new member
  const form = useForm<NewMemberFormValues>({
    resolver: zodResolver(newMemberSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  // Load available members
  React.useEffect(() => {
    if (isOpen && activeTab === 'existing') {
      setIsLoading(true);
      // In a real app, this would be an API call with pagination, filtering, etc.
      getAvailableMembers()
        .then(data => {
          setAvailableMembers(data);
        })
        .catch(error => {
          console.error('Error fetching members:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isOpen, activeTab]);

  // Filter members based on search term
  const filteredMembers = availableMembers.filter(
    member => 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitNewMember = (data: NewMemberFormValues) => {
    onAddMember(data);
    onClose();
    form.reset();
  };

  const handleSelectExistingMember = () => {
    if (selectedMember) {
      const member = availableMembers.find(m => m.id === selectedMember);
      if (member) {
        onAddMember(member);
        onClose();
        setSelectedMember(null);
        setSearchTerm('');
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Add Member to "{planName}" Plan</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow overflow-hidden flex flex-col">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="existing">Select Existing</TabsTrigger>
            <TabsTrigger value="new">Create New</TabsTrigger>
          </TabsList>

          <TabsContent value="existing" className="flex-grow overflow-hidden flex flex-col">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <ScrollArea className="flex-grow h-[300px] border rounded-md">
              {isLoading ? (
                <div className="p-4 text-center">Loading members...</div>
              ) : filteredMembers.length > 0 ? (
                <div className="p-1">
                  {filteredMembers.map((member) => (
                    <div 
                      key={member.id}
                      onClick={() => setSelectedMember(member.id)}
                      className={`flex items-center p-3 border-b cursor-pointer hover:bg-gray-50 rounded ${
                        selectedMember === member.id ? 'bg-blue-50 border border-blue-200' : ''
                      }`}
                    >
                      <Avatar className="h-8 w-8 mr-3">
                        <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}`} />
                        <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full p-4 text-center">
                  {searchTerm ? 
                    <p className="text-gray-500">No members found matching your search.</p> : 
                    <p className="text-gray-500">No available members to add.</p>
                  }
                </div>
              )}
            </ScrollArea>

            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleSelectExistingMember}
                disabled={!selectedMember}
              >
                Add Selected Member
              </Button>
            </DialogFooter>
          </TabsContent>

          <TabsContent value="new" className="flex-grow">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmitNewMember)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
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
                        <Input placeholder="john.doe@example.com" {...field} />
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
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="+250 780 123 456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter className="pt-4">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Add New Member
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
