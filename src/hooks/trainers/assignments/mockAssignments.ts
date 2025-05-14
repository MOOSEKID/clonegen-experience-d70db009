
import { ClientAssignment } from './types';

export const generateMockAssignments = (trainerId?: string, clientId?: string): ClientAssignment[] => {
  const mockTrainerIds = ['1', '2', '3'];
  const mockClientIds = ['101', '102', '103', '104', '105'];
  const mockStatuses = ['active', 'paused', 'ended'];
  
  // Generate 5-10 mock assignments
  const count = Math.floor(Math.random() * 6) + 5;
  const assignments: ClientAssignment[] = [];
  
  for (let i = 0; i < count; i++) {
    // Use provided IDs or random ones
    const actualTrainerId = trainerId || mockTrainerIds[Math.floor(Math.random() * mockTrainerIds.length)];
    const actualClientId = clientId || mockClientIds[Math.floor(Math.random() * mockClientIds.length)];
    const status = mockStatuses[Math.floor(Math.random() * mockStatuses.length)];
    
    // Create date string for a random date in the past year
    const daysAgo = Math.floor(Math.random() * 365);
    const assignmentDate = new Date();
    assignmentDate.setDate(assignmentDate.getDate() - daysAgo);
    
    let endDate = null;
    if (status === 'ended') {
      const endDateObj = new Date(assignmentDate);
      endDateObj.setDate(endDateObj.getDate() + Math.floor(Math.random() * 60) + 30); // 30-90 days later
      endDate = endDateObj.toISOString().split('T')[0];
    }
    
    assignments.push({
      id: `mock-${i}`,
      staff_id: actualTrainerId,
      client_id: actualClientId,
      assignment_date: assignmentDate.toISOString().split('T')[0],
      end_date: endDate,
      status,
      notes: status === 'ended' ? 'Client completed their program' : 
             status === 'paused' ? 'Client on temporary pause' : 
             'Regular training sessions',
      createdAt: assignmentDate.toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  return assignments;
};

export default generateMockAssignments;
