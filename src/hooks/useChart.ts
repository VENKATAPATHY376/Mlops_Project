import { usePlatform } from '../contexts/PlatformContext';
import { chartTheme, tooltipStyle } from '../utils/chartTheme';

export function useChart() {
  const { theme } = usePlatform();
  const t = chartTheme(theme);
  return { t, tooltip: tooltipStyle(t) };
}