import { AqiCategoryKey } from '../types/aqi';

export type AdvisoryGroupId = 'general' | 'children' | 'seniors' | 'asthma';

export const ADVISORY_GROUPS: {id: AdvisoryGroupId;label: string;description: string;}[] = [
{ id: 'general', label: 'General Public', description: 'Healthy adults, outdoor workers' },
{ id: 'children', label: 'Children', description: 'Under 14, schools and playgrounds' },
{ id: 'seniors', label: 'Senior Citizens', description: 'Above 60, cardiac risk groups' },
{ id: 'asthma', label: 'Asthma Patients', description: 'Respiratory and COPD patients' }];


export type RiskLevel = 'Safe' | 'Low' | 'Caution' | 'High' | 'Very High' | 'Emergency';

export const RISK_HEX: Record<RiskLevel, string> = {
  Safe: '#22c55e',
  Low: '#a3e635',
  Caution: '#facc15',
  High: '#f97316',
  'Very High': '#ef4444',
  Emergency: '#9f1239'
};

export interface AdvisoryEntry {
  risk: RiskLevel;
  recommendation: string;
}

export const CATEGORY_HEADLINE: Record<AqiCategoryKey, string> = {
  good: 'Safe outdoor activities',
  satisfactory: 'Safe for most, minor caution for the highly sensitive',
  moderate: 'Sensitive individuals take caution',
  poor: 'Limit outdoor activity',
  veryPoor: 'Wear N95 mask outdoors',
  severe: 'Avoid outdoor exposure'
};

export const ADVISORY_MATRIX: Record<AqiCategoryKey, Record<AdvisoryGroupId, AdvisoryEntry>> = {
  good: {
    general: { risk: 'Safe', recommendation: 'Ideal conditions for all outdoor activity and exercise.' },
    children: { risk: 'Safe', recommendation: 'Outdoor sport and school games can proceed as scheduled.' },
    seniors: { risk: 'Safe', recommendation: 'Morning walks and outdoor routines are safe throughout the day.' },
    asthma: { risk: 'Safe', recommendation: 'No restrictions. Carry prescribed inhaler as routine practice.' }
  },
  satisfactory: {
    general: { risk: 'Safe', recommendation: 'Normal outdoor activity is safe with no precautions required.' },
    children: { risk: 'Low', recommendation: 'Full outdoor play is fine; watch for coughing during long sessions.' },
    seniors: { risk: 'Low', recommendation: 'Prefer early morning hours for extended outdoor exertion.' },
    asthma: { risk: 'Caution', recommendation: 'Minor breathing discomfort possible. Keep reliever medication on hand.' }
  },
  moderate: {
    general: { risk: 'Low', recommendation: 'Reduce prolonged heavy exertion during afternoon peak hours.' },
    children: { risk: 'Caution', recommendation: 'Shorten outdoor sports periods and ensure frequent water breaks.' },
    seniors: { risk: 'Caution', recommendation: 'Limit outdoor time to under an hour; avoid roadside routes.' },
    asthma: { risk: 'High', recommendation: 'Avoid outdoor exercise and run indoor air purification.' }
  },
  poor: {
    general: { risk: 'Caution', recommendation: 'Limit outdoor activity and avoid strenuous exercise outdoors.' },
    children: { risk: 'High', recommendation: 'Move school activity indoors and cancel outdoor sport periods.' },
    seniors: { risk: 'High', recommendation: 'Stay indoors where possible; wear an N95 mask when travelling.' },
    asthma: { risk: 'Very High', recommendation: 'Remain indoors, use prescribed medication and monitor peak flow.' }
  },
  veryPoor: {
    general: { risk: 'High', recommendation: 'Wear an N95 mask outdoors and keep exposure brief.' },
    children: { risk: 'Very High', recommendation: 'Keep children indoors; suspend all outdoor school activity.' },
    seniors: { risk: 'Very High', recommendation: 'Avoid going outdoors. Seek care for any breathlessness.' },
    asthma: { risk: 'Emergency', recommendation: 'Stay indoors with HEPA filtration and contact your physician.' }
  },
  severe: {
    general: { risk: 'Very High', recommendation: 'Avoid outdoor exposure entirely and seal indoor spaces.' },
    children: { risk: 'Emergency', recommendation: 'Schools should close outdoor access; keep children fully indoors.' },
    seniors: { risk: 'Emergency', recommendation: 'Relocate to clean-air shelters if indoor filtration is unavailable.' },
    asthma: { risk: 'Emergency', recommendation: 'Medical emergency risk. Keep rescue medication and emergency contacts ready.' }
  }
};

export const DATA_SOURCES = [
{ id: 'aqi', label: 'AQI Source', name: 'Central Pollution Control Board (CPCB)', detail: '107 continuous ambient monitoring stations · 15-minute cadence', status: 'Connected' },
{ id: 'weather', label: 'Weather Source', name: 'Open-Meteo', detail: 'Hourly numerical weather prediction · 9 km resolution grid', status: 'Connected' },
{ id: 'forecast', label: 'Forecast Engine', name: 'Machine Learning Model', detail: 'LightGBM v4.2.1 ensemble · 42 engineered features', status: 'Serving' },
{ id: 'monitoring', label: 'Monitoring', name: 'MLflow', detail: 'Experiment tracking, model registry and drift telemetry', status: 'Healthy' }];