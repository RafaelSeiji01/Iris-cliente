// FrontEnd/src/components/Header.jsx
import React from 'react';
import { useUser } from '../context/UserContext'; // <-- Voltamos a importar o contexto aqui

export default function Header({ status = 'Padrão normal hoje' }) {
  const { perfil } = useUser(); // <-- Puxamos o nome do usuário

  const isAlerta =
    typeof status === 'string' &&
    (status.toLowerCase().includes('atenção') ||
     status.toLowerCase().includes('alerta') ||
     status.toLowerCase().includes('desvio'));

  return (
    <div className="flex items-start justify-between mb-2">
      <div className="flex flex-col gap-1.5">
        
        {/* Texto de boas-vindas limpo e direto! */}
        <h1 className="text-xl md:text-2xl font-black text-[#1a334d]">
          Bom dia, {perfil.nome}
        </h1>

        {/* Status do dia */}
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
    </div>
  );
}