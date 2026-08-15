// FrontEnd/src/components/TrendSection.jsx
import React from 'react';

export default function TrendSection({ insight }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Gráfico Sparkline de Tendência */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-slate-800 tracking-wide">
            Tendência • 7 dias
          </span>
          <span className="text-[11px] font-medium text-slate-400">
            Score comportamental
          </span>
        </div>

        <div className="h-16 w-full flex items-center justify-center">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 300 60">
            <path
              d="M 10 35 Q 80 30, 150 35 T 250 48 T 290 20"
              fill="none"
              stroke="#52b788"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="290" cy="20" r="4.5" fill="#1a334d" />
          </svg>
        </div>
      </div>

      {/* Card Escuro de Insight Dinâmico */}
      <div className="bg-[#1a334d] text-white p-5 rounded-2xl shadow-sm">
        <div className="text-[10px] font-bold tracking-wider text-slate-300 uppercase mb-1.5">
          Insight do Dia
        </div>
        <p className="text-xs leading-relaxed text-slate-100">
          {insight || 'Padrões de interação estáveis e dentro da faixa esperada.'}
        </p>
      </div>
    </div>
  );
}