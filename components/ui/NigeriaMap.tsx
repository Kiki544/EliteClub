"use client";

import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { STATES } from "@/lib/data";
import { Users, X, MapPin } from "@phosphor-icons/react";

const GEO_URL =
  "https://raw.githubusercontent.com/wmgeolab/geoBoundaries/main/releaseData/gbOpen/NGA/ADM1/geoBoundaries-NGA-ADM1.geojson";

type StateData = (typeof STATES)[0];

function normalize(name: string) {
  return name.toLowerCase().replace(/\s+state$/i, "").trim();
}

export default function NigeriaMap() {
  const [selected, setSelected] = useState<StateData | null>(null);
  const [mapError, setMapError] = useState(false);

  if (mapError) {
    return (
      <div className="rounded-card bg-green-50 border-2 border-dashed border-green-300 h-96 flex flex-col items-center justify-center text-center p-8">
        <MapPin size={48} className="text-green-400 mb-4" weight="duotone" />
        <p className="font-display font-bold text-green-700 text-xl mb-2">Map unavailable</p>
        <p className="text-text-muted text-sm max-w-[40ch]">
          Could not load map data. Check the state cards below for programme details per state.
        </p>
      </div>
    );
  }

  return (
    <div className="relative rounded-card overflow-hidden border border-green-200 bg-green-50 min-h-[420px]">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 2100, center: [8, 9] }}
        width={960}
        height={600}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies
          geography={GEO_URL}
          onError={() => setMapError(true)}
        >
          {({ geographies }) =>
            geographies.map((geo) => {
              const rawName: string =
                geo.properties.shapeName ||
                geo.properties.NAME_1 ||
                geo.properties.name ||
                "";
              const match = STATES.find(
                (s) => normalize(s.name) === normalize(rawName)
              );
              const isActive = Boolean(match);
              const isSelected = Boolean(selected && match && selected.name === match.name);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    if (match) setSelected(isSelected ? null : match);
                  }}
                  tabIndex={isActive ? 0 : -1}
                  aria-label={
                    isActive ? `${match?.name} State – click for details` : undefined
                  }
                  style={{
                    default: {
                      fill: isSelected ? "#15803d" : isActive ? "#4ade80" : "#d1fae5",
                      stroke: "#6ee7b7",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                    hover: {
                      fill: isActive ? "#16a34a" : "#a7f3d0",
                      stroke: "#34d399",
                      strokeWidth: 0.5,
                      outline: "none",
                      cursor: isActive ? "pointer" : "default",
                    },
                    pressed: {
                      fill: isActive ? "#15803d" : "#bbf7d0",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg border border-green-200 p-3 text-xs flex flex-col gap-1.5 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-sm bg-[#4ade80] border border-[#6ee7b7] flex-shrink-0" />
          <span className="text-green-800 font-medium">Active programme state</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-sm bg-[#d1fae5] border border-[#6ee7b7] flex-shrink-0" />
          <span className="text-green-600">Not yet active</span>
        </div>
      </div>

      {/* Info panel */}
      {selected && (
        <div className="absolute inset-x-0 bottom-0 md:inset-x-auto md:right-4 md:top-4 md:bottom-4 md:w-72 bg-white rounded-t-2xl md:rounded-card shadow-xl border border-green-100 p-5 overflow-y-auto z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-display font-bold text-green-900 text-lg leading-tight">
                {selected.name} State
              </p>
              <p className="text-green-500 text-xs mt-0.5">Rep: {selected.representative}</p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="p-1 rounded-full hover:bg-green-50 text-green-400 hover:text-green-700 transition-colors"
              aria-label="Close panel"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-green-50 border border-green-100">
            <Users size={16} className="text-green-600 flex-shrink-0" />
            <span className="font-semibold text-green-800 text-sm">
              {selected.beneficiaries.toLocaleString()} beneficiaries
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {selected.programmes.map((p) => (
              <span
                key={p}
                className="px-2.5 py-0.5 rounded-pill bg-green-700 text-white text-xs font-semibold"
              >
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
