
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { useAdminExercises } from '@/hooks/admin/useAdminExercises';
import ExerciseSearch from '@/components/admin/workouts/ExerciseSearch';
import ExerciseTabs from '@/components/admin/workouts/ExerciseTabs';
import ExerciseGrid from '@/components/admin/workouts/ExerciseGrid';
import ExerciseLibraryHeader from '@/components/admin/workouts/ExerciseLibraryHeader';
import ExerciseLibraryError from '@/components/admin/workouts/ExerciseLibraryError';
import ExerciseLibrarySkeleton from '@/components/admin/workouts/ExerciseLibrarySkeleton';
import ExerciseLibraryEmpty from '@/components/admin/workouts/ExerciseLibraryEmpty';

const ExerciseLibrary = () => {
  const { 
    isLoading, 
    error, 
    filteredExercises, 
    activeTab, 
    setActiveTab, 
    searchQuery, 
    setSearchQuery,
    handleClearFilters
  } = useAdminExercises();

  const handleSearchSubmit = () => {
    console.log("Search submitted for:", searchQuery);
    // This would trigger an API call in a real app
  };

  const handleImportExercises = () => {
    toast.info("Import functionality would be implemented here");
  };

  // Error state
  if (error) {
    return (
      <div className="space-y-6">
        <ExerciseLibraryHeader onImportExercises={handleImportExercises} />
        <ExerciseLibraryError errorMessage={error} />
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={
      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold text-red-600">Something went wrong</h2>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-primary text-white rounded"
        >
          Reload Page
        </button>
      </div>
    }>
      <div className="space-y-6">
        <ExerciseLibraryHeader onImportExercises={handleImportExercises} />
        
        <Card>
          <CardContent className="pt-6">
            <ExerciseSearch 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearchSubmit={handleSearchSubmit}
            />

            <ExerciseTabs 
              activeTab={activeTab}
              onTabChange={setActiveTab}
            >
              {isLoading ? (
                <ExerciseLibrarySkeleton />
              ) : (
                <>
                  {filteredExercises.length > 0 ? (
                    <ExerciseGrid exercises={filteredExercises} />
                  ) : (
                    <ExerciseLibraryEmpty onClearFilters={handleClearFilters} />
                  )}
                </>
              )}
            </ExerciseTabs>
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  );
};

export default ExerciseLibrary;
