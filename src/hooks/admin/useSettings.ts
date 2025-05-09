
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export enum SaveState {
  Idle = 'idle',
  Saving = 'saving',
  Saved = 'saved',
  Error = 'error'
}

type SettingsHookProps<T> = {
  tableName: string;
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
}

export function useSettings<T extends Record<string, any>>({
  tableName,
  initialData,
  onSuccess,
  onError
}: SettingsHookProps<T>) {
  const [data, setData] = useState<T | undefined>(initialData);
  const [saveState, setSaveState] = useState<SaveState>(SaveState.Idle);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Most settings tables will have a single row
      const { data: fetchedData, error: fetchError } = await supabase
        .from(tableName)
        .select('*')
        .limit(1)
        .single();

      if (fetchError) {
        console.error(`Error fetching ${tableName}:`, fetchError);
        setError(new Error(fetchError.message));
        return;
      }

      setData(fetchedData as unknown as T);
    } catch (err: any) {
      console.error(`Error in fetchData for ${tableName}:`, err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tableName]);

  const updateSettings = async (newData: Partial<T>) => {
    if (!data?.id) {
      setError(new Error('Cannot update: No record ID found'));
      return;
    }
    
    setSaveState(SaveState.Saving);
    
    try {
      const { error: updateError } = await supabase
        .from(tableName)
        .update({ 
          ...newData, 
          updated_at: new Date().toISOString() 
        } as any)
        .eq('id', data.id);

      if (updateError) {
        console.error(`Error updating ${tableName}:`, updateError);
        setSaveState(SaveState.Error);
        setError(new Error(updateError.message));
        toast.error(`Failed to save ${tableName.replace('settings_', '')} settings`);
        if (onError) onError(updateError);
        return;
      }

      // Update local state with the new values
      setData(prev => prev ? { ...prev, ...newData } as unknown as T : undefined);
      setSaveState(SaveState.Saved);
      
      if (onSuccess && data) {
        onSuccess({ ...data, ...newData } as T);
      }
      
      // Reset state after a delay
      setTimeout(() => {
        setSaveState(SaveState.Idle);
      }, 2000);
      
    } catch (err: any) {
      console.error(`Error in updateSettings for ${tableName}:`, err);
      setSaveState(SaveState.Error);
      setError(err);
      toast.error(`Failed to save settings: ${err.message}`);
      if (onError) onError(err);
    }
  };

  return {
    data,
    loading,
    error,
    saveState,
    updateSettings,
    refresh: fetchData
  };
}
