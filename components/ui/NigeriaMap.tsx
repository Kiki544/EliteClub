"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup } from "react-leaflet";
import type { PathOptions, Layer } from "leaflet";
import L from "leaflet";
import type { Feature } from "geojson";
import "leaflet/dist/leaflet.css";
import { STATES } from "@/lib/data";
import { Users, X } from "@phosphor-icons/react";

// Try geoBoundaries first, fall back to click_that_hood
const GEO_URLS = [
  "https://raw.githubusercontent.com/wmgeolab/geoBoundaries/main/releaseData/gbOpen/NGA/ADM1/geoBoundaries-NGA-ADM1.geojson",
  "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/nigeria.geojson",
];

// Centroid fallbacks [lat, lng] used when GeoJSON cannot load
const STATE_COORDS: Record<string, [number, number]> = {
  Lagos: [6.5244, 3.3792],
  Kwara: [8.4966, 4.5418],
  Ogun: [7.1475, 3.3503],
  Kano: [12.0022, 8.5167],
  Enugu: [6.4584, 7.4951],
  Benue: [7.7322, 8.5338],
  Ondo: [7.2526, 5.2103],
  Sokoto: [13.0596, 5.2338],
};

type StateData = (typeof STATES)[0];

function normalize(name: string) {
  return name.toLowerCase().replace(/\s+state$/i, "").trim();
}

export default function NigeriaMap() {
  const [geoData, setGeoData] = useState<object | null>(null);
  const [useMarkers, setUseMarkers] = useState(false);
  const [selected, setSelected] = useState<StateData | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      for (const url of GEO_URLS) {
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const data = await res.json();
          if (!cancelled) { setGeoData(data); return; }
        } catch { /* try next */ }
      }
      if (!cancelled) setUseMarkers(true);
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const activeNames = new Set(STATES.map((s) => normalize(s.name)));

  function styleFeature(feature?: Feature): PathOptions {
    const raw = (feature?.properties?.shapeName ?? feature?.properties?.name ?? "") as string;
    const isActive = activeNames.has(normalize(raw));
    return {
      fillColor: isActive ? "#16a34a" : "#d1fae5",
      fillOpacity: isActive ? 0.65 : 0.35,
      color: "#6ee7b7",
      weight: 1,
    };
  }

  function onEachFeature(feature: Feature, layer: Layer) {
    const raw = (feature.properties?.shapeName ?? feature.properties?.name ?? "") as string;
    const match = STATES.find((s) => normalize(s.name) === normalize(raw));
    if (!match) return;
    (layer as L.Path).bindTooltip(match.name, { sticky: true, direction: "top" });
    layer.on("click", () =>
      setSelected((prev) => (prev?.name === match.name ? null : match))
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Map */}
      <div className="relative rounded-card overflow-hidden border border-green-200 shadow-sm" style={{ height: 500 }}>
        <MapContainer
          center={[9, 8]}
          zoom={6}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {geoData && (
            <GeoJSON
              key="nga-states"
              data={geoData as never}
              style={styleFeature}
              onEachFeature={onEachFeature}
            />
          )}

          {useMarkers &&
            STATES.map((state) => {
              const coords = STATE_COORDS[state.name];
              if (!coords) return null;
              return (
                <CircleMarker
                  key={state.name}
                  center={coords}
                  radius={14}
                  pathOptions={{ fillColor: "#16a34a", color: "#15803d", fillOpacity: 0.85, weight: 2 }}
                  eventHandlers={{ click: () => setSelected((p) => (p?.name === state.name ? null : state)) }}
                >
                  <Popup><strong>{state.name} State</strong></Popup>
                </CircleMarker>
              );
            })}
        </MapContainer>

        {/* Loading overlay */}
        {!geoData && !useMarkers && (
          <div className="absolute inset-0 bg-green-50/80 flex items-center justify-center z-[1000] pointer-events-none">
            <p className="text-green-600 text-sm animate-pulse">Loading Nigeria map…</p>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-8 left-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-lg border border-green-200 p-3 text-xs flex flex-col gap-1.5 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-sm bg-green-600 border border-green-400 flex-shrink-0" />
            <span className="text-green-800 font-medium">Active programme state</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-sm bg-green-100 border border-green-300 flex-shrink-0" />
            <span className="text-green-600">Not yet active</span>
          </div>
        </div>
      </div>

      {/* State info panel (shown below map on click) */}
      {selected && (
        <div className="rounded-card border border-green-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="font-display font-bold text-green-900 text-lg leading-tight">{selected.name} State</p>
              <p className="text-green-500 text-xs mt-0.5">Rep: {selected.representative}</p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="p-1 rounded-full hover:bg-green-50 text-green-400 hover:text-green-700 transition-colors flex-shrink-0"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex items-center gap-2 mb-3 p-3 rounded-lg bg-green-50 border border-green-100 w-fit">
            <Users size={15} className="text-green-600" />
            <span className="font-semibold text-green-800 text-sm">
              {selected.beneficiaries.toLocaleString()} beneficiaries
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {selected.programmes.map((p) => (
              <span key={p} className="px-2.5 py-0.5 rounded-pill bg-green-700 text-white text-xs font-semibold">
                {p}
              </span>
            ))}
          </div>
          <p className="text-text-muted text-sm leading-relaxed">{selected.summary}</p>
        </div>
      )}
    </div>
  );
}
