import React from 'react';
import { BrainCircuitIcon, CloudSunIcon, LandmarkIcon, LineChartIcon } from 'lucide-react';
import { DATA_SOURCES } from '../../data/healthAdvisory';
import { GlassCard } from '../ui/GlassCard';

const ICONS: Record<string, typeof LandmarkIcon> = {
  aqi: LandmarkIcon,
  weather: CloudSunIcon,
  forecast: BrainCircuitIcon,
  monitoring: LineChartIcon
};

export function DataSources() {
  return (
    <section aria-label="Data sources" className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-ink">Data sources & transparency</h2>
        <p className="text-[11px] text-muted">All figures traceable to their originating authority and pipeline run</p>
      </div>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {DATA_SOURCES.map((source) => {
          const Icon = ICONS[source.id];
          return (
            <li key={source.id}>
              <GlassCard className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">{source.label}</p>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line/80 bg-elevated/80 text-accent">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold leading-snug text-ink">{source.name}</p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted">{source.detail}</p>
                <p className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[11px] font-medium text-aqi-good">
                  <span className="h-1.5 w-1.5 rounded-full bg-aqi-good" aria-hidden="true" />
                  {source.status}
                </p>
              </GlassCard>
            </li>);

        })}
      </ul>
    </section>);

}