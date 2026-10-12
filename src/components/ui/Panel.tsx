import React from 'react';
import { twMerge } from 'tailwind-merge';
import { GlassCard } from './GlassCard';

export function Panel({
  title,
  subtitle,
  actions,
  children,
  className






}: {title: string;subtitle?: string;actions?: React.ReactNode;children: React.ReactNode;className?: string;}) {
  return (
    <GlassCard as="section" className={twMerge('flex h-full flex-col', className)}>
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-ink">{title}</h2>
          {subtitle ? <p className="mt-1 text-xs text-muted">{subtitle}</p> : null}
        </div>
        {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
      </header>
      <div className="mt-5 flex-1">{children}</div>
    </GlassCard>);

}