// FrontEnd/src/components/TendenciaCard.jsx
import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function TendenciaCard({ historico = [] }) {
  // Pega os últimos 7 dias
  const ultimos7Dias = useMemo(() => {
    if (!historico || historico.length === 0) return [];
    return historico.slice(-7);
  }, [historico]);

  // Cálculo da Regressão Linear Simples (y = mx + b) para projeção
  const analise = useMemo(() => {
    if (ultimos7Dias.length < 2) {
      return { projecao: null, inclinacao: 0, status: 'Estável', cor: '#52b788' };
    }

    const n = ultimos7Dias.length;
    const scores = ultimos7Dias.map((d) => d.score);
    
    // Regressão
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;

    for (let i = 0; i < n; i++) {
      sumX += i;
      sumY += scores[i];
      sumXY += i * scores[i];
      sumXX += i * i;
    }

    const m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const b = (sumY - m * sumX) / n;

    // Próximo ponto projetado (x = n)
    const scoreProjetado = Math.max(0, Math.min(100, Math.round(m * n + b)));
    const ultimoScore = scores[scores.length - 1];

    let status = 'Estável';
    let cor = '#52b788'; // Verde padrão

    if (m < -1.5 || scoreProjetado < 70) {
      status = 'Tendência de Queda';
      cor = '#d97706'; // Laranja alerta
    } else if (m > 1.5) {
      status = 'Em Recuperação';
      cor = '#2d8653';
    }

    return {
      projecao: scoreProjetado,
      inclinacao: m,
      status,
      cor,
      ultimoScore,
    };
  }, [ultimos7Dias]);

  // Coordenadas para o Sparkline SVG
  const svgData = useMemo(() => {
    if (ultimos7Dias.length === 0) return null;

    const width = 260;
    const height = 65;
    const padding = 10;
    const scores = ultimos7Dias.map((d) => d.score);

    // Adiciona o ponto preditivo ao final
    const todosScores = [...scores, analise.projecao ?? scores[scores.length - 1]];
    const totalPontos = todosScores.length;

    const min = 0;
    const max = 100;

    const getY = (val) =>
      height - padding - ((val - min) / (max - min)) * (height - 2 * padding);

    const getX = (idx) =>
      padding + (idx / (totalPontos - 1)) * (width - 2 * padding);

    // Linha real (dos 7 dias)
    const pathReal = scores.reduce((acc, val, i) => {
      const x = getX(i);
      const y = getY(val);
      return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');

    // Linha projetada (liga o último dia real até a projeção futura)
    const ultimoRealX = getX(scores.length - 1);
    const ultimoRealY = getY(scores[scores.length - 1]);
    const projX = getX(totalPontos - 1);
    const projY = getY(analise.projecao);

    const pathProjecao = `M ${ultimoRealX} ${ultimoRealY} L ${projX} ${projY}`;

    return { width, height, pathReal, pathProjecao, ultimoRealX, ultimoRealY, projX, projY };
  }, [ultimos7Dias, analise]);

  if (!svgData) {
    return (
      <div className="bg-white p-5 rounded-3xl border border-slate-100 h-28 flex items-center justify-center text-xs text-slate-400">
        Carregando tendência...
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#1a334d]">Tendência • 7 dias</span>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
            style={{
              backgroundColor: `${analise.cor}18`,
              color: analise.cor,
            }}
          >
            {analise.inclinacao > 1.5 && <TrendingUp size={12} />}
            {analise.inclinacao < -1.5 && <TrendingDown size={12} />}
            {Math.abs(analise.inclinacao) <= 1.5 && <Minus size={12} />}
            {analise.status}
          </span>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">Score comportamental</span>
      </div>

      {/* Gráfico Sparkline Dinâmico */}
      <div className="mt-2 w-full h-16 relative">
        <svg
          viewBox={`0 0 ${svgData.width} ${svgData.height}`}
          className="w-full h-full overflow-visible"
        >
          {/* Linha Real (Últimos 7 dias) */}
          <path
            d={svgData.pathReal}
            fill="none"
            stroke={analise.cor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Linha Preditiva Pontilhada (Previsão próximo dia) */}
          <path
            d={svgData.pathProjecao}
            fill="none"
            stroke={analise.cor}
            strokeWidth="2.5"
            strokeDasharray="3 3"
            strokeLinecap="round"
          />

          {/* Ponto Real Mais Recente (Hoje) */}
          <circle
            cx={svgData.ultimoRealX}
            cy={svgData.ultimoRealY}
            r="4.5"
            fill="#1a334d"
            stroke="#ffffff"
            strokeWidth="2"
          />

          {/* Ponto Projetado (Previsão de Amanhã) */}
          <circle
            cx={svgData.projX}
            cy={svgData.projY}
            r="3.5"
            fill={analise.cor}
            stroke="#ffffff"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Rodapé explicativo com a estimativa */}
      <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-50 pt-2">
        <span>Hoje: <strong className="text-[#1a334d]">{analise.ultimoScore} pts</strong></span>
        <span>
          Previsão estimada: <strong style={{ color: analise.cor }}>~{analise.projecao} pts</strong>
        </span>
      </div>
    </div>
  );
}