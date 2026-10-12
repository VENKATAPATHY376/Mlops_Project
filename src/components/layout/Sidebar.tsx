import React from 'react';
import { NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { CircleDotIcon, XIcon } from 'lucide-react';
import { NAV_GROUPS, NAV_ITEMS } from '../../data/navigation';
import { usePlatform } from '../../contexts/PlatformContext';

function SidebarContent({ onNavigate }: {onNavigate?: () => void;}) {
  const { unreadAlerts } = usePlatform();
  return (
    <nav aria-label="Primary" className="flex h-full flex-col gap-6 overflow-y-auto px-3 py-5">
      {NAV_GROUPS.map((group) =>
      <div key={group}>
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted/70">{group}</p>
          <ul className="space-y-0.5">
            {NAV_ITEMS.filter((i) => i.group === group).map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.to}>
                  <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                  twMerge(
                    'relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-150 ease-smooth',
                    isActive ? 'bg-accent/10 font-medium text-accent' : 'text-muted hover:bg-elevated/80 hover:text-ink'
                  )
                  }>
                  
                    {({ isActive }) =>
                  <>
                        <span
                      className={twMerge(
                        'absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full transition-opacity duration-150',
                        isActive ? 'bg-accent opacity-100' : 'opacity-0'
                      )}
                      aria-hidden="true" />
                    
                        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span className="truncate">{item.label}</span>
                        {item.to === '/alerts' && unreadAlerts > 0 ?
                    <span className="numeric ml-auto rounded-full bg-aqi-veryPoor/15 px-1.5 py-0.5 text-[10px] font-semibold text-aqi-veryPoor">
                            {unreadAlerts}
                          </span> :
                    null}
                      </>
                  }
                  </NavLink>
                </li>);

          })}
          </ul>
        </div>
      )}

      <div className="mt-auto rounded-xl border border-line/70 bg-elevated/60 p-3.5">
        <p className="flex items-center gap-2 text-[11px] font-semibold text-aqi-good">
          <CircleDotIcon className="h-3.5 w-3.5" aria-hidden="true" />
          All systems operational
        </p>
        <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
          107 stations streaming · Model v4.2.1 · Last sync 4 min ago
        </p>
      </div>
    </nav>);

}

export function Sidebar({ open, onClose }: {open: boolean;onClose: () => void;}) {
  return (
    <>
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[248px] shrink-0 border-r border-line/70 bg-surface/40 backdrop-blur-xl lg:block">
        <SidebarContent />
      </aside>

      {open ?
      <div className="fixed inset-0 z-40 lg:hidden">
          <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        
          <aside className="absolute inset-y-0 left-0 w-[272px] border-r border-line bg-surface shadow-lift">
            <div className="flex items-center justify-between border-b border-line/70 px-4 py-3">
              <span className="text-sm font-semibold text-ink">Navigation</span>
              <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation"
              className="rounded-lg p-1.5 text-muted transition-colors hover:bg-elevated hover:text-ink">
              
                <XIcon className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="h-[calc(100%-49px)]">
              <SidebarContent onNavigate={onClose} />
            </div>
          </aside>
        </div> :
      null}
    </>);

}