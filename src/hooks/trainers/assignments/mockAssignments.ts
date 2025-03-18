
import { ClientAssignment } from './types';

export const generateMockAssignments = (
  trainerId?: string, 
  clientId?: string
): ClientAssignment[] => {
  const defaultTrainerId = trainerId || 'default-trainer-id';
  const mockAssignments: ClientAssignment[] = [];
  
  // Generate 5 mock assignments with different statuses
  const statuses: ('active' | 'paused' | 'ended')[] = ['active', 'active', 'active', 'paused', 'ended'];
  
  for (let i = 0; i < 5; i++) {
    const assignmentDate = new Date();
    assignmentDate.setMonth(assignmentDate.getMonth() - i);
    
    mockAssignments.push({
      id: `mock-${i}`,
      trainer_id: defaultTrainerId,
      client_id: clientId || `client-${i}`,
      assignment_date: assignmentDate.toISOString(),
      status: statuses[i],
      created_at: assignmentDate.toISOString(),
      updated_at: new Date().toISOString(),
      client_name: `Client ${i + 1}`,
      trainer_name: "Trainer Name"
    });
  }
  
  return mockAssignments;
};
