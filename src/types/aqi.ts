export type CityId = 'chennai' | 'delhi' | 'mumbai' | 'bengaluru' | 'hyderabad';

export interface City {
  id: CityId;
  name: string;
  state: string;
  lat: number;
  lon: number;
  stations: number;
  population: string;
}

export type AqiCategoryKey = 'good' | 'satisfactory' | 'moderate' | 'poor' | 'veryPoor' | 'severe';

export interface AqiCategory {
  key: AqiCategoryKey;
  label: string;
  min: number;
  max: number;
  hex: string;
  healthImpact: string;
  advice: string[];
}

export interface CitySnapshot {
  cityId: CityId;
  aqi: number;
  forecast24: number;
  averageAqi: number;
  riskScore: number;
  trendPct: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  cloudCover: number;
  rainfall: number;
  pressure: number;
  pollutants: {pm25: number;pm10: number;no2: number;so2: number;o3: number;co: number;};
  dominantPollutant: string;
}

export interface SeriesPoint {
  label: string;
  aqi: number;
}

export type Severity = 'low' | 'medium' | 'high' | 'critical';

export interface AlertItem {
  id: string;
  type: 'High AQI Warning' | 'Pollution Spike Alert' | 'Weather Impact Alert' | 'Health Risk Alert';
  severity: Severity;
  cityId: CityId;
  title: string;
  detail: string;
  issuedAt: string;
  acknowledged: boolean;
}

export type RangeKey = '24h' | '7d' | '30d' | '6m' | '1y';

export type ThemeMode = 'dark' | 'light';