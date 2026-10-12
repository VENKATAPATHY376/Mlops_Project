import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRightIcon } from 'lucide-react';
import { CITIES, SNAPSHOTS } from '../../data/cities';
import { usePlatform } from '../../contexts/PlatformContext';
import { getCategory } from '../../utils/aqi';
import { TrendPill } from '../ui/Pill';

export function CityOverviewCards() {
  const { cityId, setCityId } = usePlatform();

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {CITIES.map((city, i) => {
        const snap = SNAPSHOTS[city.id];
        const cat = getCategory(snap.aqi);
        const selected = city.id === cityId;
        return (
          <motion.li
            key={city.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.26, delay: i * 0.04, ease: [0.23, 1, 0.32, 1] }}>
            
            <button
              type="button"
              onClick={() => setCityId(city.id)}
              aria-pressed={selected}
              className={[
              'group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-surface/70 p-4 text-left backdrop-blur-xl transition-[border-color,transform] duration-200 ease-smooth hover:-translate-y-0.5',
              selected ? 'border-accent/60' : 'border-line/70 hover:border-line'].
              join(' ')}>
              
              <span
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{ background: cat.hex, opacity: selected ? 1 : 0.5 }}
                aria-hidden="true" />
              
              <span className="flex w-full items-start justify-between gap-2">
                <span>
                  <span className="block text-sm font-semibold text-ink">{city.name}</span>
                  <span className="block text-[11px] text-muted">{city.state}</span>
                </span>
                <ArrowUpRightIcon
                  className="h-3.5 w-3.5 shrink-0 text-muted opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                  aria-hidden="true" />
                
              </span>
              <span className="mt-4 flex items-end gap-2">
                <span className="numeric text-3xl font-semibold" style={{ color: cat.hex }}>
                  {snap.aqi}
                </span>
                <span className="pb-1 text-[11px] font-medium" style={{ color: cat.hex }}>
                  {cat.label}
                </span>
              </span>
              <span className="mt-auto flex w-full items-center justify-between gap-2 pt-3">
                <TrendPill value={snap.trendPct} />
                <span className="numeric whitespace-nowrap text-[11px] text-muted">24h → {snap.forecast24}</span>
              </span>
            </button>
          </motion.li>);

      })}
    </ul>);

}