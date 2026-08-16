// FrontEnd/src/components/HistoricoChart.jsx
import React, { useState } from 'react';

export default function HistoricoChart({ dados = [] }) {
  const [pontoSelecionado, setPontoSelecionado] = useState(null);

  if (!dados || dados.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center text-xs text-slate-400">
        Carregando série histórica...
      </div>
    );
  }

  const width = 380;
  const height = 140;
  const paddingLeft = 35;
  const paddingRight = 15;
  const paddingTop = 20;
  const paddingBottom = 25;

  const minScore = 30;
  const maxScore = 100;

  const getY = (score) => {
    const clamped = Math.max(minScore, Math.min(maxScore, score));
    return (
      height -
      paddingBottom -
      ((clamped - minScore) / (maxScore - minScore)) * (height - paddingTop - paddingBottom)
    );
  };

  const getX = (index) => {
    if (dados.length <= 1) return (width + paddingLeft) / 2;
    return paddingLeft + (index / (dados.length - 1)) * (width - paddingLeft - paddingRight);
  };

  // Caminho da linha
  const pathD = dados.reduce((acc, ponto, i) => {
    const x = getX(i);
    const y = getY(ponto.score);
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  return (
    <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
      {/* Cabeçalho do Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-sm font-bold text-[#1a334d]">
            Score comportamental geral
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Acompanhamento diário da estabilidade motora e cognitiva
          </p>
        </div>

        {/* Legenda visual didática */}
        <div className="flex items-center gap-3 text-[11px] font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-2 rounded-sm bg-[#e8f5ee] border border-[#b7e4c7]" />
            <span>Padrão normal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d97706]" />
            <span>Alerta/Atenção</span>
          </div>
        </div>
      </div>

      {/* Área do Gráfico SVG */}
      <div className="relative w-full h-44 flex items-center justify-center">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {/* Faixa sombreada verde (Normal: 75 a 100 pts) */}
          <rect
            x={paddingLeft}
            y={getY(100)}
            width={width - paddingLeft - paddingRight}
            height={getY(75) - getY(100)}
            fill="#e8f5ee"
            rx="4"
          />

          {/* Linha guia de referência dos 75 pontos */}
          <line
            x1={paddingLeft}
            y1={getY(75)}
            x2={width - paddingRight}
            y2={getY(75)}
            stroke="#a3b18a"
            strokeWidth="1"
            strokeDasharray="3 3"
          />

          {/* Eixo Y - Rótulos de Pontuação */}
          <text x="5" y={getY(100) + 4} fontSize="9" fill="#94a3b8" fontWeight="600">
            100
          </text>
          <text x="5" y={getY(75) + 4} fontSize="9" fill="#52b788" fontWeight="700">
            75
          </text>
          <text x="5" y={getY(40) + 4} fontSize="9" fill="#94a3b8" fontWeight="600">
            40
          </text>

          {/* Linha Principal do Histórico */}
          <path
            d={pathD}
            fill="none"
            stroke="#1a334d"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Pontos Interativos */}
          {dados.map((ponto, i) => {
            const x = getX(i);
            const y = getY(ponto.score);
            const isAlert = ponto.score < 75;

            return (
              <g
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => setPontoSelecionado(ponto)}
                onClick={() => setPontoSelecionado(ponto)}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isAlert ? 4.5 : 3}
                  fill={isAlert ? '#d97706' : '#1a334d'}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}

          {/* Eixo X - Primeiras e últimas datas */}
          {dados.length > 0 && (
            <>
              <text
                x={paddingLeft}
                y={height - 5}
                fontSize="9"
                fill="#94a3b8"
                fontWeight="500"
              >
                {dados[0]?.data}
              </text>
              <text
                x={width - paddingRight - 20}
                y={height - 5}
                fontSize="9"
                fill="#94a3b8"
                fontWeight="600"
              >
                Hoje
              </text>
            </>
          )}
        </svg>
      </div>

      {/* Detalhe do Ponto Selecionado / Hover */}
      {pontoSelecionado && (
        <div className="mt-3 p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs transition-all">
          <div>
            <span className="font-bold text-[#1a334d]">Data: {pontoSelecionado.data}</span>
            <span className="text-slate-500 ml-2">({pontoSelecionado.status_dia})</span>
          </div>
          <span
            className={`font-black px-2 py-0.5 rounded-md ${
              pontoSelecionado.score >= 75
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {pontoSelecionado.score} pts
          </span>
        </div>
      )}
    </div>
  );
}