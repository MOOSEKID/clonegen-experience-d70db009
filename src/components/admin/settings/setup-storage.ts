
import { supabase } from '@/integrations/supabase/client';

export const setupStorageBucket = async () => {
  try {
    const { data: existingBuckets } = await supabase.storage.listBuckets();
    if (!existingBuckets?.find(bucket => bucket.name === 'settings')) {
      await supabase.storage.createBucket('settings', {
        public: true,
        fileSizeLimit: 10485760, // 10MB
      });
    }
    return { success: true };
  } catch (error) {
    console.error('Error setting up storage bucket:', error);
    return { success: false, error };
  }
};
