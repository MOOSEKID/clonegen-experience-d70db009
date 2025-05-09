
import { supabase } from '@/integrations/supabase/client';

export const setupStorageBucket = async () => {
  try {
    // Check if settings bucket exists
    const { data: existingBuckets } = await supabase.storage.listBuckets();
    
    if (!existingBuckets?.find(bucket => bucket.name === 'settings')) {
      // Create settings bucket if it doesn't exist
      await supabase.storage.createBucket('settings', {
        public: true,
        fileSizeLimit: 10485760, // 10MB
      });
    }
  } catch (error) {
    console.error('Error setting up storage bucket:', error);
  }
};
