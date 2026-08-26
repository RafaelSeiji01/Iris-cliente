// FrontEnd/src/components/RelatorioBanner.jsx
import React, { useState } from 'react';
import { Download, Check } from 'lucide-react';
import * as api from '../services/api';

export default function RelatorioBanner() {
  const [loading, setLoading] = useState(false);
  const [baixado, setBaixado] = useState(false);

  const handleDownload = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (typeof api.baixarRelatorioPdf === 'function') {
        const sucesso = await api.baixarRelatorioPdf(1);
        if (sucesso) {
          setBaixado(true);
          setTimeout(() => setBaixado(false), 3000);
        }
      } else {
        // Fallback direto via redirecionamento caso a função não exista
        window.open('http://localhost:3001/api/paciente/1/relatorio-pdf', '_blank');
        setBaixado(true);
        setTimeout(() => setBaixado(false), 3000);
      }
    } catch (err) {
      console.error('Erro ao baixar:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl p-5 bg-gradient-to-r from-[#2d6a4f] to-[#1a334d] text-white flex items-center justify-between shadow-md">
      <div>
        <h4 className="text-sm font-bold">Relatório completo em PDF</h4>
        <p className="text-[11px] text-slate-200 mt-0.5">
          Exportar histórico, métricas e alertas para o médico
        </p>
      </div>

      <button
        onClick={handleDownload}
        disabled={loading}
        className="px-5 py-2.5 bg-white text-[#1a334d] rounded-xl text-xs font-bold shadow-sm hover:bg-slate-50 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-75"
      >
        {loading ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-[#1a334d] border-t-transparent rounded-full animate-spin" />
            Gerando...
          </>
        ) : baixado ? (
          <>
            <Check size={14} className="text-emerald-600" />
            Baixado!
          </>
        ) : (
          <>
            <Download size={14} />
            Baixar PDF
          </>
        )}
      </button>
    </div>
  );
}