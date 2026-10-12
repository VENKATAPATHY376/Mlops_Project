import React from 'react';
import { AQI_CATEGORIES } from '../../utils/aqi';

export function AqiLegend({ compact = false }: {compact?: boolean;}) {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {AQI_CATEGORIES.map((cat) =>
      <li key={cat.key} className="flex items-center gap-1.5 whitespace-nowrap text-[11px] text-muted">
          <span className="h-2 w-2 rounded-full" style={{ background: cat.hex }} aria-hidden="true" />
          <span className="text-ink">{cat.label}</span>
          {compact ? null :
        <span className="numeric">
              {cat.min}–{cat.max}
            </span>
        }
        </li>
      )}
    </ul>);

}