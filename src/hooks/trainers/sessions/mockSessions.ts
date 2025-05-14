import { ClientSession } from './types';

type GenerateMockOptions = {
  assignedTrainerId?: string;
  memberId?: string;
  futureSessions?: boolean;
  count?: number;
};

const generateMockSessions = (options: GenerateMockOptions = {}): ClientSession[] => {
  const {
    assignedTrainerId = 'trainer-test-001',
    memberId = 'member-test-123',
    futureSessions = false,
    count = Math.floor(Math.random() * 6) + 5, // 5–10 sessions
  } = options;

  const mockStatuses: ClientSession['status'][] = ['scheduled', 'completed', 'canceled', 'no-show'];

  const sessions: ClientSession[] = [];

  for (let i = 0; i < count; i++) {
    const status = futureSessions ? 'scheduled' : mockStatuses[Math.floor(Math.random() * mockStatuses.length)];

    const offsetDays = Math.floor(Math.random() * 30);
    const sessionDate = new Date();
    sessionDate.setDate(sessionDate.getDate() + (futureSessions ? offsetDays : -offsetDays));

    const hour = Math.floor(Math.random() * 12) + 8;
    const minutes = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
    const startTime = `${String(hour).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    const duration = [30, 45, 60, 90][Math.floor(Math.random() * 4)];
    const endTimeDate = new Date(sessionDate);
    endTimeDate.setHours(hour, minutes + duration);
    const endTime = `${String(endTimeDate.getHours()).padStart(2, '0')}:${String(endTimeDate.getMinutes()).padStart(2, '0')}`;

    const focusAreas = ['Strength', 'Cardio', 'Balance', 'Core', 'Flexibility']
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1);

    sessions.push({
      id: `mock-${i}`,
      assigned_trainer_id: assignedTrainerId,
      member_id: memberId,
      session_date: sessionDate.toISOString().split('T')[0],
      start_time: startTime,
      end_time: endTime,
      duration: duration,
      status: status,
      notes:
        status === 'canceled'
          ? 'Client had an emergency'
          : status === 'no-show'
          ? 'Client did not attend'
          : 'Regular training session',
      focus_areas: focusAreas,
      achievements: status === 'completed' ? 'Completed all planned exercises' : null,
      created_at: sessionDate.toISOString(),
      updated_at: new Date().toISOString(),
    });
  }

  return sessions;
};

export default generateMockSessions;