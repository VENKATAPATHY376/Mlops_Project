import React from 'react';
import { twMerge } from 'tailwind-merge';

export function Pill({
  children,
  hex,
  className




}: {children: React.ReactNode;hex?: string;className?: string;}) {
  return (
    <span
      className={twMerge(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold',
        className
      )}
      style={hex ? { color: hex, borderColor: `${hex}55`, backgroundColor: `${hex}1a` } : undefined}>
      
      {hex ? <span className="h-1.5 w-1.5 rounded-full" style={{ background: hex }} /> : null}
      {children}
    </span>);

}

export function TrendPill({ value }: {value: number;}) {
  const up = value > 0;
  return (
    <Pill hex={up ? '#ef4444' : '#22c55e'}>
      {up ? '▲' : '▼'} {Math.abs(value).toFixed(1)}%
    </Pill>);

}