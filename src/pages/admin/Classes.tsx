
import { useState } from 'react';
import { Grid3X3, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ClassesHeader from '@/components/admin/classes/ClassesHeader';
import ClassesTable from '@/components/admin/classes/ClassesTable';
import ClassesCalendar from '@/components/admin/classes/ClassesCalendar';
import AddClassDialog from '@/components/admin/classes/AddClassDialog';
import { useClassesData } from '@/hooks/useClassesData';
import { ErrorBoundary } from '@/components/ui/error-boundary';

const AdminClasses = () => {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [showAddClassDialog, setShowAddClassDialog] = useState(false);
  const { 
    classes, 
    isLoading, 
    addClass, 
    updateClass, 
    deleteClass,
    filterClasses,
    filteredClasses,
    filterType,
    setFilterType,
    bookClass,
    cancelBooking,
    toggleNotifications,
    notificationsEnabled
  } = useClassesData();

  console.log("Classes page rendering");

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <ClassesHeader 
          onAddClass={() => setShowAddClassDialog(true)}
          onFilterChange={(filter) => setFilterType(filter)}
          filterType={filterType}
          onToggleNotifications={toggleNotifications}
          notificationsEnabled={notificationsEnabled}
        />
        
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium">Class Schedule</h2>
            <Tabs 
              defaultValue={view} 
              value={view} 
              onValueChange={(value) => setView(value as 'list' | 'calendar')}
              className="h-9"
            >
              <TabsList className="bg-gray-100">
                <TabsTrigger value="list" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <Grid3X3 size={16} />
                  <span className="hidden sm:inline">List</span>
                </TabsTrigger>
                <TabsTrigger value="calendar" className="flex items-center gap-2 data-[state=active]:bg-white">
                  <Calendar size={16} />
                  <span className="hidden sm:inline">Calendar</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div>
            {view === 'list' ? (
              <ClassesTable 
                classes={filteredClasses}
                isLoading={isLoading}
                onEdit={updateClass}
                onDelete={deleteClass}
                onBookClass={bookClass}
                onCancelBooking={cancelBooking}
              />
            ) : (
              <ClassesCalendar classes={filteredClasses} />
            )}
          </div>
        </div>
        
        <AddClassDialog 
          open={showAddClassDialog} 
          onOpenChange={setShowAddClassDialog}
          onAddClass={addClass}
        />
      </div>
    </ErrorBoundary>
  );
};

export default AdminClasses;
