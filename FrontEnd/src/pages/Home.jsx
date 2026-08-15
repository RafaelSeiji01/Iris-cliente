// FrontEnd/src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ScoreCard from '../components/ScoreCard';
import MetricsGrid from '../components/MetricsGrid';
import TrendSection from '../components/TrendSection';
import { getResumoPaciente } from '../services/api';

export default function Home() {
  const [dados, setDados] = useState({
    nome: 'Antonio',
    score: 86,
    status_dia: 'Padrão normal hoje',
    insight_dia: 'Carregando observações do dia...',
    velocidade_digitacao: 42,
    tempo_hesitacao: '6.2',
    aberturas_sem_acao: 2,
  });

  useEffect(() => {
    async function carregarDados() {
      const paciente = await getResumoPaciente(1);
      if (paciente) {
        setDados(paciente);
      }
    }

    carregarDados();
  }, []);

  return (
    <div className="w-full max-w-md md:max-w-4xl lg:max-w-5xl">
      {/* Saudação e Status */}
      <Header name={dados.nome} status={dados.status_dia} />

      {/* Grid Superior: Score e Gráfico lado a lado no Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
        <ScoreCard score={dados.score} />
        <TrendSection insight={dados.insight_dia} />
      </div>

      {/* Grid de Métricas Reais */}
      <MetricsGrid 
        velocidadeDigitacao={`${dados.velocidade_digitacao} ppm`}
        tempoHesitacao={`${dados.tempo_hesitacao}s`}
        aberturasSemAcao={`${dados.aberturas_sem_acao}x`}
      />
    </div>
  );
}