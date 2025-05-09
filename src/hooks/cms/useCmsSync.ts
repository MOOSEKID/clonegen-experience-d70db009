
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { routeService } from '@/services/cms/routeService';
import { toast } from 'sonner';

export const useCmsSync = () => {
  const queryClient = useQueryClient();
  
  const syncRoutes = useMutation({
    mutationFn: routeService.syncRoutes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms', 'pages'] });
      queryClient.invalidateQueries({ queryKey: ['cms', 'navigation'] });
      toast.success("Routes synchronized successfully");
    },
    onError: (error) => {
      console.error("Route sync error:", error);
      toast.error("Failed to sync routes. Please try the emergency tools.");
    }
  });

  const forceSync = useMutation({
    mutationFn: routeService.forceBootstrapCmsPages,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms', 'pages'] });
      queryClient.invalidateQueries({ queryKey: ['cms', 'navigation'] });
      toast.success("Routes forcefully restored");
      
      // Auto redirect to home page after successful force sync
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    },
    onError: (error) => {
      console.error("Force sync error:", error);
      toast.error("Force sync failed. Please contact support.");
    }
  });

  return {
    syncRoutes: syncRoutes.mutate,
    forceSync: forceSync.mutate,
    isSyncing: syncRoutes.isPending || forceSync.isPending,
    syncError: syncRoutes.error
  };
};
