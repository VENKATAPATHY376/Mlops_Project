import React from 'react';
import { getCategory } from '../../utils/aqi';
import { useLiveAqi } from '../../hooks/useLiveAqi';

export function LiveTicker() {
  const { readings, updatedAgo } = useLiveAqi();
  const items = readings.map((r) => {
    const cat = getCategory(r.aqi);
    return { ...r, hex: cat.hex, label: cat.label };
  });
  const track = [...items, ...items, ...items, ...items];

  return (
    <div className="relative flex h-9 items-center overflow-hidden border-b border-line/70 bg-surface/50 backdrop-blur-xl">
      <span className="z-10 flex h-full shrink-0 items-center gap-2 border-r border-line/70 bg-elevated/90 px-4 text-[10px] font-bold uppercase tracking-[0.14em] text-accent">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" aria-hidden="true" />
        Live AQI
      </span>
      <div className="flex min-w-0 flex-1 overflow-hidden" aria-live="off">
        <div className="ticker-track flex shrink-0 items-center whitespace-nowrap">
          {track.map((item, i) =>
          <span key={i} className="flex items-center gap-2 px-5 text-xs">
              <span className="font-medium text-ink">{item.name}</span>
              <span className="numeric font-semibold" style={{ color: item.hex }}>
                AQI {item.aqi}
              </span>
              <span className="text-muted">{item.label}</span>
              <span className="numeric" style={{ color: item.trendPct > 0 ? '#ef4444' : '#22c55e' }}>
                {item.trendPct > 0 ? '▲' : '▼'} {Math.abs(item.trendPct).toFixed(1)}%
              </span>
              <span className="pl-3 text-line" aria-hidden="true">
                •
              </span>
            </span>
          )}
        </div>
      </div>
      <span className="numeric z-10 hidden h-full shrink-0 items-center border-l border-line/70 bg-elevated/90 px-3 text-[10px] text-muted sm:flex">
        updated {updatedAgo}s ago
      </span>
    </div>);

}