/**
 * Application Configuration
 * 
 * Centralized configuration for the Xandeum pNode Analytics platform.
 */

export const config = {
  // API Configuration
  api: {
    // Xandeum RPC endpoint for validator/blockchain data
    rpcUrl: process.env.NEXT_PUBLIC_XANDEUM_RPC_URL || 'https://rpc.xandeum.network',
    
    // Xandeum pRPC endpoint for pNode data (gossip protocol)
    prpcUrl: process.env.NEXT_PUBLIC_XANDEUM_PRPC_URL || 'https://prpc.xandeum.network',
    
    // Request timeout in milliseconds
    timeout: 30000,
    
    // Retry configuration
    retries: 3,
    retryDelay: 1000,
  },
  
  // Refresh intervals (in milliseconds)
  refreshIntervals: {
    pnodeList: 30000,       // 30 seconds
    clusterStats: 15000,    // 15 seconds
    epochInfo: 60000,       // 1 minute
    networkHealth: 10000,   // 10 seconds
    charts: 60000,          // 1 minute
  },
  
  // Pagination defaults
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },
  
  // Cache configuration
  cache: {
    staleTime: 10000,       // 10 seconds
    gcTime: 300000,         // 5 minutes
  },
  
  // Feature flags
  features: {
    enableRealTimeUpdates: true,
    enableGeoMapping: true,
    enableExport: true,
    useMockData: true,       // Toggle for development
  },
  
  // UI Configuration
  ui: {
    theme: 'dark',
    chartColors: {
      primary: '#00D4AA',
      secondary: '#1E3A5F',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },
  },
  
  // Thresholds for status determination
  thresholds: {
    uptime: {
      healthy: 99,          // >= 99% is healthy
      degraded: 95,         // >= 95% is degraded
    },
    responseTime: {
      fast: 100,            // <= 100ms is fast
      acceptable: 500,      // <= 500ms is acceptable
    },
    storage: {
      warning: 80,          // >= 80% triggers warning
      critical: 95,         // >= 95% is critical
    },
  },
  
  // External links
  links: {
    docs: 'https://docs.xandeum.network',
    discord: 'https://discord.gg/uqRSmmM5m',
    twitter: 'https://x.com/XandeumNetwork',
    github: 'https://github.com/Xandeum',
    explorer: 'https://explorer.xandeum.com',
  },
} as const;

export type Config = typeof config;