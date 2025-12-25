'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { config } from '@/config';
import {
  fetchPNodes,
  fetchClusterStats,
  fetchNetworkHealth,
} from '@/services/api';
import type { PNodeFilters, PNodeSortOptions } from '@/types';

// Query Keys for cache management
export const queryKeys = {
  pnodes: (filters?: PNodeFilters, sort?: PNodeSortOptions, page?: number) => 
    ['pnodes', filters, sort, page] as const,
  pnode: (pubkey: string) => ['pnode', pubkey] as const,
  clusterStats: ['clusterStats'] as const,
  epochInfo: ['epochInfo'] as const,
  networkHealth: ['networkHealth'] as const,
  chartData: ['chartData'] as const,
};

/**
 * Hook to fetch paginated pNodes list
 */
export function usePNodes(
  filters?: PNodeFilters,
  sort?: PNodeSortOptions,
  page: number = 1,
  pageSize: number = config.pagination.defaultPageSize
) {
  return useQuery({
    queryKey: queryKeys.pnodes(filters, sort, page),
    queryFn: () => fetchPNodes(filters, sort, page, pageSize),
    staleTime: config.cache.staleTime,
    gcTime: config.cache.gcTime,
    refetchInterval: config.refreshIntervals.pnodeList,
  });
}

/**
 * Hook to fetch cluster statistics
 */
export function useClusterStats() {
  return useQuery({
    queryKey: queryKeys.clusterStats,
    queryFn: fetchClusterStats,
    staleTime: config.cache.staleTime,
    gcTime: config.cache.gcTime,
    refetchInterval: config.refreshIntervals.clusterStats,
  });
}

/**
 * Hook to fetch network health
 */
export function useNetworkHealth() {
  return useQuery({
    queryKey: queryKeys.networkHealth,
    queryFn: fetchNetworkHealth,
    staleTime: config.cache.staleTime,
    gcTime: config.cache.gcTime,
    refetchInterval: config.refreshIntervals.networkHealth,
  });
}

/**
 * Hook to refresh all data manually
 */
export function useRefreshAll() {
  const queryClient = useQueryClient();
  
  return () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.clusterStats });
    queryClient.invalidateQueries({ queryKey: queryKeys.epochInfo });
    queryClient.invalidateQueries({ queryKey: queryKeys.networkHealth });
    queryClient.invalidateQueries({ queryKey: ['pnodes'] });
  };
}