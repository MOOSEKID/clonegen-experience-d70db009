
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cmsService, NavItem } from '@/services/cms/cmsService';

export const useNavItems = () => {
  const queryClient = useQueryClient();
  
  // Query for fetching all nav items
  const { 
    data: navItems, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['cms', 'navItems'],
    queryFn: cmsService.getNavItems
  });

  // Create nav item mutation
  const createNavItem = useMutation({
    mutationFn: (navItem: Omit<NavItem, 'id' | 'created_at' | 'updated_at'>) => 
      cmsService.createNavItem(navItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms', 'navItems'] });
    }
  });

  // Update nav item mutation
  const updateNavItem = useMutation({
    mutationFn: ({ id, navItem }: { id: string, navItem: Partial<Omit<NavItem, 'id' | 'created_at' | 'updated_at'>> }) => 
      cmsService.updateNavItem(id, navItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms', 'navItems'] });
    }
  });

  // Delete nav item mutation
  const deleteNavItem = useMutation({
    mutationFn: cmsService.deleteNavItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms', 'navItems'] });
    }
  });

  // Reorder nav items mutation
  const reorderNavItems = useMutation({
    mutationFn: (items: { id: string; order_index: number }[]) => 
      cmsService.reorderNavItems(items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms', 'navItems'] });
    }
  });

  return {
    navItems: navItems || [],
    isLoading,
    error,
    createNavItem: createNavItem.mutate,
    updateNavItem: updateNavItem.mutate,
    deleteNavItem: deleteNavItem.mutate,
    reorderNavItems: reorderNavItems.mutate,
    isPending: createNavItem.isPending || updateNavItem.isPending || deleteNavItem.isPending || reorderNavItems.isPending
  };
};
