"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface StatCounterProps {
  endValue: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
  description?: string;
}

export default function StatCounter({
  endValue,
  suffix = "",
  prefix = "",
  duration = 2000,
  label,
  description,
}: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const increment = endValue / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, endValue, duration]);

  return (
    <div ref={ref} className="glass-dark rounded-2xl p-6 border border-white/10 hover:border-[#FF6467]/40 transition-all group">
      <div className="flex items-baseline gap-1">
        {prefix && <span className="text-2xl font-bold text-gray-300">{prefix}</span>}
        <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight group-hover:text-gradient-pamtech transition-colors">
          {count.toLocaleString()}
        </span>
        {suffix && <span className="text-3xl font-extrabold text-[#FF6467]">{suffix}</span>}
      </div>
      <h4 className="font-bold text-base text-gray-200 mt-2">{label}</h4>
      {description && (
        <p className="text-xs text-gray-400 mt-1 leading-relaxed line-clamp-2">
          {description}
        </p>
      )}
    </div>
  );
}
