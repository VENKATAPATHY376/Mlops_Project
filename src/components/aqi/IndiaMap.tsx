import React, { useEffect } from 'react';
import { CircleMarker, MapContainer, Popup, TileLayer, Tooltip, useMap } from 'react-leaflet';
import { CITIES, SNAPSHOTS, getCity } from '../../data/cities';
import { usePlatform } from '../../contexts/PlatformContext';
import { getCategory } from '../../utils/aqi';

const DARK_TILES = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const LIGHT_TILES = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

/** Eases the viewport to the active city so switching cities reads as one continuous motion. */
function FlyToCity({ lat, lon }: {lat: number;lon: number;}) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lon], 5.4, { duration: 0.9, easeLinearity: 0.24 });
  }, [lat, lon, map]);
  return null;
}

export function IndiaMap({ height = 420 }: {height?: number;}) {
  const { theme, cityId, setCityId } = usePlatform();
  const active = getCity(cityId);

  return (
    <div className="relative z-0 overflow-hidden rounded-xl border border-line/70" style={{ height }}>
      <MapContainer
        key={theme}
        center={[21.6, 79]}
        zoom={4}
        minZoom={3}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}>
        
        <TileLayer url={theme === 'dark' ? DARK_TILES : LIGHT_TILES} attribution="&copy; OpenStreetMap &copy; CARTO" />
        <FlyToCity lat={active.lat} lon={active.lon} />
        {CITIES.map((city) => {
          const snap = SNAPSHOTS[city.id];
          const cat = getCategory(snap.aqi);
          const selected = city.id === cityId;
          return (
            <React.Fragment key={city.id}>
              <CircleMarker
                center={[city.lat, city.lon]}
                radius={selected ? 22 : 16}
                pathOptions={{ color: cat.hex, fillColor: cat.hex, fillOpacity: 0.14, weight: selected ? 2 : 1 }} />
              
              <CircleMarker
                center={[city.lat, city.lon]}
                radius={selected ? 9 : 7}
                pathOptions={{ color: cat.hex, fillColor: cat.hex, fillOpacity: 0.95, weight: 2 }}
                eventHandlers={{ click: () => setCityId(city.id) }}>
                
                <Tooltip direction="top" offset={[0, -8]} opacity={1}>
                  <span style={{ fontSize: 11, lineHeight: 1.5, display: 'block' }}>
                    <strong style={{ fontSize: 12 }}>{city.name}</strong>
                    <br />
                    AQI <strong style={{ color: cat.hex }}>{snap.aqi}</strong>
                    <br />
                    <span style={{ opacity: 0.75 }}>{cat.label}</span>
                  </span>
                </Tooltip>
                <Popup>
                  <div style={{ minWidth: 168 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{city.name}</p>
                    <p style={{ fontSize: 11, opacity: 0.7, margin: '2px 0 8px' }}>
                      {city.state} · {city.stations} stations
                    </p>
                    <p style={{ fontSize: 22, fontWeight: 700, color: cat.hex, margin: 0 }}>
                      {snap.aqi}
                      <span style={{ fontSize: 11, fontWeight: 500, marginLeft: 6 }}>{cat.label}</span>
                    </p>
                    <p style={{ fontSize: 11, opacity: 0.75, margin: '6px 0 0' }}>
                      24h forecast {snap.forecast24} · {snap.dominantPollutant} dominant
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            </React.Fragment>);

        })}
      </MapContainer>
    </div>);

}