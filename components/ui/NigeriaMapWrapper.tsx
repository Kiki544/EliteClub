"use client";

import dynamic from "next/dynamic";

const NigeriaMap = dynamic(() => import("./NigeriaMap"), {
  ssr: false,
  loading: () => (
    <div className="rounded-card bg-green-50 border border-green-200 h-96 flex items-center justify-center">
      <p className="text-green-500 text-sm animate-pulse">Loading map…</p>
    </div>
  ),
});

export default function NigeriaMapWrapper() {
  return <NigeriaMap />;
}
