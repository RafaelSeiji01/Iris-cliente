// FrontEnd/src/components/MetricsGrid.jsx
import React, { useState } from 'react';
import { Keyboard, Clock, Smartphone, Info, X } from 'lucide-react';

const METRICAS_INFO = {
  digitacao: {
    titulo: 'Velocidade de Digitação (ppm)',
    descricao:
      'Palavras por minuto digitadas no teclado. Quedas persistentes na velocidade motora fina e coordenação podem indicar rigidez, fadiga neuromuscular ou lentificação psicomotora.',
    ideal: 'Acima de 40 ppm',
    atencao: 'Abaixo de 30 ppm',
  },
  hesitacao: {
    titulo: 'Tempo sem Ação na Home',
    descricao:
      'Mede o intervalo em segundos que o paciente leva entre abrir o aplicativo e realizar a primeira interação. Aumentos relevantes sinalizam hesitação, dificuldade de tomada de decisão ou busca visual lenta.',
    ideal: 'Até 6 segundos',
    atencao: 'Acima de 12 segundos',
  },
  aberturas: {
    titulo: 'Aberturas sem Ação',
    descricao:
      'Quantas vezes o paciente desbloqueou o celular ou abriu o app e o fechou sem executar nenhuma tarefa. Esse comportamento repetitivo é um forte marcador de lapsos de memória recente ou desorientação de propósito.',
    ideal: '0 a 1 vez ao dia',
    atencao: '3 ou mais vezes ao dia',
  },
};

const MetricItem = ({ icon: Icon, title, value, tag, isAlert = false, onOpenInfo }) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between transition-all hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] relative group">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-[#f0f7f4] flex items-center justify-center text-[#2d8653]">
          <Icon size={20} strokeWidth={2.2} />
        </div>
        <button
          type="button"
          onClick={onOpenInfo}
          title="O que significa esta métrica?"
          className="text-slate-300 hover:text-[#1a334d] p-1 rounded-full hover:bg-slate-50 transition-colors"
        >
          <Info size={16} />
        </button>
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
  const [modalInfo, setModalInfo] = useState(null);

  const rawVel = props.velocidadeDigitacao ?? props.velocidade_digitacao ?? 42;
  const rawHes = props.tempoHesitacao ?? props.tempo_hesitacao ?? 6.0;
  const rawAber = props.aberturasSemAcao ?? props.aberturas_sem_acao ?? 0;

  const velNum = !isNaN(Number(rawVel)) ? Number(rawVel) : 42;
  const hesNum = !isNaN(Number(rawHes)) ? Number(rawHes) : 6.0;
  const aberNum = !isNaN(Number(rawAber)) ? Number(rawAber) : 0;

  const alertaLentidao = velNum < 35;
  const alertaHesitacao = hesNum > 10.0;
  const alertaAberturas = aberNum > 2;

  const difHesitacao = hesNum - 6.0;
  const tagHesitacao = alertaHesitacao
    ? `+${difHesitacao > 0 ? difHesitacao.toFixed(0) : 0}s`
    : 'estável';

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase">
          Métricas de Hoje
        </h3>
        <span className="text-[11px] text-slate-400 font-medium">
          Clique no ícone ⓘ para entender cada indicador
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* 1. Velocidade de Escrita */}
        <MetricItem
          icon={Keyboard}
          title="Velocidade de digitação"
          value={`${velNum} ppm`}
          tag={alertaLentidao ? 'lento' : 'estável'}
          isAlert={alertaLentidao}
          onOpenInfo={() => setModalInfo(METRICAS_INFO.digitacao)}
        />

        {/* 2. Tempo de Hesitação */}
        <MetricItem
          icon={Clock}
          title="Tempo sem ação na Home"
          value={`${hesNum}s`}
          tag={tagHesitacao}
          isAlert={alertaHesitacao}
          onOpenInfo={() => setModalInfo(METRICAS_INFO.hesitacao)}
        />

        {/* 3. Aberturas sem Ação */}
        <MetricItem
          icon={Smartphone}
          title="Aberturas sem ação"
          value={`${aberNum}x`}
          tag={alertaAberturas ? 'frequente' : 'estável'}
          isAlert={alertaAberturas}
          onOpenInfo={() => setModalInfo(METRICAS_INFO.aberturas)}
        />
      </div>

      {/* Modal Explicativo da Métrica */}
      {modalInfo && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-sm font-bold text-[#1a334d]">{modalInfo.titulo}</h4>
              <button
                onClick={() => setModalInfo(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mt-3">
              {modalInfo.descricao}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Faixa Esperada / Normal:</span>
                <strong className="text-[#2d8653]">{modalInfo.ideal}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Gatilho de Alerta:</span>
                <strong className="text-[#d97706]">{modalInfo.atencao}</strong>
              </div>
            </div>

            <button
              onClick={() => setModalInfo(null)}
              className="mt-5 w-full py-2.5 bg-[#1a334d] hover:bg-[#122436] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}