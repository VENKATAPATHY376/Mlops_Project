import { City, CityId, CitySnapshot } from '../types/aqi';

export const CITIES: City[] = [
{ id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lon: 80.2707, stations: 12, population: '11.5M' },
{ id: 'delhi', name: 'Delhi', state: 'NCT of Delhi', lat: 28.6139, lon: 77.209, stations: 38, population: '32.9M' },
{ id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', lat: 19.076, lon: 72.8777, stations: 24, population: '21.3M' },
{ id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lon: 77.5946, stations: 18, population: '13.6M' },
{ id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', lat: 17.385, lon: 78.4867, stations: 15, population: '10.5M' }];


export const SNAPSHOTS: Record<CityId, CitySnapshot> = {
  chennai: {
    cityId: 'chennai', aqi: 92, forecast24: 104, averageAqi: 97, riskScore: 38, trendPct: -4.2,
    temperature: 31.4, humidity: 74, windSpeed: 14.2, cloudCover: 46, rainfall: 2.4, pressure: 1008,
    pollutants: { pm25: 38, pm10: 82, no2: 26, so2: 9, o3: 31, co: 0.7 }, dominantPollutant: 'PM10'
  },
  delhi: {
    cityId: 'delhi', aqi: 225, forecast24: 248, averageAqi: 236, riskScore: 88, trendPct: 9.6,
    temperature: 24.8, humidity: 41, windSpeed: 6.4, cloudCover: 18, rainfall: 0, pressure: 1014,
    pollutants: { pm25: 138, pm10: 264, no2: 61, so2: 18, o3: 44, co: 1.9 }, dominantPollutant: 'PM2.5'
  },
  mumbai: {
    cityId: 'mumbai', aqi: 128, forecast24: 121, averageAqi: 134, riskScore: 56, trendPct: -2.8,
    temperature: 29.9, humidity: 68, windSpeed: 11.8, cloudCover: 38, rainfall: 0.6, pressure: 1010,
    pollutants: { pm25: 61, pm10: 132, no2: 42, so2: 13, o3: 36, co: 1.1 }, dominantPollutant: 'PM2.5'
  },
  bengaluru: {
    cityId: 'bengaluru', aqi: 75, forecast24: 81, averageAqi: 79, riskScore: 27, trendPct: -6.1,
    temperature: 26.2, humidity: 61, windSpeed: 9.6, cloudCover: 52, rainfall: 1.2, pressure: 1012,
    pollutants: { pm25: 29, pm10: 68, no2: 22, so2: 7, o3: 28, co: 0.6 }, dominantPollutant: 'PM10'
  },
  hyderabad: {
    cityId: 'hyderabad', aqi: 108, forecast24: 115, averageAqi: 112, riskScore: 47, trendPct: 3.4,
    temperature: 28.6, humidity: 52, windSpeed: 10.4, cloudCover: 29, rainfall: 0.2, pressure: 1011,
    pollutants: { pm25: 48, pm10: 104, no2: 33, so2: 11, o3: 33, co: 0.9 }, dominantPollutant: 'PM2.5'
  }
};

export function getCity(id: CityId): City {
  return CITIES.find((c) => c.id === id) ?? CITIES[0];
}