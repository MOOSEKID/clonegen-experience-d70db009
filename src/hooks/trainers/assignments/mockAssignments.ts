
import { ClientAssignment } from './types';

export const generateMockAssignments = (trainerId?: string, clientId?: string): ClientAssignment[] => {
  const mockAssignments: ClientAssignment[] = [];
  
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
    { id: 'client-5', name: 'Lisa Miller' },
    { id: 'client-6', name: 'Michael Thompson' }
  ];
  
  // Generate mock data
  if (trainerId && !clientId) {
    // Assignments for a specific trainer
    const trainer = mockTrainers.find(t => t.id === trainerId) || mockTrainers[0];
    
    mockClients.forEach((client, index) => {
      const status = index < 4 ? 'active' : (index === 4 ? 'paused' : 'ended');
      const assignmentDate = new Date();
      assignmentDate.setMonth(assignmentDate.getMonth() - index);
      
      mockAssignments.push({
        id: `assignment-${trainer.id}-${client.id}`,
        trainer_id: trainer.id,
        client_id: client.id,
        assignment_date: assignmentDate.toISOString(),
        status: status as 'active' | 'paused' | 'ended',
        notes: index === 0 ? 'Regular sessions twice a week' : undefined,
        created_at: assignmentDate.toISOString(),
        updated_at: assignmentDate.toISOString(),
        client_name: client.name,
        trainer_name: trainer.name
      });
    });
  } else if (clientId && !trainerId) {
    // Assignments for a specific client
    const client = mockClients.find(c => c.id === clientId) || mockClients[0];
    
    mockTrainers.forEach((trainer, index) => {
      const status = index === 0 ? 'active' : (index === 1 ? 'paused' : 'ended');
      const assignmentDate = new Date();
      assignmentDate.setMonth(assignmentDate.getMonth() - index * 3);
      
      mockAssignments.push({
        id: `assignment-${trainer.id}-${client.id}`,
        trainer_id: trainer.id,
        client_id: client.id,
        assignment_date: assignmentDate.toISOString(),
        status: status as 'active' | 'paused' | 'ended',
        notes: index === 0 ? 'Focus on strength training' : undefined,
        created_at: assignmentDate.toISOString(),
        updated_at: assignmentDate.toISOString(),
        client_name: client.name,
        trainer_name: trainer.name
      });
    });
  } else if (trainerId && clientId) {
    // Specific trainer-client assignment
    const trainer = mockTrainers.find(t => t.id === trainerId) || mockTrainers[0];
    const client = mockClients.find(c => c.id === clientId) || mockClients[0];
    
    mockAssignments.push({
      id: `assignment-${trainer.id}-${client.id}`,
      trainer_id: trainer.id,
      client_id: client.id,
      assignment_date: new Date().toISOString(),
      status: 'active',
      notes: 'Customized fitness program',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      client_name: client.name,
      trainer_name: trainer.name
    });
  } else {
    // Generate random assignments if no specific trainer or client
    for (let i = 0; i < 10; i++) {
      const trainerId = i % 3;
      const clientId = i % 6;
      const status = i < 5 ? 'active' : (i < 8 ? 'paused' : 'ended');
      const assignmentDate = new Date();
      assignmentDate.setMonth(assignmentDate.getMonth() - i);
      
      mockAssignments.push({
        id: `assignment-${i}`,
        trainer_id: mockTrainers[trainerId].id,
        client_id: mockClients[clientId].id,
        assignment_date: assignmentDate.toISOString(),
        status: status as 'active' | 'paused' | 'ended',
        notes: i === 0 ? 'Regular sessions' : undefined,
        created_at: assignmentDate.toISOString(),
        updated_at: assignmentDate.toISOString(),
        client_name: mockClients[clientId].name,
        trainer_name: mockTrainers[trainerId].name
      });
    }
  }
  
  return mockAssignments;
};
