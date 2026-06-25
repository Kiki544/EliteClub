"use client";

import { useEffect, useState } from "react";
import { STATES } from "@/lib/data";
import { Users, X } from "@phosphor-icons/react";

type StateData = (typeof STATES)[0];

type GeoFeature = {
  properties: Record<string, unknown>;
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
};

const GEO_URLS = [
  "https://raw.githubusercontent.com/wmgeolab/geoBoundaries/main/releaseData/gbOpen/NGA/ADM1/geoBoundaries-NGA-ADM1.geojson",
  "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/nigeria.geojson",
];

// Nigeria bounding box (degrees)
const LON_MIN = 2.668, LON_MAX = 14.680;
const LAT_MIN = 4.272, LAT_MAX = 13.892;
const W = 800, H = 620, PAD = 14;

function project(lon: number, lat: number): [number, number] {
  const x = PAD + ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * (W - 2 * PAD);
  const y = PAD + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * (H - 2 * PAD);
  return [x, y];
}

function toPath(geometry: GeoFeature["geometry"]): string {
  const ringToD = (ring: number[][]) =>
    ring
      .map(([lon, lat], i) => {
        const [x, y] = project(lon, lat);
        return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join("") + "Z";

  if (geometry.type === "Polygon") {
    return (geometry.coordinates as number[][][]).map(ringToD).join(" ");
  }
  return (geometry.coordinates as number[][][][])
    .flatMap((poly) => poly.map(ringToD))
    .join(" ");
}

function normalize(name: string) {
  return name.toLowerCase().replace(/\s+state$/i, "").trim();
}

function getStateName(props: Record<string, unknown>): string {
  const keys = ["shapeName", "name", "NAME_1", "admin1Name", "State", "STATE", "ADM1_EN"];
  for (const k of keys) {
    if (typeof props[k] === "string" && props[k]) return props[k] as string;
  }
  return "";
}

export default function NigeriaMap() {
  const [features, setFeatures] = useState<GeoFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<StateData | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const url of GEO_URLS) {
        try {
          const res = await fetch(url);
          if (!res.ok || cancelled) continue;
          const data = await res.json();
          if (!cancelled) {
            setFeatures(data.features ?? []);
            setLoading(false);
          }
          return;
        } catch {
          /* try next URL */
        }
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const hoveredName =
    hovered
      ? (STATES.find((s) => normalize(s.name) === normalize(hovered))?.name ?? hovered)
      : null;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative rounded-card overflow-hidden border border-green-200 shadow-sm bg-[#e8f5ee]">
        {loading ? (
          <div className="flex items-center justify-center h-[480px]">
            <div className="flex flex-col items-center gap-3">
              <div className="w-7 h-7 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-green-700 text-sm">Loading map…</p>
            </div>
          </div>
        ) : features.length === 0 ? (
          <div className="flex items-center justify-center h-[480px] text-green-600 text-sm">
            Map data unavailable
          </div>
        ) : (
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full block"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }}
            onMouseLeave={() => {
              setHovered(null);
              setMousePos(null);
            }}
          >
            {features.map((feat, i) => {
              const raw = getStateName(feat.properties);
              const match = STATES.find((s) => normalize(s.name) === normalize(raw));
              const isActive = !!match;
              const isHovered = hovered === raw;
              const isSelected = !!match && selected?.name === match.name;

              return (
                <path
                  key={i}
                  d={toPath(feat.geometry)}
                  fill={
                    isSelected
                      ? "#15803d"
                      : isActive
                      ? isHovered
                        ? "#16a34a"
                        : "#4ade80"
                      : isHovered
                      ? "#bbf7d0"
                      : "#d1fae5"
                  }
                  stroke="#16a34a"
                  strokeWidth={isSelected ? 2 : 0.6}
                  strokeLinejoin="round"
                  style={{ cursor: isActive ? "pointer" : "default", transition: "fill 0.1s" }}
                  onMouseEnter={() => setHovered(raw)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => {
                    if (!match) return;
                    setSelected((prev) => (prev?.name === match.name ? null : match));
                  }}
                />
              );
            })}
          </svg>
        )}

        {/* Hover tooltip */}
        {hovered && mousePos && hoveredName && (
          <div
            className="absolute pointer-events-none z-10 bg-green-900/90 text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow-lg"
            style={{ left: mousePos.x + 14, top: mousePos.y - 10 }}
          >
            {hoveredName}
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg border border-green-200 p-3 text-xs flex flex-col gap-1.5 shadow-sm pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-sm bg-green-400 border border-green-600 flex-shrink-0" />
            <span className="text-green-800 font-medium">Active programme state</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-sm bg-green-100 border border-green-400 flex-shrink-0" />
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
