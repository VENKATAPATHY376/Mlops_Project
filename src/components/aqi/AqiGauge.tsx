import React from 'react';
import { motion } from 'framer-motion';
import { AQI_CATEGORIES, getCategory } from '../../utils/aqi';

const START = -220;
const SWEEP = 260;

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = deg * Math.PI / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, from: number, to: number) {
  const a = polar(cx, cy, r, from);
  const b = polar(cx, cy, r, to);
  const large = Math.abs(to - from) > 180 ? 1 : 0;
  return `M ${a.x} ${a.y} A ${r} ${r} 0 ${large} 1 ${b.x} ${b.y}`;
}

export function AqiGauge({
  value,
  forecast,
  size = 260,
  label = 'Current AQI'





}: {value: number;forecast?: number;size?: number;label?: string;}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 22;
  const category = getCategory(value);
  const angle = START + Math.min(value, 500) / 500 * SWEEP;

  const forecastCategory = forecast !== undefined ? getCategory(forecast) : null;
  const forecastAngle = forecast !== undefined ? START + Math.min(forecast, 500) / 500 * SWEEP : null;
  const forecastMarker = forecastAngle !== null ? polar(cx, cy, r, forecastAngle) : null;
  const forecastInner = forecastAngle !== null ? polar(cx, cy, r - 11, forecastAngle) : null;

  return (
    <div className="rounded-2xl border border-line/70 bg-surface/70 p-5 shadow-glass backdrop-blur-xl">
      <div className="flex flex-col items-center">
        <svg
          width="100%"
          viewBox={`0 0 ${size} ${size * 0.82}`}
          style={{ maxWidth: size }}
          role="img"
          aria-label={
          forecastCategory ?
          `${label}: ${value}, ${category.label}. Forecast ${forecast}, ${forecastCategory.label}` :
          `${label}: ${value}, ${category.label}`
          }>
          
          {AQI_CATEGORIES.map((cat) =>
          <path
            key={cat.key}
            d={arcPath(cx, cy, r, START + cat.min / 500 * SWEEP, START + cat.max / 500 * SWEEP)}
            stroke={cat.hex}
            strokeWidth={14}
            fill="none"
            opacity={cat.key === category.key ? 1 : 0.26} />

          )}
          {[0, 100, 200, 300, 400, 500].map((tick) => {
            const deg = START + tick / 500 * SWEEP;
            const outer = polar(cx, cy, r - 12, deg);
            const inner = polar(cx, cy, r - 20, deg);
            const text = polar(cx, cy, r - 32, deg);
            return (
              <g key={tick}>
                <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke="rgb(var(--c-line))" strokeWidth={1.5} />
                <text x={text.x} y={text.y} textAnchor="middle" dominantBaseline="middle" fontSize={9} fill="rgb(var(--c-muted))">
                  {tick}
                </text>
              </g>);

          })}

          {forecastMarker && forecastInner && forecastCategory ?
          <motion.line
            key={`forecast-${forecast}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
            x1={forecastInner.x}
            y1={forecastInner.y}
            x2={forecastMarker.x}
            y2={forecastMarker.y}
            stroke={forecastCategory.hex}
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray="3 2" /> :

          null}

          <motion.g
            initial={{ rotate: START }}
            animate={{ rotate: angle }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}>
            
            <line x1={cx} y1={cy} x2={cx + r - 26} y2={cy} stroke={category.hex} strokeWidth={3} strokeLinecap="round" />
          </motion.g>
          <circle cx={cx} cy={cy} r={7} fill="rgb(var(--c-elevated))" stroke={category.hex} strokeWidth={2} />
          <text x={cx} y={cy + 44} textAnchor="middle" fontSize={34} fontWeight={700} fill={category.hex} className="numeric">
            {value}
          </text>
          <text x={cx} y={cy + 64} textAnchor="middle" fontSize={11} fill="rgb(var(--c-muted))">
            {category.label}
          </text>
        </svg>

        <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted">{label}</p>

        {forecast !== undefined && forecastCategory ?
        <dl className="mt-3 flex w-full items-stretch gap-2">
            <div
            className="flex-1 rounded-xl border p-2.5 text-center"
            style={{ borderColor: `${category.hex}40`, background: `${category.hex}0f` }}>
            
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted">Current</dt>
              <dd className="numeric mt-0.5 text-lg font-semibold" style={{ color: category.hex }}>
                {value}
              </dd>
            </div>
            <div
            className="flex-1 rounded-xl border p-2.5 text-center"
            style={{ borderColor: `${forecastCategory.hex}40`, background: `${forecastCategory.hex}0f` }}>
            
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-muted">24h forecast</dt>
              <dd className="numeric mt-0.5 text-lg font-semibold" style={{ color: forecastCategory.hex }}>
                {forecast}
              </dd>
            </div>
          </dl> :
        null}
      </div>
    </div>);

}