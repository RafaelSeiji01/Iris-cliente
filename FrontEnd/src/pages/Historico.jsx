// FrontEnd/src/pages/Historico.jsx
import React, { useState, useEffect } from 'react';
import HistoricoChart from '../components/HistoricoChart';
import AlertasRecentes from '../components/AlertasRecentes';
import RelatorioBanner from '../components/RelatorioBanner';
import { getHistoricoPaciente, getAlertasPaciente } from '../services/api';

export default function Historico() {
  const [periodo, setPeriodo] = useState(14);
  const [historico, setHistorico] = useState([]);
  const [alertas, setAlertas] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      const [dadosHistorico, dadosAlertas] = await Promise.all([
        getHistoricoPaciente(1, periodo),
        getAlertasPaciente(1),
      ]);
      setHistorico(dadosHistorico);
      setAlertas(dadosAlertas);
    }
    carregarDados();
  }, [periodo]);

  const handleAlertaAtualizado = (id, revisado) => {
    setAlertas((prev) =>
      prev.map((a) => (a.id === id ? { ...a, revisado } : a))
    );
  };

  return (
    <div className="w-full max-w-md md:max-w-4xl lg:max-w-5xl space-y-6 pb-12">
      {/* Título Principal */}
      <h1 className="text-xl md:text-2xl font-black text-[#1a334d]">
        Histórico Cognitivo
      </h1>

      {/* Seletor de Período */}
      <div className="bg-slate-100 p-1 rounded-2xl flex items-center justify-between gap-1 max-w-md">
        {[
          { label: '7 dias', valor: 7 },
          { label: '14 dias', valor: 14 },
          { label: '30 dias', valor: 30 },
        ].map((item) => {
          const ativo = periodo === item.valor;
          return (
            <button
              key={item.valor}
              onClick={() => setPeriodo(item.valor)}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                ativo
                  ? 'bg-[#1a334d] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Gráfico Geral */}
      <HistoricoChart dados={historico} />

      {/* Alertas Reais Conectados aos Dados */}
      <AlertasRecentes
        alertas={alertas}
        onAlertaAtualizado={handleAlertaAtualizado}
      />

      {/* Banner de Envio para o Médico */}
      <RelatorioBanner />
    </div>
  );
}