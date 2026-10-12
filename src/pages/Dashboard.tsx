import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ActivityIcon,
  CloudIcon,
  DropletsIcon,
  GaugeIcon,
  RadioIcon,
  ShieldAlertIcon,
  ThermometerIcon,
  TrendingUpIcon,
  WindIcon } from
'lucide-react';
import { usePlatform } from '../contexts/PlatformContext';
import { KpiCard, KpiCardProps } from '../components/ui/KpiCard';
import { KpiSkeleton, ChartSkeleton } from '../components/ui/Skeleton';
import { Panel } from '../components/ui/Panel';
import { SegmentedControl } from '../components/ui/SegmentedControl';
import { TrendPill } from '../components/ui/Pill';
import { CityOverviewCards } from '../components/aqi/CityOverviewCards';
import { AqiTrendChart } from '../components/charts/AqiTrendChart';
import { IndiaMap } from '../components/aqi/IndiaMap';
import { AqiLegend } from '../components/aqi/AqiLegend';
import { AqiGauge } from '../components/aqi/AqiGauge';
import { ExecutiveSummary } from '../components/aqi/ExecutiveSummary';
import { CityRankings } from '../components/aqi/CityRankings';
import { HealthAdvisoryPanel } from '../components/aqi/HealthAdvisoryPanel';
import { DataSources } from '../components/aqi/DataSources';
import { aqiSeries, RANGES } from '../data/series';
import { RangeKey } from '../types/aqi';
import { getCategory, riskLabel } from '../utils/aqi';

export function Dashboard() {
  const { city, snapshot, loading } = usePlatform();
  const [range, setRange] = useState<RangeKey>('24h');
  const category = getCategory(snapshot.aqi);
  const series = aqiSeries(city.id, range);
  const delta = snapshot.forecast24 - snapshot.aqi;

  const kpis: Omit<KpiCardProps, 'index'>[] = [
  {
    label: 'Current AQI',
    value: String(snapshot.aqi),
    caption: `${category.label} · ${snapshot.dominantPollutant} dominant`,
    icon: <GaugeIcon className="h-4 w-4" />,
    accentHex: category.hex,
    emphasis: true
  },
  {
    label: 'Predicted AQI · 24h',
    value: String(snapshot.forecast24),
    caption: `${delta > 0 ? 'Deterioration' : 'Improvement'} of ${Math.abs(delta)} points expected`,
    icon: <TrendingUpIcon className="h-4 w-4" />,
    accentHex: getCategory(snapshot.forecast24).hex,
    emphasis: true
  },
  {
    label: 'Pollution Risk Score',
    value: String(snapshot.riskScore),
    unit: '/100',
    caption: `${riskLabel(snapshot.riskScore)} · population exposure weighted`,
    icon: <ShieldAlertIcon className="h-4 w-4" />,
    accentHex: snapshot.riskScore > 70 ? '#ef4444' : snapshot.riskScore > 45 ? '#f97316' : '#22c55e',
    emphasis: true
  },
  {
    label: 'Air Quality Status',
    value: category.label,
    caption: `${city.stations} stations reporting · updated 4 min ago`,
    icon: <ActivityIcon className="h-4 w-4" />,
    accentHex: category.hex
  },
  {
    label: 'Temperature',
    value: snapshot.temperature.toFixed(1),
    unit: '°C',
    caption: `Feels like ${(snapshot.temperature + 2.1).toFixed(1)}°C`,
    icon: <ThermometerIcon className="h-4 w-4" />
  },
  {
    label: 'Humidity',
    value: String(snapshot.humidity),
    unit: '%',
    caption: 'Relative humidity at surface level',
    icon: <DropletsIcon className="h-4 w-4" />
  },
  {
    label: 'Wind Speed',
    value: snapshot.windSpeed.toFixed(1),
    unit: 'km/h',
    caption: snapshot.windSpeed > 10 ? 'Favourable dispersion' : 'Weak dispersion, pollutants trapped',
    icon: <WindIcon className="h-4 w-4" />
  },
  {
    label: 'Cloud Cover',
    value: String(snapshot.cloudCover),
    unit: '%',
    caption: `Rainfall ${snapshot.rainfall} mm · pressure ${snapshot.pressure} hPa`,
    icon: <CloudIcon className="h-4 w-4" />
  }];


  return (
    <>
      <section
        className="relative overflow-hidden rounded-3xl border border-line/70 bg-surface/60 p-6 backdrop-blur-xl sm:p-8"
        aria-labelledby="dashboard-title">
        
        <span
          className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
          style={{ background: category.hex, opacity: 0.7 }}
          aria-hidden="true" />
        
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-xs font-medium text-accent">
              <RadioIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Live · {city.name}, {city.state}
            </p>
            <h1
              id="dashboard-title"
              className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-[2.6rem] sm:leading-[1.1]">
              
              Multi-City Air Quality Intelligence Center
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              AI-powered Air Quality Forecasting, Monitoring and Environmental Analytics across 5 metropolitan
              regions and 107 continuous ambient monitoring stations.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="w-full max-w-[300px]">
            
            <AqiGauge value={snapshot.aqi} forecast={snapshot.forecast24} size={252} label={`${city.name} live index`} />
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-[11px] text-muted">Week-over-week</span>
              <TrendPill value={snapshot.trendPct} />
            </div>
          </motion.div>
        </div>
      </section>

      <section aria-label="Key indicators">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {loading ?
          Array.from({ length: 8 }).map((_, i) => <KpiSkeleton key={i} />) :
          kpis.map((kpi, i) => <KpiCard key={kpi.label} {...kpi} index={i} />)}
        </div>
      </section>

      <section aria-label="City overview" className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-ink">City overview</h2>
          <AqiLegend compact />
        </div>
        <CityOverviewCards />
      </section>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Panel
          title={`AQI trend · ${city.name}`}
          subtitle="Observed index with period average reference"
          className="xl:col-span-2"
          actions={
          <SegmentedControl
            label="Trend range"
            value={range}
            onChange={setRange}
            options={RANGES.map((r) => ({ key: r.key, label: r.label }))} />

          }>
          
          {loading ? <ChartSkeleton height={300} /> : <AqiTrendChart data={series} height={300} />}
        </Panel>

        <Panel
          title="India air quality map"
          subtitle="Hover a marker for detail · click to focus the dashboard"
          actions={<span className="text-[11px] text-muted">5 cities</span>}>
          
          <IndiaMap height={300} />
          <div className="mt-4">
            <AqiLegend />
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ExecutiveSummary />
        </div>
        <HealthAdvisoryPanel aqi={snapshot.aqi} cityName={city.name} />
      </div>

      <section aria-label="City rankings" className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-ink">City rankings</h2>
          <p className="text-[11px] text-muted">Ranked on the live index across all monitored cities</p>
        </div>
        <CityRankings />
      </section>

      <DataSources />
    </>);

}