import { AqiCategory } from '../types/aqi';

export const AQI_CATEGORIES: AqiCategory[] = [
{
  key: 'good',
  label: 'Good',
  min: 0,
  max: 50,
  hex: '#22c55e',
  healthImpact: 'Minimal impact. Air quality is considered satisfactory for all groups.',
  advice: [
  'Ideal conditions for outdoor exercise and school activity',
  'No precautions required for sensitive groups',
  'Keep windows open for natural ventilation']

},
{
  key: 'satisfactory',
  label: 'Satisfactory',
  min: 51,
  max: 100,
  hex: '#a3e635',
  healthImpact: 'Minor breathing discomfort possible for highly sensitive individuals.',
  advice: [
  'Outdoor activity is safe for the general population',
  'Asthmatic individuals should carry prescribed inhalers',
  'Prefer early morning hours for strenuous exercise']

},
{
  key: 'moderate',
  label: 'Moderate',
  min: 101,
  max: 200,
  hex: '#facc15',
  healthImpact:
  'Breathing discomfort for people with lung or heart disease, children and older adults.',
  advice: [
  'Limit prolonged outdoor exertion in the afternoon',
  'Sensitive groups should reduce heavy outdoor activity',
  'Run indoor air purification where available']

},
{
  key: 'poor',
  label: 'Poor',
  min: 201,
  max: 300,
  hex: '#f97316',
  healthImpact: 'Breathing discomfort for most people on prolonged exposure.',
  advice: [
  'Avoid prolonged outdoor activity',
  'Wear an N95 mask when travelling outdoors',
  'Keep indoor air clean with purifiers and sealed windows']

},
{
  key: 'veryPoor',
  label: 'Very Poor',
  min: 301,
  max: 400,
  hex: '#ef4444',
  healthImpact: 'Respiratory illness on prolonged exposure; pronounced effects for at-risk groups.',
  advice: [
  'Suspend outdoor sport and construction labour',
  'Mandatory N95 masks for outdoor workers',
  'Operate HEPA purifiers continuously indoors']

},
{
  key: 'severe',
  label: 'Severe',
  min: 401,
  max: 500,
  hex: '#9f1239',
  healthImpact: 'Affects healthy people and seriously impacts those with existing disease.',
  advice: [
  'Stay indoors and seal building envelopes',
  'Issue public health emergency advisory',
  'Restrict vehicular and industrial emissions']

}];


export function getCategory(aqi: number): AqiCategory {
  const clamped = Math.max(0, Math.min(500, aqi));
  return AQI_CATEGORIES.find((c) => clamped >= c.min && clamped <= c.max) ?? AQI_CATEGORIES[0];
}

export function aqiHex(aqi: number): string {
  return getCategory(aqi).hex;
}

export function riskLabel(score: number): string {
  if (score < 25) return 'Low risk';
  if (score < 50) return 'Guarded';
  if (score < 70) return 'Elevated';
  if (score < 85) return 'High';
  return 'Severe';
}

/** Deterministic pseudo-random generator so mock data is stable across renders. */
export function seeded(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = s * 16807 % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function clampAqi(v: number): number {
  return Math.max(8, Math.min(499, Math.round(v)));
}