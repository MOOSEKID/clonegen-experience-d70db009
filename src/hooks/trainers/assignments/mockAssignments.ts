
import { ClientAssignment } from './types';

export const generateMockAssignments = (trainerId?: string, clientId?: string): ClientAssignment[] => {
  const assignments: ClientAssignment[] = [];
  const defaultTrainerId = trainerId || 'default-trainer-id';
  const defaultClientId = clientId || 'default-client-id';
  
  const clientNames = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis', 'Michael Wilson'];
  
  // If specific client ID is provided, only generate for that client
  if (clientId) {
    const assignmentDate = new Date();
    assignmentDate.setMonth(assignmentDate.getMonth() - 2);
    
    assignments.push({
      id: `mock-specific-${defaultClientId}`,
      trainer_id: defaultTrainerId,
      client_id: defaultClientId,
      assignment_date: assignmentDate.toISOString().split('T')[0],
      status: 'active',
      created_at: assignmentDate.toISOString(),
      updated_at: assignmentDate.toISOString(),
      client_name: 'John Doe',
      trainer_name: 'Jane Smith'
    });
    
    return assignments;
  }
  
  // If specific trainer ID is provided, generate multiple clients
  if (trainerId) {
    // Generate 5 client assignments with different statuses
    for (let i = 0; i < 5; i++) {
      const clientId = `client-${i}`;
      const assignmentDate = new Date();
      
      // Some assignments started months ago, others more recently
      assignmentDate.setMonth(assignmentDate.getMonth() - (i % 3) - 1);
      
      // Vary the statuses
      let status: 'active' | 'paused' | 'ended';
      
      if (i < 3) {
        status = 'active';
      } else if (i === 3) {
        status = 'paused';
      } else {
        status = 'ended';
      }
      
      // For ended assignments, set an end date
      let endDate = undefined;
      if (status === 'ended') {
        endDate = new Date();
        endDate.setDate(endDate.getDate() - 15);
        endDate = endDate.toISOString().split('T')[0];
      }
      
      assignments.push({
        id: `mock-${i}`,
        trainer_id: defaultTrainerId,
        client_id: clientId,
        assignment_date: assignmentDate.toISOString().split('T')[0],
        end_date: endDate,
        status,
        notes: i === 1 ? 'Client requested specific focus on strength training' : undefined,
        created_at: assignmentDate.toISOString(),
        updated_at: assignmentDate.toISOString(),
        client_name: clientNames[i % clientNames.length],
        trainer_name: 'Jane Smith'
      });
    }
  }
  
  return assignments;
};
