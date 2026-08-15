// FrontEnd/src/components/ScoreCard.jsx
import React from 'react';

export default function ScoreCard({ score = 86 }) {
  const scoreNum = Number(score);
  const isGood = scoreNum >= 75;
  const strokeColor = isGood ? '#2d8653' : '#d97706'; // Verde ou Amarelo Alerta

  // Cálculo do perímetro circular do SVG
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scoreNum / 100) * circumference;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col sm:flex-row items-center gap-6">
      {/* Círculo com pontuação */}
      <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="#f1f5f9"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={strokeColor}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold text-[#1a334d] tracking-tight">
            {scoreNum}
          </span>
          <span className="text-[10px] font-semibold text-slate-400">/ 100</span>
        </div>
      </div>

      {/* Descrição dinâmica */}
      <div>
        <h3 className="text-sm font-bold text-[#1a334d]">Score comportamental</h3>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          {scoreNum < 70
            ? 'Variações comportamentais detectadas hoje comparadas aos últimos 30 dias.'
            : 'Seus padrões de hoje estão dentro do esperado, comparado aos últimos 30 dias.'}
        </p>
      </div>
    </div>
  );
}