// FrontEnd/src/components/HistoricoChartApex.jsx
import React from 'react';
import Chart from 'react-apexcharts';

export default function HistoricoChartApex({ dados = [] }) {
  if (!dados || dados.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center text-xs text-slate-400">
        Carregando gráfico...
      </div>
    );
  }

  const categorias = dados.map((d) => d.data);
  const seriesScore = dados.map((d) => d.score);

  // Marcadores visuais nos dias em alerta (< 75 pts)
  const pontosAlerta = dados
    .map((d, index) => ({ ...d, index }))
    .filter((d) => d.score < 75)
    .map((d) => ({
      x: d.data,
      y: d.score,
      marker: {
        size: 6,
        fillColor: '#d97706',
        strokeColor: '#ffffff',
        strokeWidth: 2,
      },
      label: {
        borderColor: '#d97706',
        offsetY: -6,
        style: {
          color: '#fff',
          background: '#d97706',
          fontSize: '10px',
          fontWeight: 700,
        },
        text: `${d.score} pts`,
      },
    }));

  const chartOptions = {
    chart: {
      type: 'line',
      height: 320,
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: 'inherit',
      parentHeightOffset: 0,
    },
    stroke: {
      // 'monotoneCubic' evita que a curva passe para fora dos limites inferior/superior
      curve: 'monotoneCubic',
      width: 3.5,
      colors: ['#1a334d'],
    },
    colors: ['#1a334d'],
    // Faixa verde sombreada (Padrão Normal: 75 a 100)
    annotations: {
      yaxis: [
        {
          y: 75,
          y2: 100,
          borderColor: '#a3b18a',
          strokeDashArray: 4,
          fillColor: '#e8f5ee',
          opacity: 0.75,
          label: {
            borderColor: '#52b788',
            style: {
              color: '#fff',
              background: '#2d8653',
              fontSize: '11px',
              fontWeight: 700,
            },
            text: 'Faixa Normal (75-100)',
          },
        },
      ],
      points: pontosAlerta,
    },
    xaxis: {
      categories: categorias,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: '#94a3b8', fontSize: '11px', fontWeight: 500 },
        rotate: -45,
        hideOverlappingLabels: true,
      },
    },
    yaxis: {
      // Escala completa de 0 a 100 evita qualquer corte no fundo
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: {
        style: { colors: '#94a3b8', fontSize: '11px', fontWeight: 600 },
        formatter: (val) => `${Math.round(val)}`,
      },
    },
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 4,
      padding: {
        top: 10,
        right: 15,
        bottom: 10,
        left: 10,
      },
    },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (val) => `${val} pontos`,
        title: {
          formatter: () => 'Score: ',
        },
      },
    },
  };

  const chartSeries = [
    {
      name: 'Score Comportamental',
      data: seriesScore,
    },
  ];

  return (
    <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-base font-bold text-[#1a334d]">
            Score comportamental geral
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Faixa sombreada = padrão considerado normal
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-2.5 rounded-sm bg-[#e8f5ee] border border-[#b7e4c7]" />
            <span>Padrão normal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d97706]" />
            <span>Alerta/Atenção</span>
          </div>
        </div>
      </div>

      {/* Gráfico sem cortes */}
      <div className="w-full min-h-[320px]">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height={320}
        />
      </div>
    </div>
  );
}