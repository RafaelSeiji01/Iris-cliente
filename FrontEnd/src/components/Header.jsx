// FrontEnd/src/components/Header.jsx
import React from 'react';

export default function Header({ name = 'Antônio', status = 'Padrão normal hoje' }) {
  // Verifica se o status indica alerta/atenção
  const isAlerta =
    typeof status === 'string' &&
    (status.toLowerCase().includes('atenção') ||
     status.toLowerCase().includes('alerta') ||
     status.toLowerCase().includes('desvio'));

  return (
    <div className="flex flex-col gap-1.5 mb-2">
      <span className="text-xs font-semibold text-slate-400">Bom dia,</span>
      <h1 className="text-2xl md:text-3xl font-black text-[#1a334d] tracking-tight">
        {name}
      </h1>

      {/* Badge de Status Dinâmica */}
      <div className="flex items-center mt-1">
        <span
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
            isAlerta
              ? 'bg-amber-50 text-amber-800 border border-amber-200'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isAlerta ? 'bg-[#d97706]' : 'bg-[#2d8653]'
            }`}
          />
          {status}
        </span>
      </div>
    </div>
  );
}