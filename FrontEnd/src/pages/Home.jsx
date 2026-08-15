// FrontEnd/src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ScoreCard from '../components/ScoreCard';
import MetricsGrid from '../components/MetricsGrid';
import TrendSection from '../components/TrendSection';
import { getResumoPaciente } from '../services/api';

export default function Home() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const paciente = await getResumoPaciente(1);
        console.log('📥 DADOS QUE CHEGARAM DA API:', paciente);
        if (paciente) {
          setDados(paciente);
        }
      } catch (error) {
        console.error('Erro ao carregar paciente:', error);
      }
    }

    carregarDados();
  }, []);

  if (!dados) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <p className="text-sm font-medium text-slate-400">Carregando métricas...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md md:max-w-4xl lg:max-w-5xl">
      {/* Cabeçalho */}
      <Header name={dados.nome} status={dados.status_dia} />

      {/* Cards de Score e Tendência */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4">
        <ScoreCard score={dados.score} />
        <TrendSection insight={dados.insight_dia} />
      </div>

      {/* Métricas Dinâmicas - Verifique os nomes das chaves */}
      <MetricsGrid 
        velocidadeDigitacao={dados.velocidade_digitacao}
        tempoHesitacao={dados.tempo_hesitacao}
        aberturasSemAcao={dados.aberturas_sem_acao}
      />
    </div>
  );
}