import {
  ActivityIcon,
  BellRingIcon,
  BrainIcon,
  CloudSunIcon,
  FileTextIcon,
  GaugeIcon,
  HeartPulseIcon,
  LayoutDashboardIcon,
  LineChartIcon,
  ServerCogIcon,
  SplitSquareHorizontalIcon } from
'lucide-react';

export interface NavItem {
  to: string;
  label: string;
  icon: typeof GaugeIcon;
  group: 'Monitoring' | 'Intelligence' | 'Operations';
}

export const NAV_ITEMS: NavItem[] = [
{ to: '/', label: 'Dashboard', icon: LayoutDashboardIcon, group: 'Monitoring' },
{ to: '/comparison', label: 'City Comparison', icon: SplitSquareHorizontalIcon, group: 'Monitoring' },
{ to: '/forecast', label: 'AQI Forecast', icon: LineChartIcon, group: 'Monitoring' },
{ to: '/weather', label: 'Weather Analysis', icon: CloudSunIcon, group: 'Monitoring' },
{ to: '/alerts', label: 'Alerts & Advisories', icon: BellRingIcon, group: 'Monitoring' },
{ to: '/health-advisory', label: 'Health Advisory', icon: HeartPulseIcon, group: 'Monitoring' },
{ to: '/insights', label: 'AI Insights', icon: BrainIcon, group: 'Intelligence' },
{ to: '/explainable-ai', label: 'Explainable AI', icon: ActivityIcon, group: 'Intelligence' },
{ to: '/model-performance', label: 'Model Performance', icon: GaugeIcon, group: 'Intelligence' },
{ to: '/mlops', label: 'MLOps Monitoring', icon: ServerCogIcon, group: 'Operations' },
{ to: '/reports', label: 'Reports', icon: FileTextIcon, group: 'Operations' }];


export const NAV_GROUPS: NavItem['group'][] = ['Monitoring', 'Intelligence', 'Operations'];