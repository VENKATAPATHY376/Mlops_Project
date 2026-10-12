import { ThemeMode } from '../types/aqi';

export interface ChartTheme {
  grid: string;
  axis: string;
  tooltipBg: string;
  tooltipBorder: string;
  ink: string;
  accent: string;
}

export function chartTheme(mode: ThemeMode): ChartTheme {
  if (mode === 'light') {
    return {
      grid: '#dde4ef',
      axis: '#5b6a82',
      tooltipBg: '#ffffff',
      tooltipBorder: '#d6deeb',
      ink: '#0f172a',
      accent: '#0891b2'
    };
  }
  return {
    grid: '#22304a',
    axis: '#8ea0bb',
    tooltipBg: '#151d2e',
    tooltipBorder: '#27334a',
    ink: '#e8f0fc',
    accent: '#22d3ee'
  };
}

export function tooltipStyle(t: ChartTheme) {
  return {
    contentStyle: {
      background: t.tooltipBg,
      border: `1px solid ${t.tooltipBorder}`,
      borderRadius: 12,
      color: t.ink,
      fontSize: 12,
      boxShadow: '0 20px 50px -28px rgba(0,0,0,0.7)'
    },
    labelStyle: { color: t.axis, fontSize: 11, marginBottom: 4 },
    itemStyle: { color: t.ink, fontSize: 12 }
  };
}