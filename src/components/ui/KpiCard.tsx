import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { AnimatedCounter } from './AnimatedCounter';

export interface KpiCardProps {
  label: string;
  value: string;
  unit?: string;
  caption?: string;
  icon: React.ReactNode;
  accentHex?: string;
  emphasis?: boolean;
  index?: number;
}

export function KpiCard({ label, value, unit, caption, icon, accentHex, emphasis = false, index = 0 }: KpiCardProps) {
  const numeric = /^-?\d+(\.\d+)?$/.test(value);
  const decimals = numeric && value.includes('.') ? value.split('.')[1].length : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: Math.min(index * 0.04, 0.24), ease: [0.23, 1, 0.32, 1] }}>
      
      <GlassCard className={['relative h-full overflow-hidden', emphasis ? 'bg-elevated/80' : ''].join(' ')}>
        {accentHex ?
        <span
          className="absolute inset-x-6 top-0 h-px opacity-80"
          style={{ background: accentHex }}
          aria-hidden="true" /> :

        null}
        <div className="flex items-start justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">{label}</p>
          <span
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line/80 bg-elevated/80 text-muted"
            style={accentHex ? { color: accentHex, borderColor: `${accentHex}44` } : undefined}
            aria-hidden="true">
            
            {icon}
          </span>
        </div>
        <p
          className={['numeric mt-3 font-semibold text-ink', emphasis ? 'text-4xl' : 'text-2xl'].join(' ')}
          style={emphasis && accentHex ? { color: accentHex } : undefined}>
          
          {numeric ? <AnimatedCounter value={Number(value)} decimals={decimals} /> : value}
          {unit ? <span className="ml-1 text-base font-medium text-muted">{unit}</span> : null}
        </p>
        {caption ? <p className="mt-2 text-xs leading-relaxed text-muted">{caption}</p> : null}
      </GlassCard>
    </motion.div>);

}