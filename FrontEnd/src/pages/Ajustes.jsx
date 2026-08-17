// FrontEnd/src/pages/Ajustes.jsx
import React from 'react';

export default function Ajustes() {
  return (
    <div className="w-full max-w-md md:max-w-4xl lg:max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#1a334d]">Ajustes do Sistema</h1>
        <p className="text-sm text-slate-500 mt-1">Configurações de telemetria e perfil de monitoramento</p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] text-center py-16">
        <span className="text-4xl">⚙️ </span>
        <h3 className="text-lg font-bold text-[#1a334d] mt-4">Configurações</h3>
        <p className="text-sm text-slate-400 max-w-sm mx-auto mt-2">
          Parâmetros de sensibilidade de alerta e dados de contato de emergência do paciente.
        </p>
      </div>
    </div>
  );
}