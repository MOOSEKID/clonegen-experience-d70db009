
import { supabase } from '@/integrations/supabase/client';

export const deleteMember = async (id: string): Promise<boolean> => {
  try {
    console.log(`Deleting member with ID ${id}`);
    
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting member:', error);
      return false;
    }
    
    console.log('Member deleted successfully');
    return true;
  } catch (error) {
    console.error('Error in deleteMember:', error);
    return false;
  }
};
