import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDownIcon, TrendingUpIcon, TrophyIcon, TriangleAlertIcon } from 'lucide-react';
import { CITIES, SNAPSHOTS } from '../../data/cities';
import { usePlatform } from '../../contexts/PlatformContext';
import { getCategory } from '../../utils/aqi';
import { Panel } from '../ui/Panel';

type Order = 'cleanest' | 'polluted';

function RankList({ order }: {order: Order;}) {
  const { cityId, setCityId } = usePlatform();
  const rows = [...CITIES].sort((a, b) =>
  order === 'cleanest' ? SNAPSHOTS[a.id].aqi - SNAPSHOTS[b.id].aqi : SNAPSHOTS[b.id].aqi - SNAPSHOTS[a.id].aqi
  );

  return (
    <ol className="space-y-1.5">
      {rows.map((city, i) => {
        const snap = SNAPSHOTS[city.id];
        const cat = getCategory(snap.aqi);
        const active = city.id === cityId;
        const improving = snap.trendPct <= 0;
        const Trend = improving ? TrendingDownIcon : TrendingUpIcon;
        return (
          <motion.li key={city.id} layout transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}>
            <button
              type="button"
              onClick={() => setCityId(city.id)}
              aria-pressed={active}
              className={[
              'flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-[background-color,border-color] duration-150 ease-smooth hover:bg-elevated/70',
              active ? 'border-accent/50 bg-accent/[0.06]' : 'border-line/50 bg-elevated/40'].
              join(' ')}>
              
              <span
                className={[
                'numeric grid h-6 w-6 shrink-0 place-items-center rounded-lg text-[11px] font-bold',
                i === 0 ? '' : 'bg-line/50 text-muted'].
                join(' ')}
                style={i === 0 ? { background: `${cat.hex}20`, color: cat.hex } : undefined}>
                
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-ink">{city.name}</span>
                <span className="block text-[11px] text-muted">{cat.label}</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="numeric text-sm font-semibold" style={{ color: cat.hex }}>
                  {snap.aqi}
                </span>
                <span
                  className="numeric flex w-12 items-center justify-end gap-0.5 text-[11px]"
                  style={{ color: improving ? '#22c55e' : '#ef4444' }}>
                  
                  <Trend className="h-3 w-3" aria-hidden="true" />
                  {Math.abs(snap.trendPct).toFixed(1)}%
                </span>
              </span>
            </button>
          </motion.li>);

      })}
    </ol>);

}

export function CityRankings() {
  const sections: {order: Order;title: string;subtitle: string;icon: React.ReactNode;}[] = [
  {
    order: 'cleanest',
    title: 'Cleanest cities',
    subtitle: 'Ranked ascending by live index',
    icon: <TrophyIcon className="h-4 w-4 text-aqi-good" aria-hidden="true" />
  },
  {
    order: 'polluted',
    title: 'Most polluted cities',
    subtitle: 'Ranked descending by live index',
    icon: <TriangleAlertIcon className="h-4 w-4 text-aqi-veryPoor" aria-hidden="true" />
  }];


  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {sections.map((section) =>
      <Panel key={section.order} title={section.title} subtitle={section.subtitle} actions={section.icon}>
          <RankList order={section.order} />
        </Panel>
      )}
    </div>);

}