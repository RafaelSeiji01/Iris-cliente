// src/components/MetricsGrid.jsx
import React from 'react';

function MetricItem({ icon, badge, badgeColor, value, label }) {
  const isWarning = badgeColor === 'orange';

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col justify-between min-h-[125px] shadow-sm">
      <div className="flex justify-between items-center">
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-sm text-[#1a334d]">
          {icon}
        </div>
        <span
          className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
            isWarning
              ? 'bg-orange-50 text-orange-600'
              : 'bg-emerald-50 text-emerald-700'
          }`}
        >
          {badge}
        </span>
      </div>

      <div className="mt-3">
        <div className="text-xl md:text-2xl font-extrabold text-[#1a334d] leading-tight">
          {value}
        </div>
        <div className="text-xs text-slate-400 font-medium mt-1">
          {label}
        </div>
      </div>
    </div>
  );
}

export default function MetricsGrid() {
  return (
    <div className="my-6">
      <h3 className="text-xs md:text-sm font-extrabold text-[#1a334d] tracking-wider mb-3.5 uppercase">
        Métricas de Hoje
      </h3>

      {/* Grid: 2 colunas no celular e 4 no desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <MetricItem icon="🕒" badge="estável" value="1.8s" label="Resposta a notificações" />
        <MetricItem icon="⌨️" badge="estável" value="42 ppm" label="Velocidade de digitação" />
        <MetricItem icon="📱" badge="+18%" badgeColor="orange" value="6.2s" label="Tempo p/ achar app" />
        <MetricItem icon="🔍" badge="estável" value="2x" label="Buscas repetidas" />
      </div>
    </div>
  );
}