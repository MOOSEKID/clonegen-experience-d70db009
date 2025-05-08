
import { useState } from 'react';
import DateRangeFilter from './DateRangeFilter';
import { Button } from '@/components/ui/button';
import {
  Download,
  FileSpreadsheet,
  FileText,
  Mail,
  RefreshCw,
  Filter,
  X,
  ChevronDown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface FilterOption {
  id: string;
  label: string;
}

interface ReportFiltersProps {
  onDateRangeChange: (from: Date | undefined, to: Date | undefined) => void;
  onLocationFilter?: (locations: string[]) => void;
  onMembershipFilter?: (membershipTypes: string[]) => void;
  onRefresh?: () => void;
  onExport?: (format: 'pdf' | 'csv' | 'excel') => void;
  onSchedule?: () => void;
  availableLocations?: FilterOption[];
  availableMembershipTypes?: FilterOption[];
}

const ReportFilters = ({
  onDateRangeChange,
  onLocationFilter,
  onMembershipFilter,
  onRefresh,
  onExport,
  onSchedule,
  availableLocations = [],
  availableMembershipTypes = [],
}: ReportFiltersProps) => {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedMembershipTypes, setSelectedMembershipTypes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleLocationChange = (locationId: string) => {
    const isSelected = selectedLocations.includes(locationId);
    const newSelection = isSelected
      ? selectedLocations.filter((id) => id !== locationId)
      : [...selectedLocations, locationId];
    
    setSelectedLocations(newSelection);
    if (onLocationFilter) onLocationFilter(newSelection);
  };

  const handleMembershipChange = (membershipId: string) => {
    const isSelected = selectedMembershipTypes.includes(membershipId);
    const newSelection = isSelected
      ? selectedMembershipTypes.filter((id) => id !== membershipId)
      : [...selectedMembershipTypes, membershipId];
    
    setSelectedMembershipTypes(newSelection);
    if (onMembershipFilter) onMembershipFilter(newSelection);
  };

  const handleClearAllFilters = () => {
    setSelectedLocations([]);
    setSelectedMembershipTypes([]);
    if (onLocationFilter) onLocationFilter([]);
    if (onMembershipFilter) onMembershipFilter([]);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center">
        <div className="flex items-center gap-2">
          <DateRangeFilter onDateRangeChange={onDateRangeChange} />
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-gray-100" : ""}
          >
            <Filter className="h-4 w-4" />
          </Button>
          
          {onRefresh && (
            <Button variant="outline" size="icon" onClick={onRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          {onExport && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  <span>Export</span>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onExport('pdf')}>
                  <FileText className="mr-2 h-4 w-4 text-red-600" />
                  <span>PDF</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onExport('csv')}>
                  <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
                  <span>CSV</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onExport('excel')}>
                  <FileSpreadsheet className="mr-2 h-4 w-4 text-blue-600" />
                  <span>Excel</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          {onSchedule && (
            <Button variant="outline" size="sm" onClick={onSchedule}>
              <Mail className="mr-2 h-4 w-4" />
              <span>Schedule</span>
            </Button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="bg-white border rounded-md p-3 space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Filters</h3>
            {(selectedLocations.length > 0 || selectedMembershipTypes.length > 0) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClearAllFilters} 
                className="h-7 text-xs"
              >
                Clear all
              </Button>
            )}
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableLocations.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Location</h4>
                <div className="flex flex-wrap gap-2">
                  {availableLocations.map((location) => (
                    <Badge 
                      key={location.id}
                      variant={selectedLocations.includes(location.id) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleLocationChange(location.id)}
                    >
                      {location.label}
                      {selectedLocations.includes(location.id) && 
                        <X className="ml-1 h-3 w-3" />
                      }
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {availableMembershipTypes.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Membership Type</h4>
                <div className="flex flex-wrap gap-2">
                  {availableMembershipTypes.map((type) => (
                    <Badge 
                      key={type.id}
                      variant={selectedMembershipTypes.includes(type.id) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleMembershipChange(type.id)}
                    >
                      {type.label}
                      {selectedMembershipTypes.includes(type.id) && 
                        <X className="ml-1 h-3 w-3" />
                      }
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportFilters;
