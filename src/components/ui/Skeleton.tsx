import React from 'react';
import { twMerge } from 'tailwind-merge';

export function Skeleton({ className, style }: {className?: string;style?: React.CSSProperties;}) {
  return (
    <div
      className={twMerge('shimmer relative overflow-hidden rounded-lg bg-line/40', className)}
      style={style}
      aria-hidden="true" />);


}

export function KpiSkeleton() {
  return (
    <div className="rounded-2xl border border-line/70 bg-surface/70 p-5">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="mt-4 h-8 w-20" />
      <Skeleton className="mt-3 h-3 w-32" />
    </div>);

}

export function ChartSkeleton({ height = 260 }: {height?: number;}) {
  return (
    <div className="flex items-end gap-2" style={{ height }} aria-hidden="true">
      {[42, 68, 54, 82, 61, 74, 48, 88, 66, 58, 79, 52].map((h, i) =>
      <Skeleton key={i} className="flex-1" style={{ height: `${h}%` }} />
      )}
    </div>);

}