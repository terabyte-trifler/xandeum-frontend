"use client";

import { cn } from "@/lib/utils";
import type { PNodeStatus } from "@/types/pnode";

const statusConfig: Record<PNodeStatus, { color: string; label: string }> = {
  online: { color: "bg-success", label: "Online" },
  offline: { color: "bg-error", label: "Offline" },
  degraded: { color: "bg-warning", label: "Degraded" },
  syncing: { color: "bg-info", label: "Syncing" },
  unknown: { color: "bg-muted", label: "Unknown" },
};

export function StatusBadge({ status }: { status: PNodeStatus }) {
  const { color, label } = statusConfig[status];

  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                      bg-secondary/50 border border-primary/20"
    >
      <span className={cn("w-2 h-2 rounded-full animate-pulse", color)} />
      <span className="text-sm font-medium">{label}</span>
    </span>
  );
}
