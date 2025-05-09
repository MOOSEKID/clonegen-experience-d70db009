
import { useState, useEffect } from 'react';
import { cmsService, CmsPage } from '@/services/cms/cmsService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useCmsPages = () => {
  const queryClient = useQueryClient();
  
  // Query for fetching all pages
  const { 
    data: pages, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['cms', 'pages'],
    queryFn: cmsService.getPages
  });

  // Create page mutation
  const createPage = useMutation({
    mutationFn: (page: Omit<CmsPage, 'id' | 'created_at' | 'updated_at'>) => 
      cmsService.createPage(page),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms', 'pages'] });
    }
  });

  // Update page mutation
  const updatePage = useMutation({
    mutationFn: ({ id, page }: { id: string, page: Partial<Omit<CmsPage, 'id' | 'created_at' | 'updated_at'>> }) => 
      cmsService.updatePage(id, page),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms', 'pages'] });
    }
  });

  // Delete page mutation
  const deletePage = useMutation({
    mutationFn: cmsService.deletePage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms', 'pages'] });
    }
  });

  return {
    pages: pages || [],
    isLoading,
    error,
    createPage: createPage.mutate,
    updatePage: updatePage.mutate,
    deletePage: deletePage.mutate,
    isPending: createPage.isPending || updatePage.isPending || deletePage.isPending
  };
};
