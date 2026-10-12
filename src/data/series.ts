import { CityId, RangeKey, SeriesPoint } from '../types/aqi';
import { clampAqi, seeded } from '../utils/aqi';
import { SNAPSHOTS } from './cities';

const SEEDS: Record<CityId, number> = {
  chennai: 1301,
  delhi: 2861,
  mumbai: 1907,
  bengaluru: 1297,
  hyderabad: 1738
};

export const RANGES: {key: RangeKey;label: string;points: number;}[] = [
{ key: '24h', label: '24 Hours', points: 24 },
{ key: '7d', label: '7 Days', points: 7 },
{ key: '30d', label: '30 Days', points: 30 },
{ key: '6m', label: '6 Months', points: 26 },
{ key: '1y', label: '1 Year', points: 12 }];


const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function labelFor(range: RangeKey, i: number): string {
  if (range === '24h') return `${String((i + 1) % 24).padStart(2, '0')}:00`;
  if (range === '7d') return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i % 7];
  if (range === '30d') return `D${i + 1}`;
  if (range === '6m') return `W${i + 1}`;
  return MONTHS[i % 12];
}

/** Winter months are worse across Indian cities; monsoon months are cleaner. */
function monthFactor(month: number): number {
  const curve = [1.34, 1.22, 1.08, 1.0, 0.96, 0.82, 0.72, 0.74, 0.88, 1.12, 1.38, 1.42];
  return curve[month % 12];
}

export function aqiSeries(cityId: CityId, range: RangeKey): SeriesPoint[] {
  const meta = RANGES.find((r) => r.key === range) ?? RANGES[0];
  const rnd = seeded(SEEDS[cityId] + meta.points);
  const base = SNAPSHOTS[cityId].averageAqi;
  const out: SeriesPoint[] = [];
  for (let i = 0; i < meta.points; i++) {
    let value = base;
    if (range === '24h') {
      const hour = (i + 1) % 24;
      value = base * (Math.cos((hour - 8) / 24 * Math.PI * 2) * 0.16 + 1);
    } else if (range === '1y') {
      value = base * monthFactor(i);
    } else if (range === '6m') {
      value = base * monthFactor(Math.floor(i / 4.4) + 4);
    } else {
      value = base * (0.9 + i / meta.points * 0.22);
    }
    value *= 0.94 + rnd() * 0.13;
    out.push({ label: labelFor(range, i), aqi: clampAqi(value) });
  }
  out[out.length - 1] = { ...out[out.length - 1], aqi: SNAPSHOTS[cityId].aqi };
  return out;
}