
import { supabase, getTable } from '@/integrations/supabase/client';
import { PerformanceMetrics, ClassAttendance } from './types';
import { generateMockPerformanceData } from './mockData';

// Fetch trainer performance data
export const fetchTrainerPerformance = async (trainerId: string): Promise<{
  performanceMetrics: PerformanceMetrics;
  classAttendance: ClassAttendance[];
}> => {
  try {
    // This would typically be multiple API calls to get different metrics
    // For now, we'll simulate a real API call with some delay
    const startTime = Date.now();
    
    // Get sessions data
    const { data: sessionData, error: sessionError } = await getTable('client_sessions')
      .select('*')
      .eq('trainer_id', trainerId)
      .gte('session_date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()) // Last 30 days
      .order('session_date', { ascending: false });
      
    if (sessionError) throw sessionError;
    
    // Get ratings data
    const { data: ratingData, error: ratingError } = await getTable('trainer_ratings')
      .select('*')
      .eq('trainer_id', trainerId);
      
    if (ratingError) throw ratingError;
    
    // Get active client assignments
    const { data: assignmentData, error: assignmentError } = await getTable('trainer_client_assignments')
      .select('*')
      .eq('trainer_id', trainerId)
      .eq('status', 'active');
      
    if (assignmentError) throw assignmentError;
    
    // Calculate metrics based on real data
    // In a real app, these calculations would be more sophisticated
    const completedSessions = (sessionData || []).filter((s: any) => s.status === 'completed');
    const scheduledSessions = (sessionData || []).filter((s: any) => s.status === 'scheduled');
    const canceledSessions = (sessionData || []).filter((s: any) => s.status === 'canceled' || s.status === 'no-show');
    
    const ratings = (ratingData || []).map((r: any) => r.rating || 0);
    const avgRating = ratings.length > 0 
      ? ratings.reduce((sum: number, rating: number) => sum + rating, 0) / ratings.length 
      : 0;
      
    const totalHours = completedSessions.reduce((total: number, session: any) => 
      total + (session.duration || 0) / 60, 0);
      
    // In a real app, we would calculate these from actual data
    const newClients = 5; // This would be derived from assignments in the last 30 days
    const activeClients = (assignmentData || []).length;
    const retentionRate = activeClients > 0 ? 88 : 0; // Mock value, would be calculated
    
    // Create performance metrics
    const performanceMetrics: PerformanceMetrics = {
      id: trainerId,
      trainerId,
      period: 'Current Month',
      classes_taught: completedSessions.filter((s: any) => s.session_type === 'class').length,
      private_sessions: completedSessions.filter((s: any) => s.session_type === 'private').length,
      new_clients: newClients,
      client_retention_rate: retentionRate,
      avg_session_rating: parseFloat(avgRating.toFixed(1)),
      monthly_goal_progress: 82, // Mock
      class_fill_rate: 89, // Mock
      total_hours: parseFloat(totalHours.toFixed(1)),
      
      // Legacy fields for backward compatibility
      averageRating: parseFloat(avgRating.toFixed(1)),
      totalClasses: completedSessions.filter((s: any) => s.session_type === 'class').length,
      averageAttendance: 16, // Mock
      clientRetentionRate: retentionRate,
      monthlySessions: [
        { month: 'Jan', sessions: 30 },
        { month: 'Feb', sessions: 35 },
        { month: 'Mar', sessions: 40 },
        { month: 'Apr', sessions: 38 },
        { month: 'May', sessions: 42 },
        { month: 'Jun', sessions: 45 }
      ],
      completionRate: (completedSessions.length / (completedSessions.length + canceledSessions.length)) * 100,
      assignedClients: activeClients,
      retentionRate,
      satisfactionScore: Math.round(avgRating * 20), // Convert 0-5 to 0-100
      activeClients,
      monthlyGrowth: 8 // Mock
    };
    
    // Create mock class attendance data for now
    // In a real app, this would come from actual class attendance records
    const classAttendance: ClassAttendance[] = [];
    const classTypes = ['Yoga', 'HIIT', 'Spinning', 'Zumba', 'Pilates', 'Boxing'];
    
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      const capacity = 20 + Math.floor(Math.random() * 10);
      const attendees = Math.floor(capacity * (0.65 + Math.random() * 0.35));
      
      classAttendance.push({
        classId: `class-${i}`,
        className: classTypes[i % classTypes.length],
        date: dateString,
        capacity,
        attendees,
        fillRate: Math.round((attendees / capacity) * 100)
      });
    }
    
    // Simulate API delay of at least 500ms for realistic feel
    const elapsed = Date.now() - startTime;
    if (elapsed < 500) {
      await new Promise(resolve => setTimeout(resolve, 500 - elapsed));
    }
    
    return {
      performanceMetrics,
      classAttendance
    };
  } catch (error) {
    console.error('Error fetching trainer performance:', error);
    
    // Fallback to mock data if real API fails
    return generateMockPerformanceData(trainerId);
  }
};
