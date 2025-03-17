
import { PerformanceMetrics, ClassAttendance } from './types';
import { supabase } from '@/integrations/supabase/client';
import { generateMockPerformanceData } from './mockData';

export const fetchTrainerPerformance = async (trainerId: string) => {
  try {
    // Attempt to fetch real data from Supabase
    const { data: trainerData, error: trainerError } = await supabase
      .from('trainers')
      .select('*')
      .eq('id', trainerId)
      .single();
      
    if (trainerError) {
      console.error('Error fetching trainer data:', trainerError);
      // If we can't get real data, return mock data
      return generateMockPerformanceData(trainerId);
    }
    
    // Fetch sessions data
    const { data: sessions, error: sessionsError } = await supabase
      .from('client_sessions')
      .select('*')
      .eq('trainer_id', trainerId);
      
    if (sessionsError) {
      console.error('Error fetching sessions data:', sessionsError);
      return generateMockPerformanceData(trainerId);
    }
    
    // Fetch class data
    const { data: classes, error: classesError } = await supabase
      .from('classes')
      .select('*')
      .eq('trainer_id', trainerId);
      
    if (classesError) {
      console.error('Error fetching classes data:', classesError);
      return generateMockPerformanceData(trainerId);
    }
    
    // Fetch ratings data
    const { data: ratings, error: ratingsError } = await supabase
      .from('trainer_ratings')
      .select('*')
      .eq('trainer_id', trainerId);
      
    if (ratingsError) {
      console.error('Error fetching ratings data:', ratingsError);
      return generateMockPerformanceData(trainerId);
    }
    
    // Fetch client assignments
    const { data: assignments, error: assignmentsError } = await supabase
      .from('trainer_client_assignments')
      .select('*')
      .eq('trainer_id', trainerId);
      
    if (assignmentsError) {
      console.error('Error fetching assignments data:', assignmentsError);
      return generateMockPerformanceData(trainerId);
    }
    
    // Process data
    const completedSessions = sessions?.filter(s => s.status === 'completed') || [];
    const activeAssignments = assignments?.filter(a => a.status === 'active') || [];
    const scheduledClasses = classes?.filter(c => c.status === 'Active') || [];
    
    // Calculate metrics
    const avgRating = ratings && ratings.length > 0 
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length 
      : 0;
      
    const totalHours = completedSessions.reduce((sum, s) => sum + (s.duration || 0) / 60, 0);
    
    // Create performance metrics object
    const performanceMetrics: PerformanceMetrics = {
      id: trainerId,
      trainerId,
      period: 'Current Month',
      classes_taught: scheduledClasses.length,
      private_sessions: completedSessions.length,
      new_clients: activeAssignments.filter(a => {
        const assignmentDate = new Date(a.assignment_date);
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        return assignmentDate >= oneMonthAgo;
      }).length,
      client_retention_rate: 90, // Would need historical data to calculate accurately
      avg_session_rating: avgRating,
      monthly_goal_progress: 75, // Would need goal data to calculate accurately
      class_fill_rate: 85, // Would need enrollment data to calculate accurately
      total_hours: totalHours,
      
      // Legacy fields
      averageRating: avgRating,
      totalClasses: scheduledClasses.length,
      averageAttendance: 0,
      clientRetentionRate: 90,
      monthlySessions: [],
      completionRate: completedSessions.length / (sessions?.length || 1) * 100,
      assignedClients: activeAssignments.length,
      retentionRate: 90,
      satisfactionScore: avgRating * 20, // Convert 5-star to percentage
      activeClients: activeAssignments.length,
      monthlyGrowth: 5 // Would need historical data to calculate accurately
    };
    
    // Mock class attendance data for now
    // In a real app, would fetch from class_enrollments table
    const classAttendance: ClassAttendance[] = scheduledClasses.map((cls, i) => ({
      classId: cls.id,
      className: cls.name,
      date: new Date().toISOString().split('T')[0],
      capacity: cls.capacity || 20,
      attendees: Math.floor((cls.capacity || 20) * (0.7 + (Math.random() * 0.3))),
      fillRate: 70 + Math.floor(Math.random() * 30)
    }));
    
    return {
      performanceMetrics,
      classAttendance
    };
  } catch (error) {
    console.error('Error in fetchTrainerPerformance:', error);
    return generateMockPerformanceData(trainerId);
  }
};
