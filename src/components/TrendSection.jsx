// src/components/TrendSection.jsx
import React from 'react';

export default function TrendSection() {
  return (
    <div className="space-y-4">
      {/* Card da Tendência */}
      <div className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm md:text-base font-bold text-[#1a334d]">
            Tendência • 7 dias
          </span>
          <span className="text-xs text-slate-400">
            Score comportamental
          </span>
        </div>

        <div className="w-full h-16">
          <svg className="w-full h-16" viewBox="0 0 300 60" preserveAspectRatio="none">
            <path
              d="M 5 40 Q 60 38, 100 40 T 170 32 T 220 48 T 270 30 L 290 25"
              fill="none"
              stroke="#6dbdb0"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="290" cy="25" r="4.5" fill="#1a334d" />
          </svg>
        </div>
      </div>

      {/* Card Azul: Insight */}
      <div className="bg-[#163651] rounded-3xl p-5 md:p-6 text-white shadow-md">
        <span className="text-[11px] font-extrabold tracking-widest text-slate-400 block mb-2 uppercase">
          Insight do Dia
        </span>
        <p className="text-xs md:text-sm leading-relaxed text-slate-200">
          O tempo para localizar aplicativos aumentou levemente nos últimos 3 dias. Ainda dentro da faixa normal — vamos continuar observando.
        </p>
      </div>
    </div>
  );
}