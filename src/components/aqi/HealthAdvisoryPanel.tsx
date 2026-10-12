import React from 'react';
import { motion } from 'framer-motion';
import { BabyIcon, HeartPulseIcon, StethoscopeIcon, UsersIcon, UserRoundIcon } from 'lucide-react';
import { getCategory } from '../../utils/aqi';
import { ADVISORY_GROUPS, ADVISORY_MATRIX, AdvisoryGroupId, CATEGORY_HEADLINE, RISK_HEX } from '../../data/healthAdvisory';
import { Panel } from '../ui/Panel';

const GROUP_ICONS: Record<AdvisoryGroupId, typeof UsersIcon> = {
  general: UsersIcon,
  children: BabyIcon,
  seniors: UserRoundIcon,
  asthma: StethoscopeIcon
};

export function HealthAdvisoryPanel({ aqi, cityName }: {aqi: number;cityName: string;}) {
  const category = getCategory(aqi);
  const matrix = ADVISORY_MATRIX[category.key];

  return (
    <Panel
      title="Health advisory"
      subtitle={`${cityName} · AQI ${aqi} · ${category.label}`}
      actions={
      <span
        className="whitespace-nowrap rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
        style={{ color: category.hex, borderColor: `${category.hex}55`, background: `${category.hex}14` }}>
        
          {category.label}
        </span>
      }>
      
      <div
        className="flex items-start gap-3 rounded-xl border p-3.5"
        style={{ borderColor: `${category.hex}44`, background: `${category.hex}0f` }}>
        
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg"
          style={{ background: `${category.hex}20`, color: category.hex }}>
          
          <HeartPulseIcon className="h-4 w-4" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">{CATEGORY_HEADLINE[category.key]}</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted">{category.healthImpact}</p>
        </div>
      </div>

      <ul className="mt-4 space-y-2">
        {ADVISORY_GROUPS.map((group, i) => {
          const entry = matrix[group.id];
          const Icon = GROUP_ICONS[group.id];
          const hex = RISK_HEX[entry.risk];
          return (
            <motion.li
              key={`${category.key}-${group.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.26, delay: i * 0.04, ease: [0.23, 1, 0.32, 1] }}
              className="rounded-xl border border-line/60 bg-elevated/50 p-3.5">
              
              <div className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg" style={{ background: `${hex}18`, color: hex }}>
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <p className="min-w-0 flex-1 truncate text-xs font-semibold text-ink">{group.label}</p>
                <span
                  className="shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: hex, background: `${hex}18` }}>
                  
                  {entry.risk}
                </span>
              </div>
              <p className="mt-2.5 text-[11px] leading-relaxed text-muted">{entry.recommendation}</p>
            </motion.li>);

        })}
      </ul>
    </Panel>);

}