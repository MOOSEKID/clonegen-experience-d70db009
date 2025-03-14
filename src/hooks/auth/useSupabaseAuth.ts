
import { useAuthState } from './useAuthState';
import { useAuthActions } from './useAuthActions';

export const useSupabaseAuth = () => {
  const authState = useAuthState();
  const authActions = useAuthActions();

  return {
    ...authState,
    ...authActions,
    // Override isLoading to account for both state and actions
    isLoading: authState.isLoading || authActions.isLoading
  };
};
