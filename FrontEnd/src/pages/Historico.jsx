// FrontEnd/src/pages/Historico.jsx
import React, { useState, useEffect } from 'react';
import HistoricoChart from '../components/HistoricoChart';
import { getHistoricoPaciente } from '../services/api';

export default function Historico() {
  const [periodo, setPeriodo] = useState(14); // 7, 14 ou 30 dias
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      setCarregando(true);
      const dados = await getHistoricoPaciente(1, periodo);
      setHistorico(dados);
      setCarregando(false);
    }
    carregar();
  }, [periodo]);

  return (
    <div className="w-full max-w-md md:max-w-4xl lg:max-w-5xl space-y-6 pb-8">
      {/* Título Principal */}
      <h1 className="text-xl md:text-2xl font-black text-[#1a334d]">
        Histórico Cognitivo
      </h1>

      {/* Seletor de Período (Pills) */}
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

      {/* Gráfico Geral de Score */}
      <HistoricoChart dados={historico} />
    </div>
  );
}