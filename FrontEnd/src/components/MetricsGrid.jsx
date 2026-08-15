// FrontEnd/src/components/MetricsGrid.jsx
import React from 'react';
import { Keyboard, Clock, Smartphone } from 'lucide-react';

const MetricItem = ({ icon: Icon, title, value, tag, isAlert = false }) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
    <div className="flex items-center justify-between">
      <div className="w-10 h-10 rounded-xl bg-[#f0f7f4] flex items-center justify-center text-[#2d8653]">
        <Icon size={20} strokeWidth={2.2} />
      </div>
      <span
        className={`text-xs font-semibold px-2.5 py-1 rounded-md transition-colors ${
          isAlert
            ? 'bg-amber-50 text-amber-600'
            : 'bg-emerald-50 text-emerald-700'
        }`}
      >
        {tag}
      </span>
    </div>

    <div className="mt-4">
      <div className="text-2xl font-extrabold text-[#1a334d]">{value}</div>
      <div className="text-xs font-medium text-slate-400 mt-0.5">{title}</div>
    </div>
  </div>
);

export default function MetricsGrid({
  velocidadeDigitacao = 42,
  tempoHesitacao = 6.2,
  aberturasSemAcao = 0,
}) {
  // Converte para número garantindo que comparações funcionem
  const velNum = Number(velocidadeDigitacao) || 42;
  const hesNum = Number(tempoHesitacao) || 6.0;
  const aberNum = Number(aberturasSemAcao) || 0;

  // Lógica clínica dinâmica dos alertas
  const alertaLentidao = velNum < 35;
  const alertaHesitacao = hesNum > 6.0;
  const alertaAberturas = aberNum > 2;

  return (
    <div className="mt-6">
      <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase mb-3">
        Métricas de Hoje
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* 1. Velocidade de Escrita */}
        <MetricItem
          icon={Keyboard}
          title="Velocidade de digitação"
          value={`${velNum} ppm`}
          tag={alertaLentidao ? 'lento' : 'estável'}
          isAlert={alertaLentidao}
        />

        {/* 2. Tempo de Hesitação */}
        <MetricItem
          icon={Clock}
          title="Tempo sem ação na Home"
          value={`${hesNum}s`}
          tag={alertaHesitacao ? `+${(hesNum - 6.0).toFixed(1)}s` : 'estável'}
          isAlert={alertaHesitacao}
        />

        {/* 3. Aberturas sem Ação */}
        <MetricItem
          icon={Smartphone}
          title="Aberturas sem ação"
          value={`${aberNum}x`}
          tag={alertaAberturas ? 'frequente' : 'estável'}
          isAlert={alertaAberturas}
        />
      </div>
    </div>
  );
}