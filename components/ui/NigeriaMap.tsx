"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as LMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import { STATES } from "@/lib/data";
import { Users, X } from "@phosphor-icons/react";

type StateData = (typeof STATES)[0];

const GEO_URLS = [
  "https://raw.githubusercontent.com/wmgeolab/geoBoundaries/main/releaseData/gbOpen/NGA/ADM1/geoBoundaries-NGA-ADM1.geojson",
  "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/nigeria.geojson",
];

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

function normalize(name: string) {
  return name.toLowerCase().replace(/\s+state$/i, "").trim();
}

export default function NigeriaMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LMap | null>(null);
  const [selected, setSelected] = useState<StateData | null>(null);

  useEffect(() => {
    // Guard: never init twice on the same container
    if (!containerRef.current || mapRef.current) return;

    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center: [9, 8],
        zoom: 6,
        scrollWheelZoom: false,
      });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Re-measure container after paint in case the reveal animation delayed layout
      setTimeout(() => { if (!cancelled && mapRef.current) mapRef.current.invalidateSize(); }, 300);

      // Try each GeoJSON source in order
      let geoLoaded = false;
      for (const url of GEO_URLS) {
        try {
          const res = await fetch(url);
          if (!res.ok || cancelled) continue;
          const data = await res.json();
          if (cancelled || !mapRef.current) break;

          L.geoJSON(data, {
            style: (feature) => {
              const raw = (feature?.properties?.shapeName ?? feature?.properties?.name ?? "") as string;
              const isActive = STATES.some((s) => normalize(s.name) === normalize(raw));
              return {
                fillColor: isActive ? "#16a34a" : "#d1fae5",
                fillOpacity: isActive ? 0.65 : 0.35,
                color: "#6ee7b7",
                weight: 1,
              };
            },
            onEachFeature: (feature, layer) => {
              const raw = (feature.properties?.shapeName ?? feature.properties?.name ?? "") as string;
              const match = STATES.find((s) => normalize(s.name) === normalize(raw));
              if (!match) return;
              layer.bindTooltip(match.name, { sticky: true });
              layer.on("click", () => {
                if (!cancelled) setSelected((prev) => (prev?.name === match.name ? null : match));
              });
            },
          }).addTo(map);

          geoLoaded = true;
          break;
        } catch { /* try next URL */ }
      }

      // Fallback: circle markers at state centroids
      if (!geoLoaded && !cancelled && mapRef.current) {
        STATES.forEach((state) => {
          const coords = STATE_COORDS[state.name];
          if (!coords || !mapRef.current) return;
          L.circleMarker(coords, {
            radius: 14,
            fillColor: "#16a34a",
            color: "#15803d",
            fillOpacity: 0.85,
            weight: 2,
          })
            .bindTooltip(state.name, { sticky: true })
            .on("click", () => {
              if (!cancelled) setSelected((prev) => (prev?.name === state.name ? null : state));
            })
            .addTo(map);
        });
      }
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <div
          ref={containerRef}
          className="rounded-card overflow-hidden border border-green-200 shadow-sm w-full"
          style={{ height: 500 }}
        />
        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm rounded-lg border border-green-200 p-3 text-xs flex flex-col gap-1.5 shadow-sm pointer-events-none">
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

      {/* State info panel */}
      {selected && (
        <div className="rounded-card border border-green-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="font-display font-bold text-green-900 text-lg leading-tight">
                {selected.name} State
              </p>
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
