// FrontEnd/src/components/ProfileBadge.jsx
import React from 'react';
import { useUser } from '../context/UserContext';

export default function ProfileBadge() {
  const { perfil } = useUser();

  const extrairIniciais = (nomeCompleto) => {
    if (!nomeCompleto) return '??';
    const partes = nomeCompleto.trim().split(' ');
    if (partes.length === 1) return partes[0].substring(0, 2).toUpperCase();
    return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
  };

  const iniciais = extrairIniciais(perfil.nome);

  return (
    <div className="flex items-center gap-3 bg-[#f8fafc] border border-[#edf2f7] py-3 px-3.5 rounded-2xl w-full box-border">
      
      {/* Avatar com as exatas cores que você desenhou na Sidebar */}
      <div className="w-[38px] h-[38px] shrink-0 rounded-full bg-[#a6d5cb] text-[#1a334d] flex items-center justify-center font-bold text-[13px]">
        {iniciais}
      </div>
      
      {/* Textos com a tipografia original */}
      <div className="flex flex-col overflow-hidden">
        <span className="text-[13px] font-bold text-[#1a334d] leading-tight truncate">
          {perfil.nome}
        </span>
        <span className="text-[11px] text-[#8fa0af] mt-0.5 truncate">
          {perfil.papel}
        </span>
      </div>

    </div>
  );
}