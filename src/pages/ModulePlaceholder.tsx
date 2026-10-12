import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeftIcon, LayoutDashboardIcon } from 'lucide-react';
import { NAV_ITEMS } from '../data/navigation';
import { GlassCard } from '../components/ui/GlassCard';

export function ModulePlaceholder() {
  const { pathname } = useLocation();
  const item = NAV_ITEMS.find((n) => n.to === pathname);
  const Icon = item?.icon ?? LayoutDashboardIcon;
  const title = item?.label ?? 'Page not found';

  return (
    <GlassCard as="section" className="mx-auto flex max-w-xl flex-col items-center px-8 py-14 text-center">
      <span className="grid h-12 w-12 place-items-center rounded-2xl border border-accent/40 bg-accent/10 text-accent">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </span>
      <h1 className="mt-5 text-2xl font-semibold tracking-tight text-ink">{title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {item ?
        `The ${item.label} module is on the roadmap. Live monitoring is available on the dashboard in the meantime.` :
        'This page does not exist. Head back to the dashboard to continue monitoring.'}
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-[rgb(var(--c-base))] transition-[filter] duration-150 hover:brightness-110">
        
        <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
        Back to dashboard
      </Link>
    </GlassCard>);

}