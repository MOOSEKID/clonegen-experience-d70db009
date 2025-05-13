
import { ClientSession } from '../types';

export const generateMockSessions = (trainerId?: string, clientId?: string): ClientSession[] => {
  const mockTrainerIds = ['1', '2', '3'];
  const mockClientIds = ['101', '102', '103', '104', '105'];
  const mockSessionTypes = ['Assessment', 'Strength', 'Cardio', 'Flexibility', 'Recovery'];
  const mockLocations = ['Main Gym', 'Pool Area', 'Studio 1', 'Outdoor Track', 'Private Room'];
  const mockStatuses = ['scheduled', 'completed', 'cancelled', 'no-show'];
  
  // Generate 5-15 mock sessions
  const count = Math.floor(Math.random() * 11) + 5;
  const sessions: ClientSession[] = [];
  
  for (let i = 0; i < count; i++) {
    // Use provided IDs or random ones
    const actualTrainerId = trainerId || mockTrainerIds[Math.floor(Math.random() * mockTrainerIds.length)];
    const actualClientId = clientId || mockClientIds[Math.floor(Math.random() * mockClientIds.length)];
    
    // Create date string for a random date within +/- 30 days from now
    const daysDiff = Math.floor(Math.random() * 61) - 30; // -30 to +30 days
    const sessionDate = new Date();
    sessionDate.setDate(sessionDate.getDate() + daysDiff);
    
    // Create a random time between 6AM and 8PM
    const hour = Math.floor(Math.random() * 14) + 6; // 6AM to 8PM
    const minute = [0, 15, 30, 45][Math.floor(Math.random() * 4)]; // 0, 15, 30, or 45 minutes
    
    const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    
    // Session duration 30-90 minutes
    const duration = [30, 45, 60, 90][Math.floor(Math.random() * 4)];
    
    // Calculate end time
    const endHour = hour + Math.floor((minute + duration) / 60);
    const endMinute = (minute + duration) % 60;
    const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
    
    const focusAreas = [];
    const possibleAreas = ['Core', 'Upper Body', 'Lower Body', 'Cardio', 'Balance', 'Flexibility'];
    const numAreas = Math.floor(Math.random() * 3) + 1; // 1-3 focus areas
    
    for (let j = 0; j < numAreas; j++) {
      const randomArea = possibleAreas[Math.floor(Math.random() * possibleAreas.length)];
      if (!focusAreas.includes(randomArea)) {
        focusAreas.push(randomArea);
      }
    }
    
    const status = daysDiff < 0 ? 
      (Math.random() > 0.2 ? 'completed' : ['cancelled', 'no-show'][Math.floor(Math.random() * 2)]) : 
      'scheduled';
    
    sessions.push({
      id: `mock-${i}`,
      trainer_id: actualTrainerId,
      client_id: actualClientId,
      session_date: sessionDate.toISOString().split('T')[0],
      start_time: startTime,
      end_time: endTime,
      duration,
      session_type: mockSessionTypes[Math.floor(Math.random() * mockSessionTypes.length)],
      location: mockLocations[Math.floor(Math.random() * mockLocations.length)],
      status,
      notes: status === 'completed' ? 'Session completed successfully' : 
             status === 'cancelled' ? 'Client had to reschedule' :
             status === 'no-show' ? 'Client did not attend' : 
             'Regular training session',
      focus_areas: focusAreas,
      achievements: status === 'completed' ? 'Improved form and increased weights' : undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }
  
  return sessions;
};

export default generateMockSessions;
