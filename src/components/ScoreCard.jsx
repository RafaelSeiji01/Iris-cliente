// src/components/ScoreCard.jsx
import React from 'react';

export default function ScoreCard({ score = 86 }) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - score) / 100) * circumference;

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 flex items-center gap-5 shadow-sm">
      {/* Círculo do Score */}
      <div className="relative w-24 h-24 flex-shrink-0">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="#e2edf0"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="#6dbdb0"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold text-[#1a334d] leading-none">
            {score}
          </span>
          <span className="text-[11px] text-slate-400 font-semibold mt-0.5">
            / 100
          </span>
        </div>
      </div>

      {/* Texto descritivo */}
      <div>
        <h2 className="text-[17px] font-bold text-[#1a334d] mb-1">
          Score comportamental
        </h2>
        <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
          Seus padrões de hoje estão dentro do esperado, comparado aos últimos 30 dias.
        </p>
      </div>
    </div>
  );
}