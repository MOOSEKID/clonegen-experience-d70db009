
import { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  ChevronDown, 
  Edit, 
  Trash2,
  CheckCircle,
  XCircle,
  Download,
  Upload 
} from 'lucide-react';
import { Button } from '@/components/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

// Mock member data
const mockMembers = [
  { 
    id: 1, 
    name: 'John Smith', 
    email: 'john@example.com', 
    phone: '+250 78123456', 
    membershipType: 'Premium',
    startDate: '2023-01-15',
    endDate: '2024-01-15',
    status: 'Active',
    lastCheckin: '2023-06-15 09:45 AM',
  },
  { 
    id: 2, 
    name: 'Sarah Johnson', 
    email: 'sarah@example.com', 
    phone: '+250 79123456', 
    membershipType: 'Standard',
    startDate: '2023-02-10',
    endDate: '2023-08-10',
    status: 'Active',
    lastCheckin: '2023-06-14 06:30 PM',
  },
  { 
    id: 3, 
    name: 'Michael Brown', 
    email: 'michael@example.com', 
    phone: '+250 72123456', 
    membershipType: 'Basic',
    startDate: '2023-03-20',
    endDate: '2023-09-20',
    status: 'Inactive',
    lastCheckin: '2023-05-30 11:15 AM',
  },
  { 
    id: 4, 
    name: 'Emily Davis', 
    email: 'emily@example.com', 
    phone: '+250 73123456', 
    membershipType: 'Premium',
    startDate: '2023-01-05',
    endDate: '2024-01-05',
    status: 'Active',
    lastCheckin: '2023-06-15 08:00 AM',
  },
  { 
    id: 5, 
    name: 'David Wilson', 
    email: 'david@example.com', 
    phone: '+250 76123456', 
    membershipType: 'Standard',
    startDate: '2023-04-12',
    endDate: '2023-10-12',
    status: 'Active',
    lastCheckin: '2023-06-13 05:45 PM',
  },
];

const AdminMembers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState(mockMembers);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // In a real app, you would search the database here
  };

  const handleStatusChange = (memberId: number, newStatus: string) => {
    setMembers(members.map(member => 
      member.id === memberId ? { ...member, status: newStatus } : member
    ));
    toast.success(`Member status updated to ${newStatus}`);
  };

  const handleDelete = (memberId: number) => {
    setMembers(members.filter(member => member.id !== memberId));
    toast.success('Member deleted successfully');
  };

  const toggleMemberSelection = (memberId: number) => {
    setSelectedMembers(prevSelected => 
      prevSelected.includes(memberId)
        ? prevSelected.filter(id => id !== memberId)
        : [...prevSelected, memberId]
    );
  };

  const selectAllMembers = () => {
    if (selectedMembers.length === members.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(members.map(member => member.id));
    }
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.membershipType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Members</h1>
          <p className="text-gray-500">Manage your gym members</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button size="sm" variant="outline" className="gap-2">
            <Upload size={16} />
            <span>Import</span>
          </Button>
          <Button size="sm" variant="outline" className="gap-2">
            <Download size={16} />
            <span>Export</span>
          </Button>
          <Button size="sm" className="gap-2">
            <Plus size={16} />
            <span>Add Member</span>
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search members..."
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-md focus:outline-none focus:border-gym-orange"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter size={16} />
                  <span>Filter</span>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Members</DropdownMenuItem>
                <DropdownMenuItem>Active Members</DropdownMenuItem>
                <DropdownMenuItem>Inactive Members</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Premium</DropdownMenuItem>
                <DropdownMenuItem>Standard</DropdownMenuItem>
                <DropdownMenuItem>Basic</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                if (selectedMembers.length > 0) {
                  toast.success(`${selectedMembers.length} members selected`);
                } else {
                  toast.error('No members selected');
                }
              }}
            >
              Bulk Actions
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded border-gray-300 text-gym-orange focus:ring-gym-orange"
                    checked={selectedMembers.length === members.length && members.length > 0}
                    onChange={selectAllMembers}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Membership</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Last Check-in</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-gym-orange focus:ring-gym-orange"
                        checked={selectedMembers.includes(member.id)}
                        onChange={() => toggleMemberSelection(member.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.phone}</TableCell>
                    <TableCell>{member.membershipType}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${member.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'}`}
                      >
                        {member.status}
                      </span>
                    </TableCell>
                    <TableCell>{member.endDate}</TableCell>
                    <TableCell>{member.lastCheckin}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <ChevronDown size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          {member.status === 'Active' ? (
                            <DropdownMenuItem onClick={() => handleStatusChange(member.id, 'Inactive')}>
                              <XCircle className="mr-2 h-4 w-4" />
                              <span>Mark Inactive</span>
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleStatusChange(member.id, 'Active')}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              <span>Mark Active</span>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDelete(member.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    No members found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {filteredMembers.length} of {members.length} members
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMembers;
