
import { ClientSession } from './types';

export const generateMockSessions = (trainerId?: string, clientId?: string): ClientSession[] => {
  const mockSessions: ClientSession[] = [];
  const now = new Date();
  
  // Generate sessions for the past and future
  for (let i = -5; i < 10; i++) {
    const sessionDate = new Date();
    sessionDate.setDate(now.getDate() + i);
    
    let status: 'scheduled' | 'completed' | 'canceled' | 'no-show';
    
    if (i < 0) {
      // Past sessions
      const random = Math.random();
      if (random < 0.7) {
        status = 'completed';
      } else if (random < 0.85) {
        status = 'canceled';
      } else {
        status = 'no-show';
      }
    } else {
      // Future sessions
      status = 'scheduled';
    }
    
    const defaultTrainerId = trainerId || 'default-trainer-id';
    const defaultClientId = clientId || 'default-client-id';
    
    mockSessions.push({
      id: `mock-${i + 5}`,
      trainer_id: defaultTrainerId,
      client_id: defaultClientId,
      session_date: sessionDate.toISOString(),
      duration: 60,
      status,
      notes: status === 'completed' ? "Great progress today" : null,
      focus_areas: ["Strength", "Core"],
      achievements: status === 'completed' ? "Increased squat weight by 10lbs" : null,
      created_at: new Date(sessionDate.getTime() - 1000 * 60 * 60 * 24).toISOString(),
      updated_at: new Date().toISOString(),
      client_name: "John Doe",
      trainer_name: "Trainer Name"
    });
  }
  
  return mockSessions;
};
