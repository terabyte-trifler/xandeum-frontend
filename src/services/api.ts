import { config } from "@/config";
import type { PNode, PNodeFilters, PNodeSortOptions } from "@/types/pnode";

/**
 * JSON-RPC request helper for pRPC calls
 */
export async function prpcRequest<T>(
  method: string,
  params?: unknown[]
): Promise<T> {
  const response = await fetch(config.api.prpcUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method,
      params: params || [],
    }),
  });

  if (!response.ok) {
    throw new Error(`pRPC request failed: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message || "pRPC error");
  }

  return data.result;
}

/**
 * Apply filters to pNode list
 */
export function applyFilters(pnodes: PNode[], filters?: PNodeFilters): PNode[] {
  if (!filters) return pnodes;

  return pnodes.filter((node) => {
    // Status filter
    if (filters.status?.length && !filters.status.includes(node.status)) {
      return false;
    }

    // Minimum uptime filter
    if (
      filters.minUptime !== undefined &&
      node.performance.uptimePercentage < filters.minUptime
    ) {
      return false;
    }

    // Search filter (pubkey, name, location)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesPubkey = node.identity.pubkey
        .toLowerCase()
        .includes(searchLower);
      const matchesName = node.metadata.name
        ?.toLowerCase()
        .includes(searchLower);
      const matchesCity = node.geo?.city.toLowerCase().includes(searchLower);

      if (!matchesPubkey && !matchesName && !matchesCity) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Apply sorting to pNode list
 */
export function applySort(pnodes: PNode[], sort?: PNodeSortOptions): PNode[] {
  if (!sort) return pnodes;

  const sorted = [...pnodes];
  const multiplier = sort.order === "asc" ? 1 : -1;

  sorted.sort((a, b) => {
    let comparison = 0;
    switch (sort.field) {
      case "status":
        const statusOrder: Record<string, number> = {
          online: 0,
          syncing: 1,
          degraded: 2,
          offline: 3,
          unknown: 4,
        };
        comparison = statusOrder[a.status] - statusOrder[b.status];
        break;
      case "uptime":
        comparison =
          a.performance.uptimePercentage - b.performance.uptimePercentage;
        break;
      case "stake":
        comparison =
          a.staking.stakedXand +
          a.staking.delegatedXand -
          (b.staking.stakedXand + b.staking.delegatedXand);
        break;
      // ... more cases
    }
    return comparison * multiplier;
  });

  return sorted;
}

import type { ClusterStats, PaginatedResponse } from "@/types/pnode";

/**
 * Fetch paginated pNodes list
 */
export async function fetchPNodes(
  filters?: PNodeFilters,
  sort?: PNodeSortOptions,
  page: number = 1,
  pageSize: number = 20
): Promise<PaginatedResponse<PNode>> {
  // In production, this would call the pRPC endpoint
  // For now, return mock data structure
  const allNodes = await prpcRequest<PNode[]>("getPNodes");

  let filtered = applyFilters(allNodes, filters);
  filtered = applySort(filtered, sort);

  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return {
    items,
    total: filtered.length,
    page,
    pageSize,
    hasMore: start + pageSize < filtered.length,
  };
}

/**
 * Fetch cluster statistics
 */
export async function fetchClusterStats(): Promise<ClusterStats> {
  return prpcRequest<ClusterStats>("getClusterStats");
}

/**
 * Network health response type
 */
export interface NetworkHealth {
  status: "healthy" | "degraded" | "unhealthy";
  latency: number;
  blockHeight: number;
  peerCount: number;
}

/**
 * Fetch network health
 */
export async function fetchNetworkHealth(): Promise<NetworkHealth> {
  return prpcRequest<NetworkHealth>("getNetworkHealth");
}
