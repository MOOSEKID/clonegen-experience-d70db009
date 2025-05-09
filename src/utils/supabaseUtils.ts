
import { supabase } from '@/integrations/supabase/client';

/**
 * Creates a basic RPC function that can be used to increment the 'uses_count'
 * field in promo_codes. Since we can't directly use the RPC function that doesn't
 * exist yet, we'll simulate it with a direct update.
 */
export const incrementPromoCodeUses = async (codeId: string) => {
  // Get current count
  const { data } = await supabase
    .from('promo_codes')
    .select('uses_count')
    .eq('id', codeId)
    .single();
    
  const currentCount = data?.uses_count || 0;
  
  // Increment count
  await supabase
    .from('promo_codes')
    .update({ uses_count: currentCount + 1 })
    .eq('id', codeId);
};
