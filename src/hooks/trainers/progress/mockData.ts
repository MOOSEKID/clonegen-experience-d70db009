
import { ClientProgressRecord } from './types';

export const generateMockProgress = (clientId?: string, trainerId?: string): ClientProgressRecord[] => {
  const mockRecords: ClientProgressRecord[] = [];
  const defaultClientId = clientId || 'default-client-id';
  const defaultTrainerId = trainerId || 'default-trainer-id';
  
  // Generate records for the past 3 months (monthly records)
  for (let i = 0; i < 3; i++) {
    const recordDate = new Date();
    recordDate.setMonth(recordDate.getMonth() - i);
    
    // Start with baseline measurements and adjust based on month
    const weight = 180 - i * 2; // Losing weight over time
    const bodyFat = 20 - i * 0.5; // Decreasing body fat
    
    mockRecords.push({
      id: `mock-${i}`,
      client_id: defaultClientId,
      trainer_id: defaultTrainerId,
      date: recordDate.toISOString().split('T')[0],
      weight,
      body_fat_percentage: bodyFat,
      chest_measurement: 42 + i * 0.2, // Increasing chest
      waist_measurement: 34 - i * 0.3, // Decreasing waist
      hip_measurement: 40,
      arm_measurement: 14 + i * 0.1, // Increasing arms
      thigh_measurement: 22 + i * 0.1, // Increasing thighs
      notes: i === 0 ? "Great progress this month" : undefined,
      created_at: recordDate.toISOString(),
      updated_at: recordDate.toISOString(),
      client_name: "John Doe"
    });
  }
  
  return mockRecords;
};
