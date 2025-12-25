'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function Card({ 
  children, 
  className, 
  hover = true,
  glow = false 
}: CardProps) {
  return (
    <motion.div
      className={cn(
        'relative rounded-xl border backdrop-blur-sm',
        'bg-secondary/30 border-primary/20',
        'transition-all duration-300',
        hover && 'hover:border-primary/40 hover:shadow-lg',
        glow && 'shadow-[0_0_30px_rgba(0,212,170,0.15)]',
        className
      )}
      whileHover={hover ? { scale: 1.02 } : undefined}
      whileTap={hover ? { scale: 0.98 } : undefined}
    >
      {children}
    </motion.div>
  );
}

// Specialized Metric Card
interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
}

export function MetricCard({ title, value, change, icon }: MetricCardProps) {
  const isPositive = change && change > 0;
  
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {change !== undefined && (
            <p className={cn(
              "text-sm mt-1",
              isPositive ? 'text-success' : 'text-error'
            )}>
              {isPositive ? '↑' : '↓'} {Math.abs(change)}%
            </p>
          )}
        </div>
        {icon && (
          <div className="p-3 rounded-lg bg-primary/10">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}