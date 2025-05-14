
import { ClientSession } from './types';

const generateMockSessions = (trainerId?: string, clientId?: string): ClientSession[] => {
  const mockTrainerIds = ['1', '2', '3'];
  const mockClientIds = ['101', '102', '103', '104', '105'];
  const mockStatuses = ['scheduled', 'completed', 'canceled', 'no-show'];
  
  // Generate 5-10 mock sessions
  const count = Math.floor(Math.random() * 6) + 5;
  const sessions: ClientSession[] = [];
  
  for (let i = 0; i < count; i++) {
    // Use provided IDs or random ones
    const actualTrainerId = trainerId || mockTrainerIds[Math.floor(Math.random() * mockTrainerIds.length)];
    const actualClientId = clientId || mockClientIds[Math.floor(Math.random() * mockClientIds.length)];
    const status = mockStatuses[Math.floor(Math.random() * mockStatuses.length)];
    
    // Create date string for a random date in the past month
    const daysAgo = Math.floor(Math.random() * 30);
    const sessionDate = new Date();
    sessionDate.setDate(sessionDate.getDate() - daysAgo);
    
    // Random start time between 8:00 and 20:00
    const hour = Math.floor(Math.random() * 12) + 8;
    const minutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
    const startTime = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    
    // Calculate end time based on duration (30-90 minutes)
    const duration = [30, 45, 60, 90][Math.floor(Math.random() * 4)];
    const endTimeDate = new Date(sessionDate);
    endTimeDate.setHours(hour, minutes + duration);
    const endTime = `${String(endTimeDate.getHours()).padStart(2, '0')}:${String(endTimeDate.getMinutes()).padStart(2, '0')}`;
    
    // Session focus areas
    const focusAreas = [
      'Strength', 'Cardio', 'Flexibility', 'Balance', 'Core', 'HIIT'
    ].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);
    
    sessions.push({
      id: `mock-${i}`,
      assigned_trainer_id: actualTrainerId,
      member_id: actualClientId,
      session_date: sessionDate.toISOString().split('T')[0],
      start_time: startTime,
      end_time: endTime,
      duration: duration,
      status: status as any,
      notes: status === 'canceled' ? 'Client had an emergency' : 
             status === 'no-show' ? 'Client did not attend' : 
             'Regular training session',
      session_focus_tags: focusAreas,
      session_outcomes: status === 'completed' ? 'Completed all planned exercises' : null,
      session_location: ['Main Gym', 'Studio A', 'Studio B', 'Outdoor Area'][Math.floor(Math.random() * 4)],
      session_type: ['One-on-one', 'Group', 'Assessment', 'Specialty'][Math.floor(Math.random() * 4)],
      created_at: sessionDate.toISOString(),
      updated_at: new Date().toISOString()
    });
  }
  
  return sessions;
};

export default generateMockSessions;
