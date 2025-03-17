
import { ClientSession } from './types';

export const generateMockSessions = (trainerId?: string, clientId?: string): ClientSession[] => {
  const sessions: ClientSession[] = [];
  const defaultTrainerId = trainerId || 'default-trainer-id';
  const defaultClientId = clientId || 'default-client-id';
  
  const sessionTypes = ['Strength', 'Cardio', 'Flexibility', 'Balance', 'Full Body'];
  const locations = ['Main Gym', 'Studio 1', 'Pool Area', 'Outdoor Track'];
  const statuses: ('scheduled' | 'completed' | 'canceled' | 'no-show')[] = 
    ['scheduled', 'scheduled', 'completed', 'completed', 'completed', 'canceled', 'no-show'];
  
  // Generate sessions for the next 7 days and past 7 days
  for (let i = -7; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    // Skip some days randomly
    if (Math.random() > 0.7 && i !== 0) continue;
    
    const sessionDate = date.toISOString().split('T')[0];
    
    // Create 1-2 sessions per day
    const numSessions = Math.floor(Math.random() * 2) + 1;
    
    for (let j = 0; j < numSessions; j++) {
      // For past sessions, use completed or canceled or no-show
      // For future sessions, use scheduled
      let status: 'scheduled' | 'completed' | 'canceled' | 'no-show' = 'scheduled';
      
      if (i < 0) {
        // Past sessions
        status = statuses[Math.floor(Math.random() * statuses.length)];
      }
      
      // Start times: 7am, 9am, 11am, 2pm, 4pm, 6pm
      const startHours = [7, 9, 11, 14, 16, 18];
      const startHour = startHours[Math.floor(Math.random() * startHours.length)];
      
      // Random duration between 30 and 90 minutes, in 15 min increments
      const durationOptions = [30, 45, 60, 75, 90];
      const duration = durationOptions[Math.floor(Math.random() * durationOptions.length)];
      
      // Calculate end time
      const endHour = Math.floor(startHour + duration / 60);
      const endMinute = (startHour + duration / 60) % 1 * 60;
      
      const formatTime = (hour: number, minute: number) => 
        `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      
      const startTime = formatTime(startHour, 0);
      const endTime = formatTime(endHour, endMinute);
      
      const sessionType = sessionTypes[Math.floor(Math.random() * sessionTypes.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];
      
      // Generate focus areas
      const allFocusAreas = ['Upper Body', 'Lower Body', 'Core', 'Cardio', 'Flexibility', 'Balance'];
      const numFocusAreas = Math.floor(Math.random() * 3) + 1;
      const focusAreas = Array(numFocusAreas).fill(0).map(() => 
        allFocusAreas[Math.floor(Math.random() * allFocusAreas.length)]
      );
      
      // Create a unique session ID
      const id = `mock-${i}-${j}-${Date.now()}`;
      
      sessions.push({
        id,
        trainer_id: defaultTrainerId,
        client_id: defaultClientId,
        session_date: sessionDate,
        start_time: startTime,
        end_time: endTime,
        duration,
        session_type: sessionType,
        location,
        status,
        notes: status === 'completed' ? 'Client showed good progress' : 
              status === 'canceled' ? 'Client had a scheduling conflict' : 
              status === 'no-show' ? 'Client did not attend or notify' : 
              'Regular training session',
        focus_areas: focusAreas,
        achievements: status === 'completed' ? 'Increased weight on bench press by 5lbs' : undefined,
        created_at: new Date(Date.now() - (i < 0 ? Math.abs(i) : 0) * 86400000).toISOString(),
        updated_at: new Date(Date.now() - (i < 0 ? Math.abs(i) : 0) * 86400000).toISOString(),
        client_name: 'John Doe',
        trainer_name: 'Jane Smith'
      });
    }
  }
  
  // Sort by date and time
  return sessions.sort((a, b) => {
    const dateCompare = a.session_date.localeCompare(b.session_date);
    if (dateCompare !== 0) return dateCompare;
    return a.start_time.localeCompare(b.start_time);
  });
};
