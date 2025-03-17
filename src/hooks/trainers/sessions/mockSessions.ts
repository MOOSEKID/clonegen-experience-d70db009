
import { ClientSession } from './types';

export const generateMockSessions = (trainerId?: string, clientId?: string): ClientSession[] => {
  const mockSessions: ClientSession[] = [];
  
  const mockTrainers = [
    { id: trainerId || 'trainer-1', name: 'John Doe' },
    { id: 'trainer-2', name: 'Jane Smith' },
    { id: 'trainer-3', name: 'Mike Johnson' }
  ];
  
  const mockClients = [
    { id: clientId || 'client-1', name: 'Sarah Parker' },
    { id: 'client-2', name: 'James Wilson' },
    { id: 'client-3', name: 'Emily Davis' },
    { id: 'client-4', name: 'Robert Brown' },
    { id: 'client-5', name: 'Lisa Miller' }
  ];
  
  const sessionTypes = ['Strength', 'Cardio', 'Flexibility', 'Full Body', 'HIIT'];
  const locations = ['Main Gym Floor', 'Functional Training Zone', 'Olympic Lifting Area', 'Studio 1', 'Studio 2'];
  
  // Generate schedules for next 7 days
  for (let i = -3; i < 10; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dateString = date.toISOString().split('T')[0];
    
    // Past sessions (completed, canceled or no-show)
    if (i < 0) {
      const sessionStatus = i === -1 ? 'completed' : (i === -2 ? 'canceled' : 'no-show');
      
      // Determine which client and trainer to use
      let useTrainer = mockTrainers[0];
      let useClient = mockClients[0];
      
      if (trainerId) {
        useTrainer = mockTrainers.find(t => t.id === trainerId) || mockTrainers[0];
      } else {
        useTrainer = mockTrainers[Math.abs(i) % mockTrainers.length];
      }
      
      if (clientId) {
        useClient = mockClients.find(c => c.id === clientId) || mockClients[0];
      } else {
        useClient = mockClients[Math.abs(i) % mockClients.length];
      }
      
      // Create past session
      mockSessions.push({
        id: `session-past-${Math.abs(i)}`,
        trainer_id: useTrainer.id,
        client_id: useClient.id,
        session_date: dateString,
        start_time: '09:00:00',
        end_time: '10:00:00',
        duration: 60,
        session_type: sessionTypes[Math.abs(i) % sessionTypes.length],
        location: locations[Math.abs(i) % locations.length],
        status: sessionStatus as 'scheduled' | 'completed' | 'canceled' | 'no-show',
        notes: sessionStatus === 'completed' ? 'Great session!' : 
               sessionStatus === 'canceled' ? 'Client canceled 2 hours before' : 
               'Client did not show up',
        achievements: sessionStatus === 'completed' ? 'Increased weight on squats by 10lbs' : undefined,
        focus_areas: ['Strength', 'Form'],
        created_at: new Date(date.getTime() - 86400000).toISOString(),
        updated_at: new Date(date.getTime() - 3600000).toISOString(),
        client_name: useClient.name,
        trainer_name: useTrainer.name
      });
    } 
    // Future sessions (scheduled)
    else {
      // For each day, create 1-3 sessions
      const numSessionsPerDay = (i <= 3) ? 2 : 1; // More sessions for the next 3 days
      
      for (let j = 0; j < numSessionsPerDay; j++) {
        // Determine which client and trainer to use
        let useTrainer = mockTrainers[0];
        let useClient = mockClients[0];
        
        if (trainerId) {
          useTrainer = mockTrainers.find(t => t.id === trainerId) || mockTrainers[0];
        } else {
          useTrainer = mockTrainers[(i + j) % mockTrainers.length];
        }
        
        if (clientId) {
          useClient = mockClients.find(c => c.id === clientId) || mockClients[0];
        } else {
          useClient = mockClients[(i + j) % mockClients.length];
        }
        
        // Create times - morning, afternoon, evening
        let startTime, endTime;
        if (j === 0) {
          startTime = '09:00:00';
          endTime = '10:00:00';
        } else if (j === 1) {
          startTime = '14:00:00';
          endTime = '15:00:00';
        } else {
          startTime = '18:00:00';
          endTime = '19:00:00';
        }
        
        mockSessions.push({
          id: `session-${i}-${j}`,
          trainer_id: useTrainer.id,
          client_id: useClient.id,
          session_date: dateString,
          start_time: startTime,
          end_time: endTime,
          duration: 60,
          session_type: sessionTypes[(i + j) % sessionTypes.length],
          location: locations[(i + j) % locations.length],
          status: 'scheduled',
          notes: i === 0 ? 'Focus on deadlift form' : undefined,
          focus_areas: ['Strength', 'Mobility'],
          created_at: new Date(date.getTime() - 86400000).toISOString(),
          updated_at: new Date(date.getTime() - 86400000).toISOString(),
          client_name: useClient.name,
          trainer_name: useTrainer.name
        });
      }
    }
  }
  
  return mockSessions;
};
