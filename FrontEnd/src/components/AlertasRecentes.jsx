// FrontEnd/src/components/AlertasRecentes.jsx
import React from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import { toggleAlertaRevisado } from '../services/api';

export default function AlertasRecentes({ alertas = [], onAlertaAtualizado }) {
  const handleToggle = async (id) => {
    const resposta = await toggleAlertaRevisado(id);
    if (resposta && onAlertaAtualizado) {
      onAlertaAtualizado(id, resposta.revisado);
    }
  };

  if (!alertas || alertas.length === 0) {
    return (
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2d8653] flex items-center justify-center">
          <ShieldCheck size={20} />
        </div>
        <div>
          <h4 className="text-xs font-bold text-[#1a334d]">Nenhum alerta recente</h4>
          <p className="text-[11px] text-slate-400">Todos os padrões recentes estão dentro da normalidade.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-xs font-bold tracking-wider text-slate-500 uppercase">
        Alertas Recentes
      </h2>

      <div className="space-y-3">
        {alertas.map((alerta) => {
          const isAtencao = alerta.tipo === 'ATENÇÃO';

          return (
            <div
              key={alerta.id}
              className={`p-4 rounded-2xl border transition-all bg-white shadow-[0_2px_8px_rgba(0,0,0,0.02)] ${
                alerta.revisado ? 'opacity-50 border-slate-100' : 'border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    isAtencao
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {alerta.tipo}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {alerta.data}
                </span>
              </div>

              <p className="text-xs text-[#1a334d] font-medium mt-2 leading-relaxed">
                {alerta.texto}
              </p>

              <div className="mt-3 pt-2 border-t border-slate-50 flex justify-end">
                <button
                  onClick={() => handleToggle(alerta.id)}
                  className={`text-xs font-bold flex items-center gap-1 transition-colors ${
                    alerta.revisado
                      ? 'text-emerald-600'
                      : 'text-[#1a334d] hover:text-emerald-700'
                  }`}
                >
                  {alerta.revisado ? (
                    <>
                      <Check size={14} strokeWidth={3} />
                      Revisado
                    </>
                  ) : (
                    'Marcar como revisado →'
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}