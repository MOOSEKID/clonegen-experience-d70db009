
import { Suspense, lazy } from "react";
import { PageLoading } from "../../routes/RouteComponents";
import { Route } from "react-router-dom";
import NotFound from "../../pages/NotFound";

// Dashboard pages
const Dashboard = lazy(() => import("../../pages/dashboard/Dashboard"));
const Workouts = lazy(() => import("../../pages/dashboard/Workouts"));
const Progress = lazy(() => import("../../pages/dashboard/Progress"));
const Schedule = lazy(() => import("../../pages/dashboard/Schedule"));
const Health = lazy(() => import("../../pages/dashboard/Health"));
const Achievements = lazy(() => import("../../pages/dashboard/Achievements"));
const Locations = lazy(() => import("../../pages/dashboard/Locations"));
const Settings = lazy(() => import("../../pages/dashboard/Settings"));
const WorkoutPrograms = lazy(() => import("../../pages/dashboard/WorkoutPrograms"));
const ExerciseLibrary = lazy(() => import("../../pages/dashboard/ExerciseLibrary"));
const NutritionTracking = lazy(() => import("../../pages/dashboard/NutritionTracking"));

/**
 * Hook to provide dashboard routes for the application
 * @returns JSX elements containing the routes
 */
export const useDashboardRoutes = () => {
  return (
    <>
      <Route index element={<Dashboard />} />
      <Route path="workouts" element={<Workouts />} />
      <Route path="progress" element={<Progress />} />
      <Route path="workout-programs" element={<WorkoutPrograms />} />
      <Route path="exercise-library" element={<ExerciseLibrary />} />
      <Route path="nutrition" element={<NutritionTracking />} />
      <Route path="schedule" element={<Schedule />} />
      <Route path="health" element={<Health />} />
      <Route path="achievements" element={<Achievements />} />
      <Route path="locations" element={<Locations />} />
      <Route path="settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </>
  );
};

export default useDashboardRoutes;
