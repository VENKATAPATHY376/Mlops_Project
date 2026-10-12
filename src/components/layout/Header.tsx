import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BellIcon, ChevronDownIcon, MenuIcon, MoonIcon, SearchIcon, SunIcon, WindIcon } from 'lucide-react';
import { CitySelector } from './CitySelector';
import { usePlatform } from '../../contexts/PlatformContext';
import { CITIES, SNAPSHOTS } from '../../data/cities';
import { ALERTS, SEVERITY_HEX } from '../../data/alerts';
import { NAV_ITEMS } from '../../data/navigation';
import { CityId } from '../../types/aqi';

interface SearchResult {
  label: string;
  meta: string;
  to: string;
  cityId?: CityId;
}

export function Header({ onOpenNav }: {onOpenNav: () => void;}) {
  const { theme, toggleTheme, unreadAlerts, setCityId } = usePlatform();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) setBellOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const cityHits = CITIES.filter((c) => `${c.name} ${c.state}`.toLowerCase().includes(q)).map((c) => ({
      label: c.name,
      meta: `City · AQI ${SNAPSHOTS[c.id].aqi} · ${c.stations} stations`,
      to: '/',
      cityId: c.id
    }));
    const pageHits = NAV_ITEMS.filter((n) => n.label.toLowerCase().includes(q)).map((n) => ({
      label: n.label,
      meta: `Module · ${n.group}`,
      to: n.to
    }));
    const alertHits = ALERTS.filter((a) => `${a.title} ${a.type}`.toLowerCase().includes(q)).
    slice(0, 3).
    map((a) => ({ label: a.title, meta: `Alert · ${a.type}`, to: '/alerts', cityId: a.cityId }));
    return [...cityHits, ...pageHits, ...alertHits].slice(0, 7);
  }, [query]);

  function pick(result: SearchResult) {
    if (result.cityId) setCityId(result.cityId);
    navigate(result.to);
    setQuery('');
    setSearchOpen(false);
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line/70 bg-base/80 px-4 backdrop-blur-xl sm:px-6">
      <button
        type="button"
        onClick={onOpenNav}
        aria-label="Open navigation"
        className="rounded-lg p-2 text-muted transition-colors hover:bg-elevated hover:text-ink lg:hidden">
        
        <MenuIcon className="h-5 w-5" aria-hidden="true" />
      </button>

      <Link to="/" className="flex shrink-0 items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
          <WindIcon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="hidden sm:block">
          <span className="block text-sm font-semibold leading-tight tracking-tight text-ink">AirPulse AI</span>
          <span className="block text-[10px] uppercase tracking-[0.12em] text-muted">Air Quality Intelligence</span>
        </span>
      </Link>

      <div ref={searchRef} className="relative ml-auto hidden min-w-0 max-w-md flex-1 md:block lg:ml-6">
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onFocus={() => setSearchOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setSearchOpen(true);
          }}
          placeholder="Search City, AQI, Reports..."
          aria-label="Search city, AQI or reports"
          className="w-full rounded-xl border border-line bg-elevated/70 py-2 pl-9 pr-3 text-sm text-ink placeholder:text-muted/80 transition-colors duration-150 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/25" />
        
        <AnimatePresence>
          {searchOpen && query.trim() ?
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="absolute left-0 right-0 z-50 mt-2 rounded-2xl border border-line bg-surface/95 p-1.5 shadow-lift backdrop-blur-xl">
            
              {results.length === 0 ?
            <p className="px-3 py-4 text-xs text-muted">No matches for “{query}”. Try a city, module or report name.</p> :

            <ul>
                  {results.map((r) =>
              <li key={`${r.label}-${r.to}`}>
                      <button
                  type="button"
                  onClick={() => pick(r)}
                  className="w-full rounded-xl px-3 py-2 text-left transition-colors duration-150 hover:bg-elevated">
                  
                        <span className="block truncate text-sm text-ink">{r.label}</span>
                        <span className="block truncate text-[11px] text-muted">{r.meta}</span>
                      </button>
                    </li>
              )}
                </ul>
            }
            </motion.div> :
          null}
        </AnimatePresence>
      </div>

      <div className="ml-auto flex items-center gap-2 md:ml-0">
        <CitySelector />

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="rounded-xl border border-line bg-elevated/70 p-2 text-muted transition-colors duration-150 hover:text-accent">
          
          {theme === 'dark' ? <SunIcon className="h-4 w-4" aria-hidden="true" /> : <MoonIcon className="h-4 w-4" aria-hidden="true" />}
        </button>

        <div ref={bellRef} className="relative">
          <button
            type="button"
            onClick={() => setBellOpen((v) => !v)}
            aria-label={`Notifications (${unreadAlerts} unread)`}
            aria-expanded={bellOpen}
            className="relative rounded-xl border border-line bg-elevated/70 p-2 text-muted transition-colors duration-150 hover:text-accent">
            
            <BellIcon className="h-4 w-4" aria-hidden="true" />
            {unreadAlerts > 0 ?
            <span className="numeric absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-aqi-veryPoor px-1 text-[9px] font-bold text-white">
                {unreadAlerts}
              </span> :
            null}
          </button>
          <AnimatePresence>
            {bellOpen ?
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
              className="absolute right-0 z-50 mt-2 w-[320px] origin-top-right rounded-2xl border border-line bg-surface/95 shadow-lift backdrop-blur-xl">
              
                <p className="border-b border-line/70 px-4 py-3 text-xs font-semibold text-muted">Active alerts</p>
                <ul className="max-h-80 overflow-y-auto p-1.5">
                  {ALERTS.filter((a) => !a.acknowledged).map((a) =>
                <li key={a.id}>
                      <button
                    type="button"
                    onClick={() => {
                      setCityId(a.cityId);
                      navigate('/alerts');
                      setBellOpen(false);
                    }}
                    className="w-full rounded-xl px-3 py-2.5 text-left transition-colors duration-150 hover:bg-elevated">
                    
                        <span className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full" style={{ background: SEVERITY_HEX[a.severity] }} aria-hidden="true" />
                          <span className="text-[11px] font-semibold text-muted">{a.type}</span>
                          <span className="ml-auto text-[11px] text-muted">{a.issuedAt}</span>
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-ink">{a.title}</span>
                      </button>
                    </li>
                )}
                </ul>
              </motion.div> :
            null}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-line bg-elevated/70 py-1.5 pl-1.5 pr-2.5">
          <span className="numeric grid h-7 w-7 place-items-center rounded-lg bg-accent/15 text-xs font-bold text-accent">RK</span>
          <span className="hidden leading-tight xl:block">
            <span className="block whitespace-nowrap text-xs font-medium text-ink">R. Krishnan</span>
            <span className="block whitespace-nowrap text-[10px] text-muted">CPCB · Regional Analyst</span>
          </span>
          <ChevronDownIcon className="hidden h-3.5 w-3.5 text-muted xl:block" aria-hidden="true" />
        </div>
      </div>
    </header>);

}