"use client";

import { useReducedMotion } from "motion/react";

export type Partner = {
  name: string;
  abbr: string;
  color: string;
  logoUrl?: string;
};

// Replace logoUrl with a real image path once logos are supplied.
// abbr and color are the fallback monogram treatment.
export const PARTNERS: Partner[] = [
  { name: "UNICEF Nigeria",                    abbr: "UNICEF",  color: "#009EDB" },
  { name: "State Ministry of Education",       abbr: "SMOE",    color: "#1a5c34" },
  { name: "State Ministry of Water Resources", abbr: "SMWR",    color: "#2c7bb6" },
  { name: "Corporate Affairs Commission",      abbr: "CAC",     color: "#5b21b6" },
  { name: "USAID Nigeria",                     abbr: "USAID",   color: "#002868" },
  { name: "Access Bank Foundation",            abbr: "ABF",     color: "#c8102e" },
  { name: "World Bank Group",                  abbr: "WBG",     color: "#009688" },
  { name: "European Union",                    abbr: "EU",      color: "#003399" },
  { name: "Action Aid Nigeria",                abbr: "AA",      color: "#e63946" },
  { name: "Federal Ministry of Health",        abbr: "FMH",     color: "#0d7c43" },
];

function LogoCard({ partner }: { partner: Partner }) {
  return (
    <div className="group flex-shrink-0 flex flex-col items-center justify-center gap-2 w-[160px] h-[80px] px-5 rounded-card border border-gray-200 bg-white cursor-default select-none transition-all duration-300 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:border-gray-300 hover:shadow-md">
      {partner.logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={partner.logoUrl}
          alt={partner.name}
          className="max-h-10 max-w-[120px] object-contain"
        />
      ) : (
        <>
          <span
            className="font-display font-bold text-sm tracking-widest leading-none"
            style={{ color: partner.color }}
          >
            {partner.abbr}
          </span>
          <span className="text-[10px] text-gray-400 font-medium text-center leading-tight max-w-[120px] truncate">
            {partner.name}
          </span>
        </>
      )}
    </div>
  );
}

export default function PartnerMarquee({ partners = PARTNERS }: { partners?: Partner[] }) {
  const reduce = useReducedMotion();

  // Reduced motion: static wrap instead of scrolling track
  if (reduce) {
    return (
      <div className="flex flex-wrap justify-center items-center gap-4">
        {partners.map((p) => (
          <LogoCard key={p.name} partner={p} />
        ))}
      </div>
    );
  }

  const doubled = [...partners, ...partners];

  return (
    <div
      className="overflow-hidden relative"
      // Fade edges with gradient masks
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        className="flex gap-5 w-max"
        style={{
          animation: "marquee 32s linear infinite",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "running")}
      >
        {doubled.map((partner, i) => (
          <LogoCard key={`${partner.name}-${i}`} partner={partner} />
        ))}
      </div>
    </div>
  );
}
