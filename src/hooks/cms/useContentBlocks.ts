
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cmsService, ContentBlock } from '@/services/cms/cmsService';

export const useContentBlocks = (pageId: string) => {
  const queryClient = useQueryClient();
  
  // Query for fetching content blocks for a page
  const { 
    data: contentBlocks, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['cms', 'contentBlocks', pageId],
    queryFn: () => cmsService.getContentBlocks(pageId),
    enabled: !!pageId
  });

  // Create content block mutation
  const createContentBlock = useMutation({
    mutationFn: (block: Omit<ContentBlock, 'id' | 'createdAt' | 'updatedAt'>) => 
      cmsService.createContentBlock(block),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms', 'contentBlocks', pageId] });
    }
  });

  // Update content block mutation
  const updateContentBlock = useMutation({
    mutationFn: ({ id, block }: { id: string, block: Partial<Omit<ContentBlock, 'id' | 'createdAt' | 'updatedAt'>> }) => 
      cmsService.updateContentBlock(id, block),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms', 'contentBlocks', pageId] });
    }
  });

  // Delete content block mutation
  const deleteContentBlock = useMutation({
    mutationFn: cmsService.deleteContentBlock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms', 'contentBlocks', pageId] });
    }
  });

  // Reorder content blocks mutation
  const reorderContentBlocks = useMutation({
    mutationFn: (items: { id: string; order_index: number }[]) => 
      cmsService.reorderContentBlocks(items),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms', 'contentBlocks', pageId] });
    }
  });

  return {
    contentBlocks: contentBlocks || [],
    isLoading,
    error,
    createContentBlock: createContentBlock.mutate,
    updateContentBlock: updateContentBlock.mutate,
    deleteContentBlock: deleteContentBlock.mutate,
    reorderContentBlocks: reorderContentBlocks.mutate,
    isPending: createContentBlock.isPending || updateContentBlock.isPending || deleteContentBlock.isPending || reorderContentBlocks.isPending
  };
};
