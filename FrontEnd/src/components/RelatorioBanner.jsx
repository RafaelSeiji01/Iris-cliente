// FrontEnd/src/components/RelatorioBanner.jsx
import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';

export default function RelatorioBanner() {
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = () => {
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
  };

  return (
    <div className="rounded-3xl p-5 bg-gradient-to-r from-[#2d6a4f] to-[#1a334d] text-white flex items-center justify-between shadow-md">
      <div>
        <h4 className="text-sm font-bold">Relatório completo</h4>
        <p className="text-[11px] text-slate-200 mt-0.5">
          Compartilhar resumo e evolução com o médico
        </p>
      </div>

      <button
        onClick={handleEnviar}
        className="px-5 py-2.5 bg-white text-[#1a334d] rounded-xl text-xs font-bold shadow-sm hover:bg-slate-50 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
      >
        {enviado ? (
          <>
            <Check size={14} className="text-emerald-600" />
            Enviado!
          </>
        ) : (
          'Enviar'
        )}
      </button>
    </div>
  );
}