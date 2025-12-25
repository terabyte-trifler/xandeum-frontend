/**
 * Xandeum pNode Types
 * 
 * These types define the structure of pNode data retrieved via pRPC.
 * Based on the Herrenberg gossip protocol and pNode RPC interface.
 */

// Base node identification
export interface PNodeIdentity {
  pubkey: string;              // Base58 encoded public key
  gossip: string;              // Gossip address (IP:port)
  prpc: string | null;         // pRPC endpoint if available
  version: string;             // Pod software version
  shredVersion: number | null; // Shred version for compatibility
}

// Node status information
export type PNodeStatus = 'online' | 'offline' | 'degraded' | 'syncing' | 'unknown';

// Storage metrics for a pNode
export interface PNodeStorageMetrics {
  totalCapacity: number;       // Total storage capacity in bytes
  usedCapacity: number;        // Used storage in bytes
  freeCapacity: number;        // Free storage in bytes
  pageCount: number;           // Number of stored pages
  bucketCount: number;         // Number of buckets served
  redundancyLevel: number;     // Average redundancy level
}

// Performance metrics
export interface PNodePerformanceMetrics {
  uptime: number;              // Uptime in seconds
  uptimePercentage: number;    // Uptime percentage (0-100)
  responseTime: number;        // Average response time in ms
  requestsPerSecond: number;   // Current RPS
  requestsTotal: number;       // Total requests served
  failedRequests: number;      // Failed request count
  bandwidth: {
    inbound: number;           // Inbound bandwidth in bytes/s
    outbound: number;          // Outbound bandwidth in bytes/s
  };
}

// Staking and rewards information
export interface PNodeStakingInfo {
  stakedXand: number;          // Amount of XAND staked
  delegatedXand: number;       // Amount delegated from others
  commission: number;          // Commission rate (0-100)
  rewards: {
    epoch: number;             // Current epoch
    epochRewards: number;      // Rewards this epoch
    totalRewards: number;      // All-time rewards
    pendingRewards: number;    // Unclaimed rewards
  };
  era: 'deep-south' | 'munich' | 'herrenberg' | 'reinheim' | 'unknown';
  boostFactor: number;         // Boost multiplier (1x, 16x, etc.)
}

// Full pNode information
export interface PNode {
  identity: PNodeIdentity;
  status: PNodeStatus;
  storage: PNodeStorageMetrics;
  performance: PNodePerformanceMetrics;
  staking: PNodeStakingInfo;
  geo: PNodeGeoInfo | null;
  lastSeen: string;            // ISO timestamp
  firstSeen: string;           // ISO timestamp
  metadata: {
    name?: string;             // Optional operator-set name
    description?: string;      // Optional description
    website?: string;          // Optional website
    avatar?: string;           // Optional avatar URL
  };
}

// Cluster-wide statistics
export interface ClusterStats {
  totalPNodes: number;
  onlinePNodes: number;
  offlinePNodes: number;
  totalStorage: {
    capacity: number;
    used: number;
    free: number;
  };
  totalStaked: number;
  averageUptime: number;
  averageResponseTime: number;
  networkVersion: string;
  currentEpoch: number;
  epochProgress: number;       // 0-100
  lastUpdated: string;
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: string;
}

// Paginated response
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Filter and sort options
export interface PNodeFilters {
  status?: PNodeStatus[];
  minUptime?: number;
  minStake?: number;
  era?: string[];
  country?: string[];
  search?: string;
}