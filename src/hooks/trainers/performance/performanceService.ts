
import { supabase } from '@/integrations/supabase/client';
import { PerformanceMetrics, ClassAttendance, TrainerPerformanceRecord } from './types';
import { generateMockPerformanceMetrics, generateMockAttendanceData } from './mockData';

export const fetchTrainerPerformance = async (trainerId?: string) => {
  if (!trainerId) {
    return {
      performanceMetrics: {} as PerformanceMetrics,
      classAttendance: [] as ClassAttendance[]
    };
  }
  
  try {
    // Try to fetch real performance data from the trainer_performance table
    const { data: performanceData, error: performanceError } = await supabase
      .from('trainer_performance')
      .select('*')
      .eq('trainer_id', trainerId)
      .order('date', { ascending: false })
      .limit(1);
      
    if (performanceError) {
      console.error('Error fetching trainer performance:', performanceError);
    }
    
    // If we have real data, use it. Otherwise, use mock data.
    let metrics: PerformanceMetrics;
    
    if (performanceData && performanceData.length > 0) {
      const perfRecord = performanceData[0] as TrainerPerformanceRecord;
      
      metrics = {
        averageRating: perfRecord.avg_session_rating || 0,
        totalClasses: perfRecord.classes_taught || 0,
        averageAttendance: perfRecord.class_fill_rate || 0,
        clientRetentionRate: 0, // Will calculate this later
        monthlySessions: [{ month: new Date().toLocaleString('default', { month: 'short' }), count: perfRecord.private_sessions || 0 }],
        completionRate: perfRecord.monthly_goal_progress || 0,
        classes_taught: perfRecord.classes_taught,
        private_sessions: perfRecord.private_sessions,
        new_clients: perfRecord.new_clients,
        avg_session_rating: perfRecord.avg_session_rating,
        monthly_goal_progress: perfRecord.monthly_goal_progress,
        class_fill_rate: perfRecord.class_fill_rate,
        total_hours: perfRecord.total_hours,
        activeClients: Math.round(perfRecord.new_clients * 1.5) || 0,
        monthlyGrowth: Math.round(perfRecord.new_clients / 10) || 0,
      };
    } else {
      // Fall back to mock data
      metrics = generateMockPerformanceMetrics(trainerId);
    }
    
    // Try to fetch class attendance data
    const { data: classesData, error: classesError } = await supabase
      .from('classes')
      .select(`
        id, 
        name,
        day,
        time,
        capacity,
        class_enrollments(id)
      `)
      .eq('trainer_id', trainerId)
      .limit(5);
      
    if (classesError) {
      console.error('Error fetching trainer classes:', classesError);
    }
    
    let attendance: ClassAttendance[] = [];
    
    if (classesData && classesData.length > 0) {
      attendance = classesData.map(classData => {
        const enrolledCount = classData.class_enrollments?.length || 0;
        const attendedCount = Math.floor(enrolledCount * (0.7 + Math.random() * 0.3)); // Random attendance between 70-100%
        
        return {
          class_name: classData.name,
          class_date: `${classData.day}, ${classData.time}`,
          enrolled_count: enrolledCount,
          attended_count: attendedCount,
          attendance_rate: enrolledCount > 0 ? Math.round((attendedCount / enrolledCount) * 100) : 0
        };
      });
    } else {
      // Fall back to mock attendance data
      attendance = generateMockAttendanceData(trainerId);
    }
    
    return {
      performanceMetrics: metrics,
      classAttendance: attendance
    };
  } catch (err) {
    console.error('Error fetching trainer performance:', err);
    
    // Fall back to mock data
    const mockMetrics = generateMockPerformanceMetrics(trainerId);
    const mockAttendance = generateMockAttendanceData(trainerId);
    
    return {
      performanceMetrics: mockMetrics,
      classAttendance: mockAttendance
    };
  }
};

export const saveTrainerPerformance = async (trainerId: string, metrics: Partial<TrainerPerformanceRecord>) => {
  try {
    // Check if a record exists for today
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    
    const { data: existingRecord, error: fetchError } = await supabase
      .from('trainer_performance')
      .select('id')
      .eq('trainer_id', trainerId)
      .eq('date', today)
      .single();
      
    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "No rows found"
      console.error('Error checking for existing performance record:', fetchError);
      return null;
    }
    
    if (existingRecord) {
      // Update existing record
      const { data, error } = await supabase
        .from('trainer_performance')
        .update({
          ...metrics,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingRecord.id)
        .select()
        .single();
        
      if (error) throw error;
      return data;
    } else {
      // Create new record
      const { data, error } = await supabase
        .from('trainer_performance')
        .insert({
          trainer_id: trainerId,
          date: today,
          ...metrics
        })
        .select()
        .single();
        
      if (error) throw error;
      return data;
    }
  } catch (err) {
    console.error('Error saving trainer performance:', err);
    return null;
  }
};
