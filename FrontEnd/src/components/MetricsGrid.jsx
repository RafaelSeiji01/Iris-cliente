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
            ? 'bg-amber-50 text-amber-600 border border-amber-200'
            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
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

export default function MetricsGrid(props) {
  // Aceita tanto camelCase quanto snake_case sem quebrar com valor 0
  const rawVel = props.velocidadeDigitacao ?? props.velocidade_digitacao ?? 42;
  const rawHes = props.tempoHesitacao ?? props.tempo_hesitacao ?? 6.0;
  const rawAber = props.aberturasSemAcao ?? props.aberturas_sem_acao ?? 0;

  const velNum = !isNaN(Number(rawVel)) ? Number(rawVel) : 42;
  const hesNum = !isNaN(Number(rawHes)) ? Number(rawHes) : 6.0;
  const aberNum = !isNaN(Number(rawAber)) ? Number(rawAber) : 0;

  // Regras clínicas de alerta
  const alertaLentidao = velNum < 35;
  const alertaHesitacao = hesNum > 10.0;
  const alertaAberturas = aberNum > 2;

  // Cálculo da diferença de hesitação
  const difHesitacao = hesNum - 6.0;
  const tagHesitacao = alertaHesitacao
    ? `+${difHesitacao > 0 ? difHesitacao.toFixed(0) : 0}s`
    : 'estável';

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
          tag={tagHesitacao}
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