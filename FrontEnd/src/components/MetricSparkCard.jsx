// FrontEnd/src/components/MetricSparkCard.jsx
import React from 'react';

export default function MetricSparkCard({ title, values = [], isAlert = false, onClick }) {
  const width = 140;
  const height = 40;
  const padding = 5;

  const min = Math.min(...values, 0);
  const max = Math.max(...values, 10);

  const getY = (val) => {
    if (max === min) return height / 2;
    return height - padding - ((val - min) / (max - min)) * (height - 2 * padding);
  };

  const getX = (idx) => {
    if (values.length <= 1) return width / 2;
    return padding + (idx / (values.length - 1)) * (width - 2 * padding);
  };

  const pathD = values.reduce((acc, val, i) => {
    const x = getX(i);
    const y = getY(val);
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  const strokeColor = isAlert ? '#e76f51' : '#52b788';

  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-slate-300 transition-all cursor-pointer"
    >
      <span className="text-xs font-bold text-[#1a334d] leading-snug">
        {title}
      </span>

      <div className="mt-3 h-10 w-full flex items-center justify-center">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
          <path
            d={pathD}
            fill="none"
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}