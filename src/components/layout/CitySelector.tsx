import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, ChevronDownIcon, MapPinIcon } from 'lucide-react';
import { CITIES, SNAPSHOTS } from '../../data/cities';
import { usePlatform } from '../../contexts/PlatformContext';
import { aqiHex, getCategory } from '../../utils/aqi';

export function CitySelector() {
  const { cityId, setCityId, city } = usePlatform();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 whitespace-nowrap rounded-xl border border-line bg-elevated/80 px-3 py-2 text-sm text-ink transition-colors duration-150 ease-smooth hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60">
        
        <MapPinIcon className="h-4 w-4 text-accent" aria-hidden="true" />
        <span className="font-medium">{city.name}</span>
        <span className="numeric hidden text-xs font-semibold sm:inline" style={{ color: aqiHex(SNAPSHOTS[cityId].aqi) }}>
          {SNAPSHOTS[cityId].aqi}
        </span>
        <ChevronDownIcon
          className={`h-3.5 w-3.5 text-muted transition-transform duration-150 ease-smooth ${open ? 'rotate-180' : ''}`}
          aria-hidden="true" />
        
      </button>

      <AnimatePresence>
        {open ?
        <motion.ul
          role="listbox"
          aria-label="Select city"
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
          className="absolute right-0 z-50 mt-2 w-64 origin-top rounded-2xl border border-line bg-surface/95 p-1.5 shadow-lift backdrop-blur-xl">
          
            {CITIES.map((c) => {
            const snap = SNAPSHOTS[c.id];
            const cat = getCategory(snap.aqi);
            const selected = c.id === cityId;
            return (
              <li key={c.id} role="option" aria-selected={selected}>
                  <button
                  type="button"
                  onClick={() => {
                    setCityId(c.id);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-150 hover:bg-elevated">
                  
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: cat.hex }} aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-ink">{c.name}</span>
                      <span className="block truncate text-[11px] text-muted">{c.state}</span>
                    </span>
                    <span className="numeric text-sm font-semibold" style={{ color: cat.hex }}>
                      {snap.aqi}
                    </span>
                    {selected ?
                  <CheckIcon className="h-3.5 w-3.5 text-accent" aria-hidden="true" /> :

                  <span className="w-3.5" aria-hidden="true" />
                  }
                  </button>
                </li>);

          })}
          </motion.ul> :
        null}
      </AnimatePresence>
    </div>);

}