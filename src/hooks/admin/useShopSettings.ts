
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export type ShopSettingsData = {
  id: string;
  enable_ecommerce: boolean;
  enable_pos: boolean;
  enable_guest_checkout: boolean;
  show_member_discounts: boolean;
  default_currency: string;
  enable_stripe: boolean;
  enable_mtn: boolean;
  enable_member_tab: boolean;
  credit_limit: number;
  enable_inventory: boolean;
  low_stock_threshold: number;
  email_low_stock: boolean;
  hide_out_of_stock: boolean;
  created_at?: string;
  updated_at?: string;
};

export type ShopSettingsUpdateData = Partial<Omit<ShopSettingsData, 'id' | 'created_at' | 'updated_at'>>;

export enum SaveState {
  Idle = 'idle',
  Saving = 'saving',
  Saved = 'saved',
  Error = 'error'
}

export const useShopSettings = () => {
  const [settings, setSettings] = useState<ShopSettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>(SaveState.Idle);
  const [error, setError] = useState<Error | null>(null);

  // Fetch shop settings from Supabase
  const fetchSettings = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await supabase
        .from('shop_settings')
        .select('*')
        .limit(1)
        .single();

      if (fetchError) {
        console.error('Error fetching shop settings:', fetchError);
        setError(new Error(fetchError.message));
        return;
      }
      
      setSettings(data);
    } catch (err: any) {
      console.error('Unexpected error fetching shop settings:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Update shop settings in Supabase
  const updateSettings = async (updatedSettings: ShopSettingsUpdateData) => {
    setSaveState(SaveState.Saving);
    
    try {
      if (!settings?.id) {
        setError(new Error('No settings record found to update.'));
        setSaveState(SaveState.Error);
        return;
      }
      
      const { error: updateError } = await supabase
        .from('shop_settings')
        .update(updatedSettings)
        .eq('id', settings.id);

      if (updateError) {
        console.error('Error updating shop settings:', updateError);
        setSaveState(SaveState.Error);
        setError(new Error(updateError.message));
        toast.error('Failed to save shop settings');
        return;
      }

      // Update local state with the new values
      setSettings(prev => prev ? { ...prev, ...updatedSettings } : null);
      setSaveState(SaveState.Saved);
      toast.success('Shop settings saved successfully');
      
      // Reset save state after a delay
      setTimeout(() => {
        setSaveState(SaveState.Idle);
      }, 2000);
      
    } catch (err: any) {
      console.error('Error in updateSettings:', err);
      setSaveState(SaveState.Error);
      setError(err);
      toast.error('Failed to save shop settings');
    }
  };
  
  // Load settings on component mount
  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    error,
    saveState,
    updateSettings,
    refresh: fetchSettings
  };
};
