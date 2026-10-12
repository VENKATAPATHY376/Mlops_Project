import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { City, CityId, CitySnapshot, ThemeMode } from '../types/aqi';
import { getCity, SNAPSHOTS } from '../data/cities';
import { ALERTS } from '../data/alerts';

interface PlatformValue {
  cityId: CityId;
  setCityId: (id: CityId) => void;
  city: City;
  snapshot: CitySnapshot;
  theme: ThemeMode;
  toggleTheme: () => void;
  unreadAlerts: number;
  loading: boolean;
}

const PlatformContext = createContext<PlatformValue | null>(null);

export function PlatformProvider({
  children,
  initialCity = 'chennai',
  initialTheme = 'dark'




}: {children: React.ReactNode;initialCity?: CityId;initialTheme?: ThemeMode;}) {
  const [cityId, setCityIdState] = useState<CityId>(initialCity);
  const [theme, setTheme] = useState<ThemeMode>(initialTheme);
  const [loading, setLoading] = useState(true);

  useEffect(() => setCityIdState(initialCity), [initialCity]);
  useEffect(() => setTheme(initialTheme), [initialTheme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, [cityId]);

  const setCityId = useCallback((id: CityId) => setCityIdState(id), []);
  const toggleTheme = useCallback(() => setTheme((t) => t === 'dark' ? 'light' : 'dark'), []);

  const value = useMemo<PlatformValue>(
    () => ({
      cityId,
      setCityId,
      city: getCity(cityId),
      snapshot: SNAPSHOTS[cityId],
      theme,
      toggleTheme,
      unreadAlerts: ALERTS.filter((a) => !a.acknowledged).length,
      loading
    }),
    [cityId, setCityId, theme, toggleTheme, loading]
  );

  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
}

export function usePlatform(): PlatformValue {
  const ctx = useContext(PlatformContext);
  if (!ctx) throw new Error('usePlatform must be used inside PlatformProvider');
  return ctx;
}