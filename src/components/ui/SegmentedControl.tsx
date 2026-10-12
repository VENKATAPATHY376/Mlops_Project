import React from 'react';
import { twMerge } from 'tailwind-merge';

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label





}: {options: {key: T;label: string;}[];value: T;onChange: (key: T) => void;label: string;}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-line/80 bg-elevated/70 p-1">
      
      {options.map((opt) => {
        const active = opt.key === value;
        return (
          <button
            key={opt.key}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt.key)}
            className={twMerge(
              'whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors duration-150 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
              active ?
              'bg-accent/15 text-accent shadow-[inset_0_0_0_1px_rgba(34,211,238,0.25)]' :
              'text-muted hover:text-ink'
            )}>
            
            {opt.label}
          </button>);

      })}
    </div>);

}