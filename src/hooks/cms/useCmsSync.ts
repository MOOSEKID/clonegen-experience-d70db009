
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { routeService } from '@/services/cms/routeService';

export const useCmsSync = () => {
  const queryClient = useQueryClient();
  
  const syncRoutes = useMutation({
    mutationFn: routeService.syncRoutes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms', 'pages'] });
    }
  });

  return {
    syncRoutes: syncRoutes.mutate,
    isSyncing: syncRoutes.isPending,
    syncError: syncRoutes.error
  };
};
