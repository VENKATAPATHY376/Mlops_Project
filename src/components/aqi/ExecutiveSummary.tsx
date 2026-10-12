import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRightIcon, ArrowRightIcon, ArrowUpRightIcon, SparklesIcon } from 'lucide-react';
import { CITIES, SNAPSHOTS } from '../../data/cities';
import { usePlatform } from '../../contexts/PlatformContext';
import { Panel } from '../ui/Panel';
import { getCategory } from '../../utils/aqi';
import { CityId } from '../../types/aqi';

type Direction = 'up' | 'down' | 'flat';

const DIRECTION = {
  up: { hex: '#ef4444', icon: ArrowUpRightIcon, label: 'Deteriorating' },
  down: { hex: '#22c55e', icon: ArrowDownRightIcon, label: 'Improving' },
  flat: { hex: '#22d3ee', icon: ArrowRightIcon, label: 'Stable' }
} as const;

export function ExecutiveSummary() {
  const { setCityId } = usePlatform();
  const byAqi = [...CITIES].sort((a, b) => SNAPSHOTS[a.id].aqi - SNAPSHOTS[b.id].aqi);
  const cleanest = byAqi[0];
  const worst = byAqi[byAqi.length - 1];
  const mean = Math.round(CITIES.reduce((sum, c) => sum + SNAPSHOTS[c.id].aqi, 0) / CITIES.length);

  const items: {id: string;statement: string;metric: string;direction: Direction;cityId?: CityId;}[] = [
  {
    id: 'worst',
    statement: `${worst.name} recorded the highest AQI among monitored cities.`,
    metric: `AQI ${SNAPSHOTS[worst.id].aqi} · ${getCategory(SNAPSHOTS[worst.id].aqi).label}`,
    direction: 'up',
    cityId: worst.id
  },
  {
    id: 'rain',
    statement: 'Rainfall reduced AQI levels in Chennai during the past week.',
    metric: '11.6 mm accumulated · AQI down 18%',
    direction: 'down',
    cityId: 'chennai'
  },
  {
    id: 'clean',
    statement: `${cleanest.name} currently has the cleanest air quality.`,
    metric: `AQI ${SNAPSHOTS[cleanest.id].aqi} · ${SNAPSHOTS[cleanest.id].trendPct.toFixed(1)}% week-over-week`,
    direction: 'down',
    cityId: cleanest.id
  },
  {
    id: 'network',
    statement: `Network-wide mean index is holding at AQI ${mean} across 5 cities.`,
    metric: '107 stations reporting · 99.97% availability',
    direction: 'flat'
  }];


  return (
    <Panel
      title="AI executive summary"
      subtitle="Generated from the forecasting ensemble and anomaly detection service · updated 4 min ago"
      actions={
      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
          <SparklesIcon className="h-3 w-3" aria-hidden="true" />
          AI
        </span>
      }>
      
      <ul className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {items.map((item, i) => {
          const dir = DIRECTION[item.direction];
          const Icon = dir.icon;
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.26, delay: i * 0.04, ease: [0.23, 1, 0.32, 1] }}
              className="flex gap-3 rounded-xl border border-line/60 bg-elevated/50 p-4">
              
              <span
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg"
                style={{ background: `${dir.hex}18`, color: dir.hex }}>
                
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="flex min-w-0 flex-col">
                <p className="text-xs font-semibold leading-relaxed text-ink">{item.statement}</p>
                <p className="mt-1.5 text-[11px] text-muted">{item.metric}</p>
                {item.cityId ?
                <button
                  type="button"
                  onClick={() => setCityId(item.cityId as CityId)}
                  className="mt-2 self-start text-[11px] font-medium text-accent transition-[filter] duration-150 hover:brightness-125">
                  
                    Focus dashboard →
                  </button> :

                <p className="mt-2 text-[11px]" style={{ color: dir.hex }}>
                    {dir.label}
                  </p>
                }
              </div>
            </motion.li>);

        })}
      </ul>
    </Panel>);

}