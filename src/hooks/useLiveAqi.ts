import { useEffect, useState } from 'react';
import { CITIES, SNAPSHOTS } from '../data/cities';
import { CityId } from '../types/aqi';
import { clampAqi } from '../utils/aqi';

export interface LiveReading {
  cityId: CityId;
  name: string;
  aqi: number;
  trendPct: number;
}

function baseline(): LiveReading[] {
  return CITIES.map((c) => ({
    cityId: c.id,
    name: c.name,
    aqi: SNAPSHOTS[c.id].aqi,
    trendPct: SNAPSHOTS[c.id].trendPct
  }));
}

/** Simulates the station telemetry feed drifting around the published snapshot. */
export function useLiveAqi(intervalMs = 6000): {readings: LiveReading[];updatedAgo: number;} {
  const [readings, setReadings] = useState<LiveReading[]>(baseline);
  const [updatedAgo, setUpdatedAgo] = useState(0);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setReadings((prev) =>
      prev.map((r) => {
        const anchor = SNAPSHOTS[r.cityId].aqi;
        const next = clampAqi(r.aqi * 0.7 + anchor * 0.3 + (Math.random() - 0.5) * 4);
        const delta = (next - anchor) / anchor * 100;
        return { ...r, aqi: next, trendPct: SNAPSHOTS[r.cityId].trendPct + delta * 0.3 };
      })
      );
      setUpdatedAgo(0);
    }, intervalMs);
    const clock = window.setInterval(() => setUpdatedAgo((s) => s + 1), 1000);
    return () => {
      window.clearInterval(tick);
      window.clearInterval(clock);
    };
  }, [intervalMs]);

  return { readings, updatedAgo };
}