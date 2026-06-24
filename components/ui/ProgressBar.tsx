"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface Props {
  label: string;
  achieved: number;
  target: number;
  unit?: string;
}

export default function ProgressBar({ label, achieved, target, unit = "" }: Props) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const pct = Math.round((achieved / target) * 100);
  const color = pct >= 80 ? "#2e7d52" : pct >= 50 ? "#c9a84c" : "#e05c3a";

  useEffect(() => {
    if (reduce) {
      setWidth(pct);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setTimeout(() => setWidth(pct), 150);
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [pct, reduce]);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text-primary">{label}</span>
        <span className="text-sm font-semibold" style={{ color }}>
          {achieved}{unit} / {target}{unit} ({pct}%)
        </span>
      </div>
      <div className="h-2 bg-green-100 rounded-pill overflow-hidden">
        <div
          className="h-full rounded-pill transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
