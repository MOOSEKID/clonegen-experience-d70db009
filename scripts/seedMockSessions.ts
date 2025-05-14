// scripts/seedMockSessions.ts

import { supabase } from '@/integrations/supabase/client';
import generateMockSessions from '@/hooks/trainers/sessions/mockSessions';

const seedMockSessions = async () => {
  const mockData = generateMockSessions({
    assignedTrainerId: 'trainer-001',
    memberId: 'member-001',
    futureSessions: true,
    count: 10,
  });

  const { data, error } = await supabase
    .from('client_sessions')
    .insert(mockData);

  if (error) {
    console.error('❌ Error seeding mock sessions:', error);
  } else {
    console.log(`✅ Inserted ${data.length} mock sessions successfully.`);
  }
};

seedMockSessions();