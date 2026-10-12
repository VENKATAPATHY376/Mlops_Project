import React from 'react';
import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { SeriesPoint } from '../../types/aqi';
import { useChart } from '../../hooks/useChart';
import { aqiHex } from '../../utils/aqi';

export function AqiTrendChart({ data, height = 300 }: {data: SeriesPoint[];height?: number;}) {
  const { t, tooltip } = useChart();
  const latest = data[data.length - 1]?.aqi ?? 0;
  const stroke = aqiHex(latest);
  const average = Math.round(data.reduce((sum, d) => sum + d.aqi, 0) / Math.max(data.length, 1));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 6, right: 8, bottom: 0, left: -18 }}>
        <CartesianGrid stroke={t.grid} strokeDasharray="3 4" vertical={false} />
        <XAxis dataKey="label" tick={{ fill: t.axis, fontSize: 11 }} stroke={t.grid} interval="preserveStartEnd" minTickGap={18} />
        <YAxis tick={{ fill: t.axis, fontSize: 11 }} stroke={t.grid} width={46} />
        <Tooltip {...tooltip} />
        <ReferenceLine
          y={average}
          stroke={t.axis}
          strokeDasharray="4 4"
          label={{ value: `Avg ${average}`, fill: t.axis, fontSize: 10, position: 'insideTopRight' }} />
        
        <Area
          type="monotone"
          dataKey="aqi"
          name="AQI"
          stroke={stroke}
          strokeWidth={2}
          fill={stroke}
          fillOpacity={0.12}
          dot={false}
          activeDot={{ r: 4, strokeWidth: 0, fill: stroke }} />
        
      </AreaChart>
    </ResponsiveContainer>);

}