import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const CORP_COLORS = {
  'Bengaluru Central': '#f97316',
  'Bengaluru East':    '#06b6d4',
  'Bengaluru West':    '#a855f7',
  'Bengaluru North':   '#22c55e',
  'Bengaluru South':   '#f43f5e',
};

const LEGEND = Object.entries(CORP_COLORS);

function FlyController({ flyTo }) {
  const map = useMap();
  const prev = useRef(null);
  useEffect(() => {
    if (!flyTo) return;
    const key = `${flyTo.lat},${flyTo.lng}`;
    if (prev.current === key) return;
    prev.current = key;
    map.flyTo([flyTo.lat, flyTo.lng], 14, { duration: 1.2 });
  }, [flyTo, map]);
  return null;
}

export default function MapView({ areas, selected, flyTo, onMarkerClick }) {
  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[12.9716, 77.5946]}
        zoom={11}
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution="&copy; OpenStreetMap &copy; CartoDB"
        />
        <FlyController flyTo={flyTo} />

        {areas.map((area) => {
          const color = CORP_COLORS[area.corporation] || '#888';
          const isSelected = selected && selected.pincode === area.pincode;
          return (
            <CircleMarker
              key={area.pincode}
              center={[area.lat, area.lng]}
              radius={isSelected ? 14 : 8}
              pathOptions={{
                color,
                fillColor: color,
                fillOpacity: isSelected ? 0.95 : 0.75,
                weight: isSelected ? 3 : 1.5,
                opacity: 1,
              }}
              eventHandlers={{ click: () => onMarkerClick(area) }}
            >
              <Popup>
                <div className="flex items-start gap-2.5 min-w-[160px]">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-0.5"
                    style={{ background: color }}
                  />
                  <div>
                    <div className="font-syne font-bold text-sm text-[#e8eaf0] mb-0.5">{area.area}</div>
                    <div className="font-mono text-[13px] text-orange-400 mb-0.5">{area.pincode}</div>
                    <div className="text-[11px] text-[#8892a4]">{area.corporation}</div>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-7 left-4 z-[700] bg-[#111827]/90 border border-white/10 rounded-xl px-3.5 py-3 backdrop-blur-md min-w-[160px]">
        <div className="font-syne text-[10px] font-bold tracking-[0.12em] uppercase text-[#8892a4] mb-2">
          Corporations
        </div>
        {LEGEND.map(([name, color]) => (
          <div key={name} className="flex items-center gap-2 mb-1.5 last:mb-0">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: color, boxShadow: `0 0 6px ${color}` }}
            />
            <span className="text-xs text-[#c4cdd8] font-sans">
              {name.replace('Bengaluru ', '')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
