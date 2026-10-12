import { AlertItem, Severity } from '../types/aqi';

export const ALERTS: AlertItem[] = [
{
  id: 'ALT-4821',
  type: 'High AQI Warning',
  severity: 'critical',
  cityId: 'delhi',
  title: 'Delhi AQI forecast to breach 250 within 18 hours',
  detail: 'Ensemble model projects AQI 248–262 driven by stagnant boundary-layer conditions.',
  issuedAt: '12 min ago',
  acknowledged: false
},
{
  id: 'ALT-4820',
  type: 'Pollution Spike Alert',
  severity: 'high',
  cityId: 'mumbai',
  title: 'PM2.5 spike of 34% detected in Mumbai eastern suburbs',
  detail: 'Sudden increase recorded at 4 monitoring stations over a 90-minute window.',
  issuedAt: '48 min ago',
  acknowledged: false
},
{
  id: 'ALT-4819',
  type: 'Health Risk Alert',
  severity: 'high',
  cityId: 'delhi',
  title: 'Respiratory risk elevated for sensitive groups',
  detail: 'Hospital admission risk index at 88/100.',
  issuedAt: '2 hrs ago',
  acknowledged: true
},
{
  id: 'ALT-4818',
  type: 'Weather Impact Alert',
  severity: 'medium',
  cityId: 'chennai',
  title: 'Coastal showers expected to reduce Chennai AQI',
  detail: 'Model expects 12–18 mm rainfall over the next 24 hours.',
  issuedAt: '3 hrs ago',
  acknowledged: true
},
{
  id: 'ALT-4817',
  type: 'Pollution Spike Alert',
  severity: 'medium',
  cityId: 'hyderabad',
  title: 'NO₂ concentration trending above seasonal norm',
  detail: 'Sustained 3-day increase of 11% around the ORR corridor.',
  issuedAt: '6 hrs ago',
  acknowledged: false
},
{
  id: 'ALT-4816',
  type: 'Weather Impact Alert',
  severity: 'low',
  cityId: 'bengaluru',
  title: 'Wind dispersion favourable across Bengaluru',
  detail: 'Wind speeds of 9–12 km/h expected to keep AQI Satisfactory.',
  issuedAt: '9 hrs ago',
  acknowledged: true
}];


export const SEVERITY_HEX: Record<Severity, string> = {
  low: '#22c55e',
  medium: '#facc15',
  high: '#f97316',
  critical: '#ef4444'
};